const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 800;

var map
var hard
const hardButton = document.getElementById('hard')

hardButton.addEventListener('click', () => {
    hard = hardButton.checked
})



reset()

function reset() {
    map = [
        ['r', 'kn', 'b', 'q', 'ki', 'b', 'kn', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p-', 'p-', 'p-', 'p-', 'p-', 'p-', 'p-', 'p-'],
        ['r-', 'kn-', 'b-', 'q-', 'ki-', 'b-', 'kn-', 'r-']
    ]
    board()
}

function board() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if ((x + y) % 2 == 0) {
                c.fillStyle = 'rgb(204, 122, 0)'
            } else {
                c.fillStyle = 'rgb(255, 214, 153)'
            }
            c.fillRect(x * 100, y * 100, 100, 100)
            if (map[y][x] == 'p') {
                pawn(x * 100, y * 100)
            } else if (map[y][x] == 'kn') {
                knight(x * 100, y * 100)
            } else if (map[y][x] == 'b') {
                bishop(x * 100, y * 100)
            } else if (map[y][x] == 'r') {
                rook(x * 100, y * 100)
            } else if (map[y][x] == 'q') {
                queen(x * 100, y * 100)
            } else if (map[y][x] == 'ki') {
                king(x * 100, y * 100)
            } else if (map[y][x] == 'p-') {
                pawn(x * 100, y * 100, true)
            } else if (map[y][x] == 'kn-') {
                knight(x * 100, y * 100, true)
            } else if (map[y][x] == 'b-') {
                bishop(x * 100, y * 100, true)
            } else if (map[y][x] == 'r-') {
                rook(x * 100, y * 100, true)
            } else if (map[y][x] == 'q-') {
                queen(x * 100, y * 100, true)
            } else if (map[y][x] == 'ki-') {
                king(x * 100, y * 100, true)
            }
        }
    }
}

function pawn(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/pawn-.png'
    } else {
        img.src = 'img/pawn.png'
    }
    img.onload = () => c.drawImage(img, x + 10, y + 12, 80, 80)
}

function rook(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/rook-.png'
    } else {
        img.src = 'img/rook.png'
    }
    img.onload = () => c.drawImage(img, x + 25, y + 15, 50, 70)
}

function bishop(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/bishop-.png'
    } else {
        img.src = 'img/bishop.webp'
    }
    img.onload = () => c.drawImage(img, x + 5, y + 5, 90, 90)
}

function knight(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/knight-.png'
    } else {
        img.src = 'img/knight.jpg'
    }
    img.onload = () => c.drawImage(img,  x + 10, y + 10, 80, 83)
}

function queen(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/queen-.png'
    } else {
        img.src = 'img/queen.png'
    }
    img.onload = () => c.drawImage(img,  x + 15, y + 20, 70, 70)
}

function king(x, y, white) {
    let img = new Image()
    if (white) {
        img.src = 'img/king-.png'
    } else {
        img.src = 'img/king.png'
    }
    img.onload = () => c.drawImage(img,  x + 15, y + 20, 70, 70)
}

let piece = { name: '', x: 0, y: 0 }

canvas.addEventListener('mousedown', e => {
    let x
    if (window.innerWidth > canvas.width) {
        x = e.clientX - (window.innerWidth - canvas.width) / 2 - 50
    } else {
        x = e.clientX - 50
    }
    let y = e.clientY - 153
    x = Math.round(x / 100)
    y = Math.round(y / 100)
    piece.name = map[y][x]
    piece.x = x
    piece.y = y
})
canvas.addEventListener('mouseup', e => {
    let x
    if (window.innerWidth > canvas.width) {
        x = e.clientX - (window.innerWidth - canvas.width) / 2 - 50
    } else {
        x = e.clientX - 50
    }
    let y = e.clientY - 153
    x = Math.round(x / 100)
    y = Math.round(y / 100)
    let places = options(piece.x, piece.y, true)
    let canMove = false
    places.forEach(option => {
        if (x == option.x && y == option.y) {
            canMove = true
        }
    })
    
    if (canMove) {
        map[piece.y][piece.x] = ''
        targetName = map[y][x]
        map[y][x] = piece.name
        if (isCheck(true)) {
            map[piece.y][piece.x] = piece.name
            map[y][x] = targetName
        } else {
            for (let i = 0; i < 8; i++) {
                if (map[0][i] == 'p-') {
                    con = confirm('OK = Queen, Cancel = Knight')
                    if (con) {
                        map[0][i] = 'q-'
                    } else {
                        map[0][i] = 'kn-'
                    }
                    
                }
            }
            if (piece.name == 'ki-' && piece.x - x == -2) {
                map[7][7] = ''
                map[7][5] = 'r-'
            }
            if (piece.name == 'ki-' && piece.x - x == 2) {
                map[7][0] = ''
                map[7][3] = 'r-'
            }
            board()
            setTimeout(ai, 200)
        }
        
    }
    piece.name = ''
})

