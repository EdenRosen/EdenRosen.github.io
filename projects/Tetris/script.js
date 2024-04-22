const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 1000
const ch = cw/10*8

canvas.width = cw;
canvas.height = ch;

const sw = 10 // screen width in blocks
const sh = 20 // screen height in blocks
const colors = [
    ['rgb(220,220,0)','rgb(255,255,0)'],
    ['rgb(0,220,220)','rgb(0,255,255)'],
    ['rgb(0,0,220)','rgb(0,0,255)'],
    ['rgb(220,140,0)','rgb(255,165,0)'],
    ['rgb(0,220,0)','rgb(0,255,0)'],
    ['rgb(130,0,130)','rgb(160,0,160)'],
    ['rgb(220,0,0)','rgb(255,0,0)'],
]
const types = [
    { m:[{x:0,y:0},{x:0,y:1},{x:1,y:0},{x:1,y:1}], p:2 },
    { m:[{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1}], p:4 },
    { m:[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}], p:3 },
    { m:[{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:2,y:0}], p:3 },
    { m:[{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:1,y:0}], p:3 },
    { m:[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:2,y:1}], p:3 },
]
const speeds = [
    {l:1,s:60},
    {l:2,s:50},
    {l:3,s:40},
    {l:4,s:35},
    {l:5,s:30},
    {l:6,s:25},
    {l:7,s:21},
    {l:8,s:17},
    {l:9,s:14},
    {l:10,s:11},
    {l:11,s:9},
    {l:12,s:8},
    {l:13,s:7},
    {l:16,s:6},
    {l:19,s:5},
    {l:30,s:4},
]
const scores = [40,100,300,1200]
const xspeed = 3


var run
var blocks
var player
var down
var key
var map
var waitlist
var score
var level
var lines
var speed
var xlag


$(document).keydown(function(e) {
    if (key != e.key & (e.key == 'ArrowRight' | e.key == 'ArrowLeft')) {
        xlag = 100
    }
    key = e.key
})

$(document).keyup(function(e) {
    key = null
    xlag = 0
})




function play() {
    if (!run) {
        run = true
        animate()
    }
}

function reset() {
    run = false
    blocks = []
    player = {x:0,y:-5,i:0,r:0}
    down = 1
    key = null
    waitlist = []
    for (let i = 0; i < 3; i++) {
        waitlist.push(Math.floor(Math.random()*types.length))
    }
    score = 0
    level = 1
    lines = 0
    speed = 60
    xlag = 0
    background()
}

function check() {
    let newlines = -lines
    for (let y = 0; y < sh; y++) {
        if (blocks.filter(p => p.y == y).length == sw) {
            blocks = blocks.filter(p => p.y != y)
            blocks.forEach((p,i) => {
                if (p.y < y) {
                    blocks[i].y++
                }
            })
            lines++
        }
    }
    newlines += lines
    level = 1+Math.floor(lines/10)
    for (let i in speeds) {
        if (level == speeds[i].l) {
            speed = speeds[i].s
        }
    }
    if (newlines > 0) {
        score += scores[newlines-1]*level
    }
}

function rotate() {
    const type = types[player.i]
    var nmap = []
    if (type.p == 2) {
        return
    } else if (type.p == 3) {
        nmap.push({x:1,y:1})
        if (taken(0,0)) {
            nmap.push({x:2,y:0})
        } if (taken(2,0)) {
            nmap.push({x:2,y:2})
        } if (taken(2,2)) {
            nmap.push({x:0,y:2})
        } if (taken(0,2)) {
            nmap.push({x:0,y:0})
        }
        if (taken(1,0)) {
            nmap.push({x:2,y:1})
        } if (taken(2,1)) {
            nmap.push({x:1,y:2})
        } if (taken(1,2)) {
            nmap.push({x:0,y:1})
        } if (taken(0,1)) {
            nmap.push({x:1,y:0})
        }
    } else if (type.p == 4) {
        if (taken(0,1)) {
            nmap = [{x:2,y:0},{x:2,y:1},{x:2,y:2},{x:2,y:3}]
        } if (taken(2,0)) {
            nmap = [{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2}]
        } if (taken(3,2)) {
            nmap = [{x:1,y:0},{x:1,y:1},{x:1,y:2},{x:1,y:3}]
        } if (taken(1,3)) {
            nmap = [{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1}]
        }
    }
    map = nmap

    function taken(x, y) {
        if (map.find(p => p.x == x & p.y == y)) {
            return true
        }
        return false
    }
}

function background() {
    const s = cw/10000*7
    const shp = ch/100*95 // screen height in pixels
    const swp = (shp-s)*sw/sh+s // screen width in pixels
    shape('r',cw/2,ch/2,swp,shp,'gray')
    const bs = (swp-s)/sw-s // block size
    const type = types[player.i]
    map = type.m
    for (let i = 0; i < player.r; i++) {
        rotate()
    }

    for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
            const bx = cw/2 - swp/2 + bs/2 + s + x*(bs+s)
            const by = ch/2 - shp/2 + bs/2 + s + y*(bs+s)
            const block = blocks.find(p => p.x == x & p.y == y)
            if (map.find(p => p.x+player.x == x & p.y+player.y == y)) {
                shape('r',bx,by,bs,bs,colors[player.i][0])
                shape('r',bx,by,bs/10*8,bs/10*8,colors[player.i][1])
            } else if (block) {
                shape('r',bx,by,bs,bs,colors[block.i][0])
                shape('r',bx,by,bs/10*8,bs/10*8,colors[block.i][1])
            } else {
                shape('r',bx,by,bs,bs,'black')
            }
        }
    }

    const next = {
        x: cw/100*84,
        y: cw/100*24,
        w: cw/100*18,
        h: cw/100*36
    }
    const data = {
        x: cw/100*16,
        y: cw/100*24,
        w: cw/100*18,
        h: cw/100*36
    }
    shape('r',next.x,next.y,next.w,next.h,'black')
    shape('r',data.x,data.y,data.w,data.h,'black')
    for (let i in waitlist) {
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 4; x++) {
                let offset = {x:-2,y:0}
                if (types[waitlist[i]].p == 3) {
                    offset = {x:-1.5,y:0.5}
                } else if (types[waitlist[i]].p == 2) {
                    offset = {x:-1,y:0.5}
                }
                const bx = next.x + bs/2 + s + (x+offset.x)*(bs+s)
                const by = next.y - next.h/2 + bs/2 + s + (y+i*3+offset.y+0.2)*(bs+s)
                
                if (types[waitlist[i]].m.find(p => p.x == x & p.y == y)) {
                    shape('r',bx,by,bs,bs,colors[waitlist[i]][0])
                    shape('r',bx,by,bs/10*8,bs/10*8,colors[waitlist[i]][1])
                }
            }
        }
    }

    let offset = {x:20,y:50}
    ctx.font = '30px Ariel'
    ctx.fillStyle = 'white'
    ctx.fillText(`SCORE:`,data.x-data.w/2+offset.x,data.y-data.h/2+offset.y)
    ctx.fillText(`${score}`,data.x-data.w/2+offset.x,data.y-data.h/2+offset.y+40)
    ctx.fillText(`LEVEL: ${level}`,data.x-data.w/2+offset.x,data.y-data.h/2+offset.y+100)
    ctx.fillText(`LINES: ${lines}`,data.x-data.w/2+offset.x,data.y-data.h/2+offset.y+160)
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