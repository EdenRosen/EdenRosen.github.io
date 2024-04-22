const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const table = document.getElementById('table');
const elV = document.getElementById('V');
const elH = document.getElementById('H');
const elGT = document.getElementById('GT');
const elAT = document.getElementById('AT');
const elT = document.getElementById('T');
const elG = document.getElementById('G');
const elM = document.getElementById('M');
const elF = document.getElementById('F');
const elEk = document.getElementById('Ek');
const elEp = document.getElementById('Ep');
canvas.width = 1000;
canvas.height = 800;
var x = 50;
var y = 50;
var angle = 0;
var mass = 5;
var force = 0;
var V = 0;
var H = 0;
var G = 3;
var T = 0;
var AT = 0;
var dx = 0;
var dy = 0;
var Sx = x;
var timer;
var run = false;
var grounded = true;
const Reset = document.getElementById('reset');
function click1() {
    let text = Reset.textContent;
    if (text === 'Play!'){
        run = true;
        Reset.textContent = 'Reset';
        animate();
    } else
        reset();
    
}
const Pause = document.getElementById('pause');
function click2() {
    let text = Pause.textContent;
    if (text === 'Continue'){
        run = true;
        Pause.textContent = 'Pause';
        animate();
    } else if (run && dy != disY / (15 * mass)) {
        run = false;
        Pause.textContent = 'Continue';
    }
}
reset();
function reset() {
    run = false;
    clearInterval(timer);
    c.clearRect(0, 0, canvas.width, canvas.height);
    table.style.marginLeft = canvas.getBoundingClientRect().x + 70 + 'px';
    Reset.textContent = 'Play!';
    Pause.textContent = 'Pause';
    grounded = true;
    x = 50;
    y = 50;
    angle = 0;
    mass = 5;
    force = 0;
    V = 0;
    H = 0;
    G = 3;
    T = 0;
    AT = 0;
    dx = 0;
    dy = 0;
    Sx = x;
    vars();
    background();
    player();
}
function player() {
    let width = 40;
    let height = 10;
    c.save();
    c.translate(x, canvas.height - y);
    c.rotate(-angle * Math.PI / 180);
    c.fillStyle = 'red';
    c.fillRect(-width / 2, -height / 2, width ,height)
    c.restore();
}
function background() {
    c.fillStyle = 'green';
    c.fillRect(0, 750, canvas.width , 50)
}
let mouseX;
let mouseY;
let disX;
let disY;
let direct = false;
let mouse;
function animate() {
    if (run)
        requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (direct) {
        disX = mouse.x - canvas.getBoundingClientRect().x - 10 - x;
        disY = canvas.height - (mouse.y - canvas.getBoundingClientRect().y - 10) - y;
        // disX = mouse.x - mouseX;
        // disY = -(mouse.y - mouseY);
        angle = Math.atan2(disY, disX) * 180 / Math.PI;
    } else if (!grounded) {
        angle = Math.atan2(dy, dx) * 180 / Math.PI;
    }
    H = Math.floor((y - 50) / 13) / 10;
    AT += Math.sqrt(dx * dx + dy * dy)
    y += dy;
    x += dx;
    if (y > 50) {
        dy -= 0.02 * G;
    }
    if (y < 50) {
        clearInterval(timer);
        dy = 0;
        dx = 0;
        y = 50;
        H = 0;
        V = 0
        grounded = true;
        force = 0;
    }
    vars();
    background();
    player();
}
function vars() {
    elV.innerHTML = '<h2>Velocity = '+Math.floor(V) / 10+' m/s</h2>'
    elH.innerHTML = '<h2>Hight = '+H+' m</h2>'
    elGT.innerHTML = '<h2>Ground Travel = '+Math.floor((Math.abs(x - Sx)) / 13) / 10+' m</h2>'
    elAT.innerHTML = '<h2>Air Travel = '+Math.floor(AT / 13) / 10+' m</h2>'
    elT.innerHTML = '<h2>Time = '+T/10+' s</h2>'
    elG.innerHTML = '<h2>Gravity = '+G+' m/s^2</h2>'
    elM.innerHTML = '<h2>Mass = '+mass+' kg</h2>'
    elF.innerHTML = '<h2>Force = '+force+' N</h2>'
    elEk.innerHTML = '<h2>Ek = '+Math.round(0.5*mass*(Math.pow(Math.floor(V) / 10, 2)))+' J</h2>'
    elEp.innerHTML = '<h2>Ep = '+H*10*G*mass/10+' J</h2>'
}
window.addEventListener('mousemove', function (e) {mouse = e});
window.addEventListener('mousedown', function (e) {
    if (run && grounded) {
        mouseX = e.x;
        mouseY = e.y;
        direct = true;
    }
});
window.addEventListener('mouseup', function (e) {
    if (direct) {
        direct = false
        grounded = false;
        force = Math.floor(Math.sqrt(disX * disX + disY * disY))
        dx = disX / (15 * mass);
        dy = disY / (15 * mass);
        Sx = x;
        AT = 0;
        T = 0;
        let tempAT = 0;
        timer = setInterval(function() {
            T += 1;
            V = (AT - tempAT);
            tempAT = AT;
            console.log(0.5*mass*(Math.pow(Math.floor(V) / 10, 2))+H*10*G*mass/10, 'dd')
        }, 100)
    }
});
window.addEventListener("resize", () => {
    table.style.marginLeft = canvas.getBoundingClientRect().x + 70 + 'px'

});