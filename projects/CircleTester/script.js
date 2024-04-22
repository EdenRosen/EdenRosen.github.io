const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const width = 50
const height = 40
const cw = 1000
const ch = 800

canvas.width = cw;
canvas.height = ch;

const ratio = 1

var run = false
var mouse = {
    x: 0,
    y: 0,
    which: 0,
}
var dots = []
var middle = new Dot({x:0, y:0})

function print() {
    c.clear()
    for (let i = 0; i < dots.length; i++) {
        c.line(dots)
    }
    // c.oval(middle.x, middle.y, 5,5)
    const x = calcCircle()
    const per = Math.round(x * 100)
    if (per >= 90) {
        c.line([dots[0], dots[dots.length-1]])
    }

    c.text(per+'%', 10, 50, 30, `rgb(${(1-x)*255},${x*255},0)`)
}

$('#playButton').click(function() {
    dots = []
    print()
})

$('canvas').click(function(e) {
    let mouse = {}
    mouse.x = Math.floor((e.pageX - canvas.offsetLeft)/ratio)
    mouse.y = Math.floor((e.pageY - canvas.offsetTop)/ratio)
})

$('canvas').mousemove(function(e) {
    mouse = {
        x: Math.floor((e.pageX - canvas.offsetLeft)/ratio),
        y: mouse.y = Math.floor((e.pageY - canvas.offsetTop)/ratio),
        which: e.which,
    }
    if (mouse.which == 1) {
        if (dots.length == 0 || magnitude(mouse, dots[dots.length-1]) > 30) {
            const point = {
                x: mouse.x,
                y: mouse.y,
            }
            var dot = new Dot(point)
            dots.push(dot)
            middle = {x:0, y:0}
            for (d of dots) {
                middle.x += d.x
                middle.y += d.y
            }
            middle.x /= dots.length
            middle.y /= dots.length
        }
        
        print()
    }
        
})

function magnitude(p1, p2) {
    return Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2))
}

function calcCircle() {
    var avRadius = 0
    for (d of dots) {
        avRadius += magnitude(d, middle)
    }
    avRadius /= dots.length
    
    if (avRadius == 0 || avRadius == NaN || dots.length < 6) return 0

    var error = 0
    for (d of dots) {
        const mag = magnitude(d, middle)
        const e = Math.pow(avRadius - mag, 2)
        error += e

    }
    error /= dots.length
    error /= Math.pow(avRadius, 2)
    error *= 1000
    const x = error
    
    result = Math.pow(Math.E, -x/20)
    // result = 1/(x*x/30 + 1) * 100

    return result
}