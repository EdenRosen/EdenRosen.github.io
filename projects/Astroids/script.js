const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const play = document.getElementById('play')

canvas.width = 1000;
canvas.height = 800;

var x
var y
var dx
var dy
var dir
var right
var left
var trust
var run
var power
var bullet

reset()
function reset() {
    x = canvas.width / 2
    y = canvas.height / 2
    dx = 0
    dy = 0
    dir = 0
    right = false
    left = false
    thrust = false
    run = false
    power = 4
    bullet = 5
    c.clearRect(0, 0, canvas.width, canvas.height)
}

function player() {
    c.fillStyle = 'white'
    c.beginPath()
    c.translate(x, y);
    c.rotate((Math.PI / 180) * dir)
    c.moveTo(-12, -15)
    c.lineTo(-5, 0)
    c.lineTo(-12, 15)
    c.lineTo(28, 0)
    c.save();
    // c.closePath()
    c.fill()
    c.rotate((Math.PI / 180) * -dir)
    c.translate(-x, -y);
    
}
let sx = x
let sy = y
function shoot() {
    console.log('1')
    
    
    c.beginPath();
    c.arc(sx, sy, 10, 0, 2 * Math.PI);
    c.fillStyle = 'white'
    c.fill();
    
    sx += 3
    sy += 3
    
    if (sx < canvas.width && sx > 0 && sy < canvas.height && sy > 0) {
        requestAnimationFrame(shoot)
        
    }
}

play.addEventListener('click', () => {
    if (run) {
        reset()
    } else {
        run = true
        animate()
    }
})


document.addEventListener('keydown', function(event) {
    if (event.key == "ArrowLeft") {
        left = true
    } else if (event.key == "ArrowRight") {
        right = true
    } else if (event.key == "ArrowUp") {
        thrust = true
    } else if (event.key == " ") {
        sx = x
        sy = y
        shoot()
    }
    
})

document.addEventListener("keyup", function(event) {
    if (event.key == "ArrowLeft") {
        left = false
    } else if (event.key == "ArrowRight") {
        right = false
    } else if (event.key == "ArrowUp") {
        thrust = false
    }
})

function animate() {
    if (run) {
        requestAnimationFrame(animate)
    }
    c.clearRect(0, 0, canvas.width, canvas.height)
    player()

    if (right) {
        dir += 3
    } else if (left) {
        dir -= 3
    }
    let degrees = -dir % 360
    let slope = Math.tan((Math.PI / 180) * degrees)
    let Tdx = Math.sqrt(Math.pow(power, 2) / (Math.pow(slope, 2) + 1))
    if (thrust && Math.sqrt(dx*dx + dy*dy) < 7) {
        if (degrees > 90 && degrees < 270 || degrees < -90 && degrees > -270) {
            dx -= Tdx / 20
            dy -= slope * Tdx / 20
        } else if (thrust) {
            dx += Tdx / 20
            dy += slope * Tdx / 20
        }
    } else {
        dx /= 1.015
        dy /= 1.015
    }

    x += dx
    y -= dy
    if (x >= canvas.width) {
        x = 1
    } else if (x <= 0) {
        x = canvas.width - 1
    }
    if (y >= canvas.height) {
        y = 1
    } else if (y <= 0) {
        y = canvas.height - 1
    }
}