function options(x, y, isPlayer) {
    let places = []
    let name = map[y][x]
    if (name[name.length - 1] == '-') {
        name = name.substring(0, name.length - 1)
    } else if (isPlayer) {
        return places
    }
    if (name == 'p') {
        if (isPlayer) {
            try {
                if (map[y - 1][x] == '') {
                    places.push({ x: x, y: y - 1 })
                    if (y == 6 && map[4][x] == '') {
                        places.push({ x: x, y: y - 2 })
                    }
                }
            } catch {}
            if (isLegalPawn(x + 1, y - 1)) {
                places.push({ x: x + 1, y: y - 1 })
            }
            if (isLegalPawn(x - 1, y - 1)) {
                places.push({ x: x - 1, y: y - 1 })
            }
        } else {
            try {
                if (map[y + 1][x] == '') {
                    places.push({ x: x, y: y + 1 })
                    if (y == 1 && map[3][x] == '') {
                        places.push({ x: x, y: y + 2 })
                    }
                }
            } catch {}
            if (isLegalPawn(x + 1, y + 1)) {
                places.push({ x: x + 1, y: y + 1 })
            }
            if (isLegalPawn(x - 1, y + 1)) {
                places.push({ x: x - 1, y: y + 1 })
            }
        }
    } else if (name == 'kn') {
        knightCheck(1, 2)
        knightCheck(-1, 2)
        knightCheck(1, -2)
        knightCheck(-1, -2)
        knightCheck(2, 1)
        knightCheck(-2, 1)
        knightCheck(2, -1)
        knightCheck(-2, -1)
        function knightCheck(dx, dy) {
            if (isLegal(x + dx, y + dy)) {
                places.push({ x: x + dx, y: y + dy })
            }
        }
    } else if (name == 'b') {
        check(1, -1)
        check(-1, -1)
        check(-1, 1)
        check(1, 1)
    } else if (name == 'r') {
        check(1, 0)
        check(-1, 0)
        check(0, 1)
        check(0, -1)
    } else if (name == 'q') {
        check(1, -1)
        check(-1, -1)
        check(-1, 1)
        check(1, 1)
        check(1, 0)
        check(-1, 0)
        check(0, 1)
        check(0, -1)
    } else if (name == 'ki') {
        kingCheck(1, 1)
        kingCheck(1, -1)
        kingCheck(-1, 1)
        kingCheck(-1, -1)
        kingCheck(0, 1)
        kingCheck(0, -1)
        kingCheck(1, 0)
        kingCheck(-1, 0)
        if (isPlayer && x == 4 && y == 7) {
            if (map[7][7] == 'r-' && map[7][6] == '' && map[7][5] == '') {
                places.push({ x: 6, y: 7 })
            }
            if (map[7][0] == 'r-' && map[7][1] == '' && map[7][2] == '' && map[7][3] == '') {
                places.push({ x: 2, y: 7 })
            }
        }
        function kingCheck(dx, dy) {
            if (isLegal(x + dx, y + dy)) {
                places.push({ x: x + dx, y: y + dy })
            }
        }
    }
    return places
    function check(dx, dy) {
        for (let i = 1; i < 8; i++) {
            if (isLegal(x + i * dx, y + i * dy)) {
                places.push({ x: x + i * dx, y: y + i * dy })
                if (map[y + i * dy][x + i * dx] != '') {
                    break
                }
            } else {
                break
            }
        }
    }
    function isLegal(x, y) {
        let p = map[y]
        if (p == undefined) {
            return false
        }
        p = p[x]
        if (p == undefined) {
            return false
        }
        if (isPlayer) {
            return p == '' || p[p.length - 1] != '-'
        } else {
            return p == '' || p[p.length - 1] == '-'
        }
    }
    function isLegalPawn(x, y) {
        let p = map[y]
        if (p == undefined) {
            return false
        }
        p = p[x]
        if (p == undefined) {
            return false
        }
        if (isPlayer) {
            return p != '' && p[p.length - 1] != '-'
        } else {
            return p[p.length - 1] == '-'
        }
        
    }
}

