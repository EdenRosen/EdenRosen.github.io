const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const BX = 10
const BY = 10
const BLOCK_GAP = 4
const MAP_MARGIN_TOP = 100
const MAP_MARGIN_BOTTOM = 360
const cw = 1000
const bs = cw/BX
const ch = Math.floor(MAP_MARGIN_TOP + bs*BY + MAP_MARGIN_BOTTOM)
const ratio = 500/cw
const MENU_SHAPE_SIZE = 0.6
const LINE_DELAY = 30
const COLORS = [
    'blue',
    'cyan',
    'red',
    'yellow',
    'green',
    'orange',
    'lightgreen',
    'pink',
    'purple',
]
const SHAPES = [
    [
        '11111',
    ],
    [
        '1111',
    ],
    [
        '111',
    ],
    [
        '11',
    ],
    [
        '1',
    ],
    [
        '111',
        '111',
        '111',
    ],
    [
        '11',
        '11',
    ],
    [
        '111',
        '100',
        '100',
    ],
    [
        '11',
        '10',
    ],
]

canvas.width = cw
canvas.height = ch


var running = false
var mouse = {
    x: 0,
    y: 0,
    which: 0,
    down: false,
}
var map = []
var score = 0
var shapeMenu = [[0, 0], [1, 1], [2, 0]]
var shapeHold = null
var disabled = false
var popSound = new Audio('sounds/pop2.mp3');
popSound.volume = 0.005

reset()
print()
function reset() {
    running = false
    map = []
    score = 0
    shapeMenu = [null, null, null]
    shapeHold = null
    disabled = false
    resetMap()
    print()
}

function start() {
    running = true
    setShapeMenu()
    print()
}

function startClick() {
    if (!running) {
        $('#playButton').text('reset')
        start()
    } else {
        $('#playButton').text('start')
        reset()
    }
}

function resetMap() {
    map = []
    for (let y = 0; y < BY; y++) {
        let row = []
        for (let x = 0; x < BX; x++) {
            row.push(0)
        }
        map.push(row)
    }
}

function setShapeMenu() {
    for (let i in shapeMenu) {
        const randomShape = Math.floor(Math.random() * SHAPES.length)
        const randomRotations = Math.floor(Math.random() * 4)
        shapeMenu[i] = [randomShape, randomRotations]
    }
}

function print() {
    c.clear()
    c.text(score, 50, 70, 40)

    const size1 = bs - 2*BLOCK_GAP
    const color1 = 180
    const defaultColor = `rgb(${color1},${color1},${color1})`

    for (let x = 0; x < BX; x++) {
        for (let y = 0; y < BY; y++) {
            let color
            if (map[y][x] > 0) {
                color = COLORS[map[y][x]-1]
            } else {
                color = defaultColor
            }
            c.rect(bs/2 + x*bs, MAP_MARGIN_TOP + bs/2 + y*bs, size1, size1, color)
        }
    }

    printMenu()
    printFollowShape()
}

function printMenu() {
    for (let i = 0; i < 3; i++) {
        if (!shapeMenu[i]) {
            continue
        }
        const shapeIndex = shapeMenu[i][0]
        const rotations = shapeMenu[i][1]
        var shape = SHAPES[shapeIndex]
        shape = rotateShape(shape, rotations)
        const xOffset = cw/6
        const yOffset = MAP_MARGIN_BOTTOM/2
        printShape(
            xOffset + i*cw/3, yOffset + ch - MAP_MARGIN_BOTTOM,
            shape, shapeIndex, MENU_SHAPE_SIZE, MENU_SHAPE_SIZE
        )
    }
}

function printFollowShape() {
    if (!shapeHold) {
        return
    }
    const shapeIndex = shapeHold[0][0]
    const rotations = shapeHold[0][1]
    var shape = SHAPES[shapeIndex]
    shape = rotateShape(shape, rotations)
    printShape(
        mouse.x, mouse.y,
        shape, shapeIndex, 0.9, 1
    )
}

function rotateShapeOnce(shape) {
    var newShape = []
    for (let x = shape[0].length-1; x >= 0; x--) {
        var row = ''
        for (let y = 0; y < shape.length; y++) {
            row += shape[y][x]
        }
        newShape.push(row)
    }
    return newShape
}

function rotateShape(shape, rotations=1) {
    var rotated = shape
    for (let i = 0; i < rotations; i++) {
        rotated = rotateShapeOnce(rotated)
    }
    return rotated
}

function printShape(sx, sy, shape, shapeIndex, size=1, gap=1) {
    const size1 = bs - 2*BLOCK_GAP
    const psize = size1*size
    const pgap = bs*gap
    const width = shape[0].length
    const height = shape.length
    const xOffset = width*bs*size / 2
    const yOffset = height*bs*size / 2

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const color = COLORS[shapeIndex]
            
            if (shape[y][x] == 1) {
                c.rect(-xOffset + sx + pgap/2 + x*pgap, -yOffset + sy + pgap/2 + y*pgap, psize, psize, color)
            }
            
        }
    }
}

