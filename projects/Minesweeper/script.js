const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const BX = 11
const BY = 10
const MINE_PERCENT = 0.25
const BLOCK_PADDING = 3
const BLOCK_GAP = 0
const MAP_MARGIN_TOP = 90
const cw = 1000
const bs = cw/BX
const ch = Math.floor(MAP_MARGIN_TOP + bs*BY)
const ratio = 700/cw
const mines = Math.floor(BX*BY*MINE_PERCENT)
const COLORS = [
    'blue',
    'red',
    'yellow',
    'green',
    'orange',
]

canvas.width = cw
canvas.height = ch


var running = false
var time = 0
var interval
var mouse = {
    x: 0,
    y: 0,
    which: 0,
}
var map = []
var mapPrepared = false

reset()
print()
function reset() {
    running = false
    clearInterval(interval)
    time = 0
    resetMap()
}

function start() {
    if (!running) {
        running = true
        $('#playButton').text('reset')
        print()
        interval = setInterval(() => {
            time++
            print()
        }, 1000)
    } else {
        $('#playButton').text('start')
        reset()
        print()
    }
}

function resetMap() {
    mapPrepared = false
    map = []
    for (let y = 0; y < BY; y++) {
        let row = []
        for (let x = 0; x < BX; x++) {
            row.push([0, 0])
        }
        map.push(row)
    }
}

function prepareMap(rx, ry) {
    mapPrepared = true
    var planted = 0
    
    while (planted < mines) {
        for (let y = 0; y < BY; y++) {
            for (let x = 0; x < BX; x++) {
                const close = Math.abs(x - rx) <= 1 && Math.abs(y - ry) <= 1
                const rand = Math.random()
                if (map[y][x][0] == 0 && !close && planted < mines && rand < MINE_PERCENT) {
                    map[y][x][0] = -1
                    planted++
                }
            }
        }
    }

    for (let y = 0; y < BY; y++) {
        for (let x = 0; x < BX; x++) {
            if (map[y][x][0] == 0) {
                let count = 0
                for (let dy = 0; dy < 3; dy++) {
                    for (let dx = 0; dx < 3; dx++) {
                        try {
                            if (map[y + dy - 1][x + dx - 1][0] == -1) {
                                count++
                            }

                        } catch {}
                    }
                }
                map[y][x][0] = count
            }
        }
    }


}

function print() {
    c.clear()
    c.text(time, 50, 50)

    const size1 = bs - 2*BLOCK_GAP
    const size2 = size1 - 2*BLOCK_PADDING
    const size3 = size2*0.5

    for (let x = 0; x < BX; x++) {
        for (let y = 0; y < BY; y++) {
            c.rect(bs/2 + x*bs, MAP_MARGIN_TOP + bs/2 + y*bs, size1, size1, 'rgb(80,80,80)')
            c.rect(bs/2 + x*bs, MAP_MARGIN_TOP + bs/2 + y*bs, size2, size2, 'rgb(180,180,180)')
            if (map.length > 0) {
                if (map[y][x][1] == 1) {
                    let color = 'black'
                    if (map[y][x][0] <= COLORS.length)  {
                        color = COLORS[map[y][x][0]-1]
                    }
                    if (map[y][x][0] == -1)  {
                        c.oval(bs/2 + x*bs, MAP_MARGIN_TOP + bs/2 + y*bs, size3, size3, 'rgb(0,0,0)')
                    } else if (map[y][x][0] != 0) {
                        c.text(map[y][x][0], bs/2 + x*bs - 14, MAP_MARGIN_TOP + bs/2 + y*bs + 16, 50, color)
                    }
                    
                }
                if (map[y][x][1] == 2) {
                    c.oval(bs/2 + x*bs, MAP_MARGIN_TOP + bs/2 + y*bs, size3, size3, 'rgb(180,0,0)')
                }
            }
        }
    }
}

function revealBlock(rx, ry) {
    map[ry][rx][1] = 1
    
    if (map[ry][rx][0] == 0) {
        for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
                try {
                    let block = map[ry + dy - 1][rx + dx - 1]
                    if ((dx != 1 || dy != 1) && block[1] == 0) {
                        revealBlock(rx + dx - 1, ry + dy - 1)
                    }
                } catch {}
            }
        }

    }
}

function blockClick(rx, ry) {
    if (mouse.which == 1) {
        if (!mapPrepared) {
            start()
            prepareMap(rx, ry)
        }
        revealBlock(rx, ry)
        if (map[ry][rx][0] == -1) {
            
            for (let x = 0; x < BX; x++) {
                for (let y = 0; y < BY; y++) {
                    
                    map[y][x][1] = 1
                }
            }
        }
    } else if (mouse.which == 3) {
        if (map[ry][rx][1] == 0) {
            map[ry][rx][1] = 2
        } else if (map[ry][rx][1] == 2) {
            map[ry][rx][1] = 0
        }
    }
    print()
}

$('#playButton').click(function() {
    start()
})

$('canvas').mousedown(function(e) {
    mouse = {
        x: Math.floor((e.pageX - canvas.offsetLeft)/ratio),
        y: Math.floor((e.pageY - canvas.offsetTop)/ratio),
        which: e.which,
    }
    let rx = Math.round(mouse.x/bs - 0.5)
    let ry = Math.round((mouse.y - MAP_MARGIN_TOP)/bs - 0.5)
    blockClick(rx, ry)
})

$('canvas').mousemove(function(e) {
    mouse = {
        x: Math.floor((e.pageX - canvas.offsetLeft)/ratio),
        y: Math.floor((e.pageY - canvas.offsetTop)/ratio),
        which: e.which,
    }
})

canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault()
});