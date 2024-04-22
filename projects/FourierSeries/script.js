const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500
ctx.lineWidth = 1.5

const START_INPUT = '[10,1,90],[120,-1,90],[20,2,-90],[20,-2,-90],[7,3,90],[20,-3,-90],[3,4,-90],[3,-4,-90],'
console.log('Sun: [100,1,90],[20,-21,90],[20,23,90]');

var lines = []
var run = false
var end = null
var results = []

$('input').val(START_INPUT)
$('input').on('input', () => {
    setLines()
    printLines()
})
setLines()
printLines()

$('#runBtn').click(function() {
    setLines()
    end = null
    results = []
    if (run) {
        run = false
    } else {
        run = true
        animate()
    }
})

function setLines() {
    try {
        if ($('input').val() != '') {
            lines = eval(`[${$('input').val()}]`)
        }    
    } catch {}
    
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (run) {
        requestAnimationFrame(animate)
    }
    printLines()
    if (results.length) {
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.moveTo(results[0].x, results[0].y)
        for (let i in results) {
            ctx.lineTo(results[i].x, results[i].y)
        }
        ctx.stroke()
    }
}

function printLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (end) {
        results.push(end)
    }
    end = { x: 250, y: 250 }
    ctx.strokeStyle = 'red'
    for (let i in lines) {
        const line = lines[i]
        const rad = -Math.PI/180
        ctx.beginPath()
        ctx.moveTo(end.x, end.y)
        end.x += line[0]*Math.cos(line[2]*rad)
        end.y += line[0]*Math.sin(line[2]*rad)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        lines[i][2] += line[1]/2
    }
}