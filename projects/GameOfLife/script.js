const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const bs = 10
const width = 50
const height = 40
const cw = 1000
const ch = 800

canvas.width = cw;
canvas.height = ch;

var cells = []
var run = false

print()

$('#playButton').click(function() {
    if (run) {
        run = false
        $(this).text('Play')
        $(this).toggleClass('stopBtn')
    } else {
        run = true
        animate()
        $(this).text('Stop')
        $(this).toggleClass('stopBtn')
    }
})

function print() {
    c.clear()
    cells.forEach(b => {
        c.rect((b.x+0.5)*bs,(b.y+0.5)*bs,bs,bs)
    })
}

function generation() {
    let next = []
    cells.forEach(b => {
        let blacks = neighbors(b)
        let whites = neighbors(b,true)
        if (blacks.length == 2 | blacks.length == 3) {
            next.push({x:b.x,y:b.y})
        }
        whites.forEach(b2 => {
            if (neighbors(b2).length == 3 & !isBlack(b2,next)) {
                next.push(b2)
            }
        })
    })
    cells = next
}

function neighbors(b,findWhite = false) {
    let black = []
    let white = []
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (x == 1 & y == 1) {
                continue
            }
            let b2 = {x:b.x+x-1,y:b.y+y-1}
            if (isBlack(b2)) {
                black.push(b2)
            } else {
                white.push(b2)
            }
        }
    }
    if (findWhite) {
        return white
    }
    return black
}

function isBlack(b,map = cells) {
    let found = map.find(b2 => b2.x == b.x & b2.y == b.y)
    if (found == undefined) {
        return false
    }
    return true
}

$('canvas').click(function(e) {
    let mouse = {}
    mouse.x = Math.floor((e.pageX - canvas.offsetLeft)/bs)
    mouse.y = Math.floor((e.pageY - canvas.offsetTop)/bs)
    let b = mouse
    if (isBlack(b)) {
        cells = cells.filter(b2 => !(b2.x == b.x & b2.y == b.y))
    } else {
        cells.push(b)
    }
    print()
})