function isCheck(isPlayer) {
    let king
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (isPlayer && map[y][x] == 'ki-' || !isPlayer && map[y][x] == 'ki') {
                king = { x, y }
            }
        }
    }
    piecesOptions = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let p = map[y][x]
            if (options(x, y, !isPlayer).length > 0) {
                if (p[p.length - 1] != '-' && isPlayer || p[p.length - 1] == '-' && !isPlayer) {
                    piecesOptions.push({ x, y })
                }
            }
        }
    }
    let result = false
    piecesOptions.forEach(p => {
        options(p.x, p.y, !isPlayer).forEach(t => {
            if (t.x == king.x && t.y == king.y) {
                result = true
            }
        })
    })
    return result
}


// let mouse = {x: 0, y: 0}
// let hold = false
// canvas.addEventListener('mousedown', e => {
//     hold = true
//     animate()
// })
// canvas.addEventListener('mouseup', e => {
//     hold = false
// })
// canvas.addEventListener('mousemove', e => {
//     mouse.x = e.clientX - (window.innerWidth - canvas.width) / 2
//     mouse.y = e.clientY - 153
// })
// function animate() {
//     if (hold) {
//         requestAnimationFrame(animate)
//     }
//     rook(mouse.x - 50, mouse.y, true)
// }

function isMate(piecesOptions, isPlayer) {
    let result = true
    if (isCheck(isPlayer)) {
        piecesOptions.forEach(p => {
            options(p.x, p.y, isPlayer).forEach(t => {
                targetName = map[t.y][t.x]
                map[t.y][t.x] = map[p.y][p.x]
                map[p.y][p.x] = ''
                if (!isCheck(isPlayer)) {
                    result = false
                }
                map[p.y][p.x] = map[t.y][t.x]
                map[t.y][t.x] = targetName
            })
        })
    } else {
        result = false
    }
    return result
}

function isDraw(piecesOptions, isPlayer) {
    let result = true
    if (isCheck(isPlayer) || piecesOptions.length == 0) {
        result = false
    } else {
        piecesOptions.forEach(p => {
            options(p.x, p.y, isPlayer).forEach(t => {
                targetName = map[t.y][t.x]
                map[t.y][t.x] = map[p.y][p.x]
                map[p.y][p.x] = ''
                if (!isCheck(isPlayer)) {
                    result = false
                }
                map[p.y][p.x] = map[t.y][t.x]
                map[t.y][t.x] = targetName
            })
        })
    }
    return result
}

function ai() {
    var piecesOptions = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let p = map[y][x]
            if ((p != '' && p[p.length - 1] != '-') && options(x, y).length > 0) {
                piecesOptions.push({ x, y })
            }
        }
    }
    if (isMate(piecesOptions)) {
        return alert('Checkmate! You won!')
    } else if (isDraw(piecesOptions)) {
        return alert('You made a draw')
    }
    let newMap = think()
    let marks = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (map[y][x] != newMap[y][x]) {
                marks.push({ x, y })
            }
        }
    }
    map = newMap
    for (let i = 0; i < 8; i++) {
        if (map[7][i] == 'p') {
            map[7][i] = 'q'
        }
    }
    board()
    c.strokeStyle = 'rgb(0, 51, 204)'
    c.lineWidth = '4'
    c.beginPath()
    marks.forEach(mark => {
        c.rect(mark.x * 100 + 2, mark.y * 100 + 2, 96, 96)
    })
    c.stroke()

    piecesOptions = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let p = map[y][x]
            if (p[p.length - 1] == '-' && options(x, y, true).length > 0) {
                piecesOptions.push({ x, y })
            }
        }
    }
    if (isMate(piecesOptions, true)) {
        alert('You really thought you have a chance againt me?')
        alert('I am an undefeatable chess AI...')
        alert('Checkmate!')
    } else if (isDraw(piecesOptions, true)) {
        alert('I made a draw')
    }
}

