const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const cw = 1200
const ch = 700
canvas.width = cw;
canvas.height = ch;
const neat = new Neat([8,6,3],c)
const gs = 18 // game size
const gsip = ch*0.95 // game size in pixels
const ranges = [0.05,0.1,0.2,0.3,0.5]
const population = 1000

var speed  // percentages
var parts
var running
var generation
var time
var length
var dir
var tail
var apple
var snake
var megafast

function reset() {
    parts = [{x:gs/2,y:gs/2}]
    running = false
    generation = 1
    time = 0
    length = 5
    dir = 'u'
    tail = parts[0]
    apple = {x:0,y:-100}
    fast(1)
}

function fast(level) {
    if (level <= 3) {
        if (megafast > 1) {
            start()
            setTimeout(start,100)
        }
        megafast = 1
    } else {
        megafast = level-2
        setTimeout(animate,1)
    }
    if (level == 1) {
        speed = 3
    } else if (level == 2) {
        speed = 10
    } else if (level >= 3) {
        speed = 100
    }
}




const dis = (p1, p2) => Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))

class Snake {
    constructor () {
        this.nn = neat.create()
        this.parts
        this.running
        this.score
        this.length
        this.dir
        this.apple
        this.time
        this.reset()
    }

    reset () {
        this.parts = [{x:gs/2,y:gs/2}]
        this.running = true
        this.score = 0
        this.length = 5
        this.dir = 'r'
        this.apple = this.placeApple()
        this.time = 0
    }

    move () {
        let head = this.parts[0]
        if (head.x == this.apple.x & head.y == this.apple.y) {
            this.score++
            this.length++
            this.apple = this.placeApple()
            this.time = 0
        }
        for (let i = this.length-1; i > 0; i--) {
            if (this.parts.length == i) {
                this.parts.push({x:0,y:0})
            } else if (this.parts.length < i) {
                continue
            }
            this.parts[i].x = this.parts[i-1].x
            this.parts[i].y = this.parts[i-1].y
        }
        if (this.dir == 'u') {
            this.parts[0].y--
        } else if (this.dir == 'd') {
            this.parts[0].y++
        } else if (this.dir == 'r') {
            this.parts[0].x++
        } else if (this.dir == 'l') {
            this.parts[0].x--
        }
        for (let i = 3; i < parts.length; i++) {
            if (parts[i].x == head.x & parts[i].y == head.y) {
                this.running = false
            }
        }
        if (head.x < 0 | head.x >= gs | head.y < 0 | head.y >= gs | this.time > 100) {
            this.running = false
        }
        this.run(this.inputs())
        this.time++
    }

    placeApple () {
        let x
        let y
        let free
        do {
            x = Math.floor(Math.random()*gs)
            y = Math.floor(Math.random()*gs)
            free = true
            this.parts.forEach(p => {
                if (p.x == x & p.y == y) {
                    free = false
                }
            })
        } while (!free)
        return {x,y}
    }

    inputs () {
        let lasers = [0,0,0,0,0]
        let stepdirs = [{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:1,y:0}]
        let head = this.parts[0]
        stepdirs.forEach((s,i) => {
            let x = head.x
            let y = head.y
            if (this.dir == 'd') {
                s = {x:s.x,y:-s.y}
            } else if (this.dir == 'r') {
                s = {x:-s.y,y:s.x}
            } else if (this.dir == 'l') {
                s = {x:s.y,y:-s.x}
            }
            let wall
            do {
                wall = x < 0 | x >= gs | y < 0 | y >= gs
                for (let i = 3; i < parts.length; i++) {
                    if (parts[i].x == x & parts[i].y == y) {
                        wall = true
                    }
                }
                x += s.x
                y += s.y
                lasers[i]++
            }
            while (!wall)
        })

        let ar = 0
        let al = 0
        let af = 0
        if (this.dir == 'u') {
            ar = head.x < this.apple.x ? 1:0
            al = head.x > this.apple.x ? 1:0
            af = head.x == this.apple.x & head.y < this.apple.y ? 1:0
        } else if (this.dir == 'd') {
            ar = head.x > this.apple.x ? 1:0
            al = head.x < this.apple.x ? 1:0
            af = head.x == this.apple.x & head.y > this.apple.y ? 1:0
        } else if (this.dir == 'r') {
            ar = head.y < this.apple.y ? 1:0
            al = head.y > this.apple.y ? 1:0
            af = head.y == this.apple.y & head.x < this.apple.x ? 1:0
        } else if (this.dir == 'l') {
            ar = head.y > this.apple.y ? 1:0
            al = head.y < this.apple.y ? 1:0
            af = head.y == this.apple.y & head.x > this.apple.x ? 1:0
        }
        
        lasers = lasers.map(l => Math.floor(l/gs*100)/100)
        lasers.push(al,af,ar)
        return lasers
    }

    run (inputs) {
        let result = this.nn.run(inputs)
        let max = Math.max(...result)
        let index = result.indexOf(max)
        let dirs = ['l','u','r','d']
        let current = dirs.indexOf(this.dir)
        let final = current + index-1
        while (final < 0) {
            final += 4
        }
        final = final%4
        this.dir = dirs[final]
    }
}

var snakes = []
for (let i = 0; i < population; i++) {
    snakes.push(new Snake())
}
snake = snakes[0]
parts = snake.parts
length = snake.length
neat.cons = snake.nn.cons
// neat.nodes = snake.nn.nodes

reset()
print()



function start() {
    if (running) {
        running = false
    } else {
        running = true
        // frame()
        animate()
    }
}

function print(t = 0) {
    neat.print()
    let bs = gsip/gs
    let b = (ch-gsip)/2+0.5*bs
    let f = bs*t/100
    c.shape('r',cw-ch/2,ch/2,gsip,gsip)
    c.shape('e',cw-ch+b+bs*apple.x,b+bs*apple.y,bs*0.8,bs*0.8,'red')
    parts.forEach((p,i) => {
        let more = {x:0,y:0}
        let p2
        if (i < parts.length-1) {
            p2 = parts[i+1]
        } else {
            p2 = tail
        }
        if (p.x == p2.x & p.y != p2.y) {
            more.y = p.y > p2.y ? 1 : -1
        } else if (p.x != p2.x & p.y == p2.y) {
            more.x = p.x > p2.x ? 1 : -1
        } else {
            c.shape('r',cw-ch+b+bs*p2.x,b+bs*p2.y,bs,bs,'green')
        }
        
        if (!snake.running) {
            more.x = 0
            more.y = 0
        }
        
        c.shape('r',cw-ch+b+bs*p2.x + more.x*f,b+bs*p2.y + more.y*f,bs,bs,'green')
    })
}

$(document).keydown(function(e) {
    if (!running) {
        return
    }
    if (e.key == 'ArrowUp' & parts[1].y == parts[0].y) {
        snake.dir = 'u'
    } else if (e.key == 'ArrowDown' & parts[1].y == parts[0].y) {
        snake.dir = 'd'
    } else if (e.key == 'ArrowRight' & parts[1].x == parts[0].x) {
        snake.dir = 'r'
    } else if (e.key == 'ArrowLeft' & parts[1].x == parts[0].x) {
        snake.dir = 'l'
    }
})
