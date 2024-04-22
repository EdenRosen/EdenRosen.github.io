const canvas = document.getElementById('main-canvas')
const c = canvas.getContext('2d')
const btn1 = document.getElementById('btn1')
const details = document.getElementById('details')
const graph = document.getElementById('graph-canvas')
const cg = graph.getContext('2d')

graph.width = 500
graph.height = 150

canvas.width = 500
canvas.height = 500

var running
var autoplay = false
var asap = false

const autoplayE = document.getElementById('autoplay')
autoplayE.addEventListener('click', () => {
    autoplay = autoplayE.checked
})

const asapE = document.getElementById('asap')
asapE.addEventListener('click', () => {
    asap = asapE.checked
})


function click1() {
    if (!running) {
        running = true;
        run()
    }
}



var v
var averages
var log = []
var mapSize = 300
var humans = Math.floor(mapSize*mapSize/600)
var viruses = 6
var frames = 600

class human {
    constructor(td) {
        this.x = Math.random()*mapSize
        this.y = Math.random()*mapSize
        this.newDir()
        this.sick = false
        this.td = td
    }
    move() {
        if (this.dead) {
            return
        }
        this.x += Math.cos(this.dir) / 3
        this.y += Math.sin(this.dir) / 3
        if (this.x > mapSize) {
            this.x = mapSize
            this.newDir()
        } else if (this.x < 0) {
            this.x = 0
            this.newDir()
        }
        if (this.y > mapSize) {
            this.y = mapSize
            this.newDir()
        } else if (this.y < 0) {
            this.y = 0
            this.newDir()
        }
    }
    newDir() {
        this.dir = Math.floor(Math.random()*360)
    }
}

class virus {
    constructor(r, td) {
        this.r = r + Math.random()*6 - 3
        if (this.r > 25) {
            this.r = 25
        } else if (this.r < 3) {
            this.r = 3
        }
        this.td = td + Math.floor(Math.random()*40) - 20
    }
}

reset()
function reset() {
    running = false
    averages = []
    c.clearRect(0, 0, canvas.width, canvas.height)
    graph.style.display = 'none'
    details.innerHTML = ''
    v = []
    for (let i = 0; i < viruses; i++) {
        v.push(new virus(5, 250))
    }
}



function sim(round) {
    let radius = Math.floor(v[round].r * 10)/10
    details.innerHTML = `Radius: ${radius}<br>Time to death: ${v[round].td}`

    var h = []
    for (let i = 0; i < humans; i++) {
        h.push(new human(v[round].td))
    }
    h[0].sick = true
    var t = 0
    if (!asap) {
        animate()
    } else {
        for (let i = 0; i < frames & running; i++) {
            frame()
        }
        if (running) {
            next(results(h), round)
        }
    }
    
    function animate() {
        t++
        if (running) {
            if (t != frames) {
                requestAnimationFrame(animate)
            } else {
                next(results(h), round)
            }
        } else {
            return
        }
        frame()
    }
    function frame() {
        c.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < humans; i++) {
            if (h[i].td == 0) {
                continue
            }
            h[i].move()
            c.beginPath()
            let ratio = canvas.width / mapSize
            if (h[i].sick) {
                c.fillStyle = '#dceed1'
                c.arc(h[i].x * ratio, h[i].y * ratio, v[round].r * ratio, 0, Math.PI * 2)
                c.fill()
                c.beginPath()
                c.fillStyle = 'red'
            } else {
                c.fillStyle = 'black'
                
            }
            c.arc(h[i].x * ratio, h[i].y * ratio, 750 / mapSize, 0, Math.PI * 2)
            c.fill()
        }
        infect(h, v[round])
    }
}

function infect(h, virus) {
    for (let he in h) {
        for (let e in h) {
            let len = Math.sqrt(
                Math.pow(h[he].x - h[e].x, 2) +
                Math.pow(h[he].y - h[e].y, 2)
            )
            if (len < virus.r & len != 0 & h[e].td > 0 & h[he].td > 0) {
                if (h[e].sick) {
                    h[he].sick = true
                } else if (h[he].sick) {
                    h[e].sick = true
                }
            }
        }
        if (h[he].sick & h[he].td > 0) {
            h[he].td--
        }
    }
}

function results(h) {
    let sicks = 0
    let deaths = 0
    h.forEach(he => {
        if (he.td == 0) {
            deaths++
        } else if (he.sick) {
            sicks++
        }
    })
    return { s: sicks, d: deaths }
}

function next(result, round) {
    v[round].sicks = result.s
    v[round].deaths = result.d
    round++
    if (round < viruses) {
        sim(round)
    } else {
        kill()
    }
}

function run() {
    sim(0)
}

function kill() {
    if (!running) {
        return
    }
    show()
    v.sort((a, b) => {
        return a.deaths - b.deaths
    })
    v = v.slice(viruses/2)
    v.forEach(vir => {
        v.push(new virus(vir.r, vir.td))
    })
    
    if (!autoplay) {
        running = false
    } else {
        setTimeout(run, 1)
    }
}

function show() {
    details.innerHTML = ''
    let average = 0
    v.forEach(vir => {
        average += vir.deaths
        let radius = Math.floor(vir.r * 10)/10
        details.innerHTML += `<br>Radius: ${radius} TTD: ${vir.td} sicks: ${vir.sicks} deaths: ${vir.deaths}`
    })
    averages.push(Math.floor(average / v.length * 10)/10)
    details.innerHTML += `<h4>Generation: ${averages.length}</h4>`
    details.innerHTML += `First average sicks: ${averages[0]}`
    details.innerHTML += `<br>Average sicks: ${averages[averages.length - 1]}`
    graph.style.display = 'block'

    
    cg.lineWidth = 2
    cg.strokeStyle = 'red'
    cg.clearRect(0, 0, graph.width, graph.height)
    cg.beginPath()
    cg.moveTo(0, graph.height)
    let max = Math.max(...averages)
    for (const i in averages) {
        cg.lineTo(
            graph.width / averages.length * (parseInt(i)+1),
            graph.height - (graph.height / max * averages[i])
        )
    }
    cg.stroke()
}


