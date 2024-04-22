const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 2000 // canvas width
canvas.width = cw;
canvas.height = cw/2;


const rad = Math.PI/180
const rspeed = 1
const per = 170
const cz = 100*per/100 // cube size
const pz = {w:0.3,h:1.8} // player size
const Sspeed = 9
const Cspeed = 15

var running = false
var mouse = { x: 0, y: 0 }
var camera = { x: 0, y: cz*2, z: 0, yr: 0, xr: 0}
var keys = []
var creative = false
var yspeed = 0
var collition = {
    top: false,
    bottom: false,
    front: false,
    back: false,
    right: false,
    left: false
}
var speed = Sspeed

const dis = (p1, p2) => Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.z-p2.z)*(p1.z-p2.z))
const angle = (p1, p2) => Math.atan2(p1.z-p2.z, p1.x-p2.x)/-rad
const fix = (num) => Math.floor(num*1000)/1000
const pers = (num, z) => num/Math.abs(z)/per*100*1000

class Face {
    constructor(...v) {
        this.v = v.slice(0, v.length-1)
        this.color = v[v.length-1]
    }
    print(degx,degy) {
        let v = this.v
        let cam = {x:camera.x+cz/2,y:camera.y+cz*(0.5+pz.h)-20,z:camera.z+cz/2}
        v = v.map(p => {
            let old = -angle(p, cam)*rad
            let a = dis(p, cam)
            let x = a*fix(Math.cos((old-degy*rad)))
            let z = a*fix(Math.sin((old-degy*rad)))
            
            p = {x:p.y-cam.y,y:x,z}

            old = -angle(p, {x:0,z:0})*rad
            a = dis(p, {x:0,z:0})
            
            x = a*fix(Math.cos((old-degx*rad)))
            z = a*fix(Math.sin((old-degx*rad)))
            
            p = {x:p.y,y:x,z}
            
            if (p.z <= 0) {
                return []
            }
            return [pers(p.x,p.z) + cw/2,-pers(p.y,p.z) + cw/4]
        })

        // line(v, this.color, 1, this.color)
        line(v, 'black', 1, false)
    }
}

var faces = []

update()
function update() {
    faces = []
    cubes.forEach(c => {
        cube(...Object.values(c))
    })
}

function cube(x,y,z,color) {
    if (!cubes.find(c => c.x == x & c.y == y & c.z == z-1)) {
        faces.push(
            new Face(
                {x:x*cz+0,y:y*cz+0,z:z*cz+0},
                {x:x*cz+0,y:y*cz+cz,z:z*cz+0},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+0},
                {x:x*cz+cz,y:y*cz+0,z:z*cz+0},
                color
            )
        )
    }
    if (!cubes.find(c => c.x == x & c.y == y & c.z == z+1)) {
        faces.push(
            new Face(
                {x:x*cz+0,y:y*cz+0,z:z*cz+cz},
                {x:x*cz+0,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+0,z:z*cz+cz},
                color
            )
        )
    }
    if (!cubes.find(c => c.x == x & c.y == y-1 & c.z == z)) {
        faces.push(
            new Face(
                {x:x*cz+0,y:y*cz+0,z:z*cz+0},
                {x:x*cz+0,y:y*cz+0,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+0,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+0,z:z*cz+0},
                color
            )
        )
    }
    if (!cubes.find(c => c.x == x & c.y == y+1 & c.z == z)) {
        faces.push(
            new Face(
                {x:x*cz+0,y:y*cz+cz,z:z*cz+0},
                {x:x*cz+0,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+0},
                color
            )
        )
    }
    if (!cubes.find(c => c.x == x-1 & c.y == y & c.z == z)) {
        faces.push(
            new Face(
                {x:x*cz+0,y:y*cz+0,z:z*cz+0},
                {x:x*cz+0,y:y*cz+0,z:z*cz+cz},
                {x:x*cz+0,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+0,y:y*cz+cz,z:z*cz+0},
                color
            )
        )
    }
    if (!cubes.find(c => c.x == x+1 & c.y == y & c.z == z)) {
        faces.push(
            new Face(
                {x:x*cz+cz,y:y*cz+0,z:z*cz+0},
                {x:x*cz+cz,y:y*cz+0,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+cz},
                {x:x*cz+cz,y:y*cz+cz,z:z*cz+0},
                color
            )
        )
    }
}

faces.forEach(f => f.print(0,0))

$('canvas').click(function() {
    if (running) {
        running = false
        $('*').css('cursor','pointer')
    } else {
        $('*').css('cursor','none')
        running = true
        animate()
    }
})

$(document).keydown(function(e) {
    let key = lower(e.key)
    if (!keys.includes(key)) {
        keys.push(key)
    }
    if (key == 'c') {
        if (creative) {
            creative = false
        } else {
            creative = true
            yspeed = 0
        }
    }
    e.preventDefault()
})

$(document).keyup(function(e) {
    let key = lower(e.key)
    if (keys.includes(key)) {
        keys.splice(keys.indexOf(key), 1)
    }
})

function lower(key) {
    if (key.length == 1) {
        return key = key.toLowerCase()
    }
    return key
}

$(canvas).bind('mousemove', function(e) {
    mouse.x = e.pageX - canvas.offsetLeft
    mouse.y = e.pageY - canvas.offsetTop
})

function shape(type, x, y, w, h, color, deg = 0) {
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