function think() {
    var moves = nextMaps(map)
    var tree = {}
    moves.forEach(l1 => {
        tree[l1.m] = {}
        nextMaps(extractMap(l1.m), true).forEach(l2 => {
            tree[l1.m][l2.m] = {}
            nextMaps(extractMap(l2.m)).forEach(l3 => {
                if (!hard) {
                    tree[l1.m][l2.m][l3.m] = l3.c
                } else {
                    tree[l1.m][l2.m][l3.m] = {}
                    nextMaps(extractMap(l3.m), true).forEach(l4 => {
                    tree[l1.m][l2.m][l3.m][l4.m] = l4.c
                        // nextMaps(extractMap(l4.m)).forEach(l5 => {
                        //     tree[l1.m][l2.m][l3.m][l4.m][l5.m] = l5.c
                        // })
                    })
                }
            })
        })
    })
    let r = tree
    console.log(r);
    // Object.keys(tree).forEach(l1 => {
    //     Object.keys(tree[l1]).forEach(l2 => {
    //         Object.keys(tree[l1][l2]).forEach(l3 => {
    //             Object.keys(tree[l1][l2][l3]).forEach(l4 => {
    //                 let max = Math.max(...Object.values(tree[l1][l2][l3][l4]))
    //                 tree[l1][l2][l3][l4] = max
    //             })
    //         })
    //     })
    // })
    if (hard) {
        Object.keys(tree).forEach(l1 => {
            Object.keys(tree[l1]).forEach(l2 => {
                Object.keys(tree[l1][l2]).forEach(l3 => {
                    let min = Math.min(...Object.values(tree[l1][l2][l3]))
                    tree[l1][l2][l3] = min
                })
            })
        })
    }
    
    Object.keys(tree).forEach(l1 => {
        Object.keys(tree[l1]).forEach(l2 => {
            let max = Math.max(...Object.values(tree[l1][l2]))
            tree[l1][l2] = max
        })
    })
    Object.keys(tree).forEach(l1 => {
        let min = Math.min(...Object.values(tree[l1]))
        tree[l1] = min
    })
    let max = -100
    let results = []
    Object.keys(tree).forEach(m => {
        if (tree[m] > max) {
            max = tree[m]
            results = [m]
        } else if (tree[m] == max) {
            results.push(m)
        }
    })
    let saveMap = compileMap(map)
    results.forEach(r => {
        map = extractMap(r)
        let piecesOptions = []
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let p = map[y][x]
                if (p[p.length - 1] == '-' && options(x, y, true).length > 0) {
                    piecesOptions.push({ x, y })
                }
            }
        }
        if (isDraw(piecesOptions, true) && results.length > 1) {
            results = results.filter(result => result != r)
        } else if (isMate(piecesOptions, true)) {
            return extractMap(r)
        }
    })
    map = extractMap(saveMap)
    let result = results[Math.floor(Math.random()*results.length)]
    return extractMap(result)
}

function compileMap(m) {
    let result = ''
    m.forEach(row => {
        result += row.toString() + '/'
    })
    return result.substring(0, result.length - 1)
}
function extractMap(m) {
    let result = []
    m.split('/').forEach(row => {
        result.push(row.split(','))
    })
    return result
}

function count(m) {
    if (!m) {
        m = map
    }
    var result = 0
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let p = m[y][x]
            if (p == 'p' && y == 7) {
                result += 9
            } else if (p == 'p') {
                result += 1
            } else if (p == 'kn' || p == 'b') {
                result += 3
            } else if (p == 'r') {
                result += 5
            } else if (p == 'q') {
                result += 9
            } else if (p == 'ki') {
                result += 20
            } else if (p == 'p-' && y == 0) {
                result += 9
            } else if (p == 'p-') {
                result -= 1
            } else if (p == 'kn-' || p == 'b-') {
                result -= 3
            } else if (p == 'r-') {
                result -= 5
            } else if (p == 'q-') {
                result -= 9
            } else if (p == 'ki-') {
                result -= 20
            } 
        }
    }
    return result
}

function nextMaps(m, isPlayer) {
    saveMap = compileMap(map)
    map = m
    piecesOptions = []
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let p = m[y][x]
            if (!isPlayer && (p != '' && p[p.length - 1] != '-') && options(x, y).length > 0) {
                piecesOptions.push({ x, y })
            } else if (isPlayer && p[p.length - 1] == '-' && options(x, y, true).length > 0) {
                piecesOptions.push({ x, y })
            }
        }
    }
    let maps = []
    piecesOptions.forEach(p => {
        options(p.x, p.y, isPlayer).forEach(t => {
            targetName = m[t.y][t.x]
            m[t.y][t.x] = m[p.y][p.x]
            m[p.y][p.x] = ''
            if (!isCheck()) {
                maps.push({ m:compileMap(m), c: count(m) })
            }
            m[p.y][p.x] = m[t.y][t.x]
            m[t.y][t.x] = targetName
        })
    })
    map = extractMap(saveMap)
    return maps
}