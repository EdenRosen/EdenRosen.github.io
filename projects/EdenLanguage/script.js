const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const codeText = document.getElementById("codeText")
const console = document.getElementById("console")

var mouse = { x: 0, y: 0 }
var stopAnimation = false

$('#codeText').on('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault()
        console.log();
    }
    $(document).ready(function() {
        var lines = codeText.childElementCount
        if (!lines) {
            lines = 1
        }
        $numbers = $('#numbers')
        $numbers.html('')
        for (let i = 0; i < lines; i++) {
            $numbers.append(`<span>${i + 1}</span>`)
        }
    })
})

$('#runBtn').click(function() {
    $console = $('#console')
    $codeLine = $('#codeText > .codeLine')
    $console.html('')
    var code = ''
    stopAnimation = false
    clear()
    background('white')
    $codeLine.each(function() {
        let text = $(this).text().trim()
        if (text.includes('console.log(')) {
            text = text.replace(/console.log/g, 'log')
        }
        if (text) {
            code += text + ';'
        }
    })
    try { eval(code.slice(0, -1)) }
    catch (e) {
        log(e)
    }
})

$('#stopBtn').click(function() {
    stopAnimation = true
})

function log() {
    var text = ''
    for (let i in arguments) {
        text += arguments[i] + ' '
    }
    $console = $('#console')
    $console.append(`<span>${text}</span>`)
    console.scrollTo(0, console.scrollHeight)
}

function shape(type, x, y, w, h, color = 'black', deg = 0) {
    var rad = -deg * Math.PI / 180
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
    }
    ctx.fillStyle = 'black'
}

function line(points, color = 'black', w = 2, fillColor) {
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (let i in points) {
        if (i > 0) {
            ctx.lineTo(points[i][0], points[i][1])
        }
    }
    if (fillColor) {
        ctx.closePath()
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    ctx.stroke()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
}

function background(color) {
    canvas.style.background = color
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

$(canvas).bind('mousemove', function(e) {
    mouse.x = e.pageX - canvas.offsetLeft
    mouse.y = e.pageY - canvas.offsetTop
})

function frame(animate, condition = true) {
    var $run = $('#runBtn')
    var $stop = $('#stopBtn')
    $run.hide()
    $stop.show()
    $stop.addClass('active')
    if (condition & !stopAnimation) {
        requestAnimationFrame(animate)
    } else {
        stopAnimation = false
        $run.show()
        $stop.hide()
        $stop.addClass('active')
    }
}