function checkLines() {
    disabled = true
    var completedRows = []
    var completedColumns = []
    
    for (let x = 0; x < BX; x++) {
        let completed = true
        for (let y = 0; y < BY; y++) {
            if (map[y][x] == 0) {
                completed = false
                break
            }
        }
        if (completed) {
            completedColumns.push(x)
        }
    }
    
    for (let y = 0; y < BY; y++) {
        let completed = true
        for (let x = 0; x < BX; x++) {
            if (map[y][x] == 0) {
                completed = false
                break
            }
        }
        if (completed) {
            completedRows.push(y)
        }
    }

    for (let l of completedColumns) {
        for (let i = 0; i < BY; i++) {
            setTimeout(() => {
                map[i][l] = 0
                print()
                popSound.play()
            }, i * LINE_DELAY)
        }
    }

    for (let l of completedRows) {
        for (let i = 0; i < BY; i++) {
            setTimeout(() => {
                map[l][i] = 0
                print()
            }, i * LINE_DELAY)
        }
    }
    const num = completedColumns.length + completedRows.length
    score += 5*num*(num+1)
    if (num == 0) {
        disabled = false
    }

    setTimeout(() => {
        if (checkIfLost()) {
            alert('Are you stupid or what? You fucking loser!')
        } else {
            disabled = false
        }
    }, Math.max(BY, BX) * LINE_DELAY)

}

function createStamp(shape, bx, by) {
    let stamp = []
        
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            const b = [bx + x, by + y]
            const outOfBounds = b[0] < 0 || b[0] >= BX || b[1] < 0 || b[1] >= BY
            if (outOfBounds || map[b[1]][b[0]] != 0 && shape[y][x] == 1) {
                return null
            } else if (shape[y][x] == 1) {
                stamp.push(b)
            }
            
        }
    }

    return stamp
}

function checkIfLost() {
    for (let s of shapeMenu) {
        if (s) {
            var shape = SHAPES[s[0]]
            shape = rotateShape(shape, s[1])
            
            for (let x = 0; x < BX; x++) {
                for (let y = 0; y < BY; y++) {
                    const stamp = createStamp(shape, x, y)
                    if (stamp) {
                        return false
                    }
                }
            }
        }
    }
    return true
}

function click() {
    if (disabled) return
    if (mouse.y > ch - MAP_MARGIN_BOTTOM) {
        if (shapeHold && !mouse.down) {
            shapeMenu[shapeHold[1]] = shapeHold[0]
            shapeHold = null
            return
        }
        const index = Math.floor(mouse.x/cw*3)
        if (shapeMenu[index] == null) {
            return
        }
        shapeHold = [shapeMenu[index], index]
        shapeMenu[index] = null
    } else if (mouse.y > MAP_MARGIN_TOP && mouse.y < MAP_MARGIN_TOP + BY*bs) {
        if (!shapeHold) {
            return
        }
        
        const shapeIndex = shapeHold[0][0]
        const rotations = shapeHold[0][1]
        var shape = SHAPES[shapeIndex]
        shape = rotateShape(shape, rotations)
        const xOffset = shape[0].length*bs / 2
        const yOffset = shape.length*bs / 2

        const bx = Math.floor((mouse.x - xOffset)/bs + 0.5)
        const by = Math.floor((mouse.y- MAP_MARGIN_TOP - yOffset )/bs + 0.5)

        let stamp = createStamp(shape, bx, by)
        if (!stamp) {
            shapeMenu[shapeHold[1]] = shapeHold[0]
            shapeHold = null
            return
        }
        for (let b of stamp) {
            map[b[1]][b[0]] = shapeIndex+1
        }
        shapeHold = null
        if (!shapeMenu.find(s => s != null)) {
            setShapeMenu()
        }
        checkLines()
        score += stamp.length
        popSound.play()
    }
}

$('#playButton').click(function() {
    startClick()
})

$('canvas').mousedown(function(e) {
    mouse = {
        x: Math.floor((e.pageX - canvas.offsetLeft)/ratio),
        y: Math.floor((e.pageY - canvas.offsetTop)/ratio),
        which: e.which,
        down: true,
    }
    click()
    print()
})

$('canvas').mouseup(function(e) {
    mouse = {
        x: Math.floor((e.pageX - canvas.offsetLeft)/ratio),
        y: Math.floor((e.pageY - canvas.offsetTop)/ratio),
        which: e.which,
        down: false,
    }
    click()
    print()
})

$('canvas').mousemove(function(e) {
    mouse.x = Math.floor((e.pageX - canvas.offsetLeft)/ratio)
    mouse.y = Math.floor((e.pageY - canvas.offsetTop)/ratio)
    mouse.which = e.which
    print()
})

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault()
})