const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 1200
const ch = 700

canvas.width = cw;
canvas.height = ch;


const lr = 0.1
const wh = 200
const birds = 300

var answer = 0.5
var players = []
var run = false
var gen = 1
var x = cw
var h = 300
var w = 100
var progress = [0,0]

var pnn
var nn = []
var con = []


const fix = (i) => Math.floor(i*100)/100
const s = (i) => fix(1/(1+Math.pow(Math.E, -i)))

// exe()
// function exe() {
//     for (let n = 1; n < nn.length; n++) {
//         for (let i in nn[n]) {
//             var sum = 0
//             for (let m in nn[n-1]) {
//                 sum += c[n-1][m+i] * nn[n-1][m]
//             }
//             nn[n][i] = s(sum)
//         }
//     }
// }

// update()
// function update() {
//     for (let n = nn.length-1; n < 0; n--) {
//         for (let i in nn[n]) {
//             var e = nn[n][i] - answer
//             for (let m in nn[n-1]) {
//                 c[n-1][m+i] *= 
//             }
//             nn[n][i] = s(sum)
//         }
//     }
// }


class Player {
    constructor(c,r,i) {
        this.y = ch/2
        this.x = 200
        this.run = true
        this.dy = 0
        this.nn = nn
        this.c = []
        this.i = i
        this.set(c,r,false)
    }

    set(c,r,o) {
        var a = JSON.parse(JSON.stringify(c))
        for (let i in a) {
            Object.entries(a[i]).forEach(
                ([key, value]) => {
                    var ran = Math.random()
                    if (o) {
                        ran = 0.5
                    }
                    let val = value + ran*r-r/2
                    if (val > 1) {
                        val = 1
                    } else if (val < -1) {
                        val = -1
                    }
                    a[i][key] = val
                }
            )
        }
        this.c = a
    }

    print() {
        shape('r',this.x,ch-this.y,50,50,'red')
    }

    move() {
        this.dy -= 0.8
        this.y += this.dy
        if (this.y <= 0) {
            this.dy = 0
            this.y = 0
        }
        var dis = this.x-x
        if (this.y < 25 | this.y > ch-25 | (Math.abs(dis) < 25+w/2 & (this.y < h+25 | this.y > h+wh-25))) {
            this.run = false
        }
        const r = exe(this)
        if (r > 0.7) {
            this.dy = 15
        }

        function exe(that) {
            let speed = that.dy
            if (speed < -15) {
                speed = -15
            }
            let bottom = (that.y-h)/ch*2
            if (bottom < 0) {
                bottom = 0
            } else if (bottom > 1) {
                bottom = 1
            }
            let top = (h+wh-that.y)/ch*2
            if (top < 0) {
                top = 0
            } else if (top > 1) {
                top = 1
            }
            let bluex = x
            if (bluex > cw*0.3) {
                bluex = cw*0.3
            }
            that.nn[0] = [that.y/(ch-50), bluex/cw/0.3, bottom, top]
            for (let n = 1; n < that.nn.length; n++) {
                for (let i in that.nn[n]) {
                    var sum = 0
                    var bias = 0
                    for (let m in that.nn[n-1]) {
                        sum += that.c[n-1][m+i] * that.nn[n-1][m]
                        // bias++
                    }
                    that.nn[n][i] = s(sum-bias)
                }
            }
            if (that.i == 0) {
                nn = that.nn
            }
            return that.nn[nn.length-1][0]
        }
    }
    
}


reset()
function reset() {
    answer = 0.5
    players = []
    run = false
    gen = 1
    x = cw
    h = 300
    w = 100
    progress = [0,0]
    
    pnn = [4,3,1]
    nn = []
    con = []

    for (let n in pnn) {
        let arr = []
        for (let i = 0; i < pnn[n]; i++) {
            arr.push(0)
        }
        nn.push(arr)
    }

    for (let n = 1; n < nn.length; n++) {
        let obj = {}
        for (let i in nn[n]) {
            for (let m in nn[n-1]) {
                obj[m+i] = 0
            }
        }
        con.push(obj)
    }

    for (let i = 0; i < birds; i++) {
        players.push(new Player(con,2,i))
    }
    players[0].print()
}



function play() {
    run = true
    animate()
}



function shape(type, x, y, w, h, color = 'black', deg = 0) {
    const rad = -deg * Math.PI / 180
    ctx.fillStyle = color
    if (type == 'r') {
        x -= w/2
        y -= h/2
        ctx.save()
        ctx.translate(x + w/2, y + h/2);
        ctx.rotate(rad);
        ctx.fillRect(-w/2, -h/2, w, h)
        ctx.restore()
    } else if (type == 'e') {
        ctx.beginPath();
        ctx.ellipse(x, y, w/2, h/2, rad, 0, 2 * Math.PI);
        ctx.fill()
    } else if (type == 'img') {
        x -= w/2
        y -= h/2
        ctx.save()
        ctx.translate(x + w/2, y + h/2);
        ctx.rotate(rad);
        ctx.drawImage(color, -w/2, -h/2, w, h)
        ctx.restore()
    }
    ctx.fillStyle = 'black'
}

function line(points, color = 'black', w = 2, fillColor) {
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (let i in points) {
        if (i > 0 & points[i].length == 2) {
            ctx.lineTo(points[i][0], points[i][1])
        }
    }
    if (fillColor) {
        ctx.closePath()
        ctx.fillStyle = fillColor
        if (fillColor) {
            ctx.fill()
        }
    }
    ctx.stroke()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}