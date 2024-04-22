var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var Score = document.getElementById('score');
canvas.width = 840;
canvas.height = 840;
var x = 400;
var y = 400;
var tempx = [x];
var tempy = [y];
var dx;
var dy;
var run = [false, true];
var score = 0;
var kn;
var speed = 5;
var templen;
var tx = []
var ty = []
var ranx;
var rany;
var ranx2;
var rany2;
var depth = 10;
var turn;
reset();
document.addEventListener("keydown", function(event) {
    if ((event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowLeft" || event.key == "ArrowRight")) {
        kn = event.key;
        if (kn == "ArrowLeft" && dx != speed) {
            turn = 'l';
        }
        else if (kn == "ArrowUp" && dy != speed) {
            turn = 'u';
        }
        else if (kn == "ArrowRight" && dx != -speed) {
            turn = 'r';
        }
        else if (kn == "ArrowDown" && dy != -speed) {
            turn = 'd';
        }
        if (run[1]) {
            run = [true, false]
            eat();
            animate();
        }
    }
    if (event.key == 'r')
        reset();
});
function animate() {
    GameOver();
    if (run[0])
        requestAnimationFrame(animate);
    if (x % 40 === 0 && y % 40 === 0) {
        if (x == ranx && y == rany)
            eat();
        if (x == ranx2 && y == rany2) {
        //     speed = 10
        //     setTimeout(() => speed = 5, 3000)
            score += 3;
            Score.textContent = "Score: " + score;
        }
        tx.push(x);
        ty.push(y);
        if (tx.length > score + 4){
            tx.shift();
            ty.shift();
        }
    }
    let len = tempx.length - (40 / speed) * (score + 3);
    if (len < 0)
        len = 0;
    c.clearRect(tempx[len], tempy[len], 40, 40);
    tempx.push(x);
    tempy.push(y);
    cir(x, y, 'blue');
    len += 2
    if (len < templen) { // Do not fix this! it prevents a bug
    } else {
        templen = len;
    }
    for (let i = 0; i < 45; i++) {
        cir(tempx[templen + i / speed], tempy[templen + i / speed], 'blue');
        
    }
    if (x % 40 === 0 && y % 40 === 0) {
        if (turn == 'l') {
            dx = -speed;
            dy = 0;
        }
        else if (turn == 'u') {
            dx = 0;
            dy = -speed;
        }
        else if (turn == 'r') {
            dx = speed;
            dy = 0;
        }
        else if (turn == 'd') {
            dx = 0;
            dy = speed;
        }
    }
    x += dx;
    y += dy;
}
function cir(x, y, color) {
    let radius;
    if (color == 'blue') {
        color = 'rgb(4, 40, 138)';
        radius = 18;
    } else if (color == 'red') {
        color = 'rgb(204, 46, 46)';
        radius = 10;
    } else if (color == 'purple') {
        color = 'rgb(129, 67, 180)';
        radius = 14;
    }
    c.fillStyle = color;
    c.strokeStyle = color;
    c.beginPath();
    c.arc(x + 20, y + 20, radius, 0, 2 * Math.PI);
    c.fill();
    c.stroke();
}
function eat() {
    if (x == ranx && y == rany) {
        score++;
        Score.textContent = "Score: " + score;
    }
    do {
        ranx = Math.floor(Math.random() * 840);
        ranx -= ranx % 40;
        rany = Math.floor(Math.random() * 840);
        rany -= rany % 40;
    } while ((function () {
        for (let i = tx.length - 1; i >= 0; i--) {
            if (tx[i] == ranx && ty[i] == rany)
                return true;
        }
        return false;
    })())
    cir(ranx, rany, 'red');
}
var eat2 = setInterval(eat2, 25000);
function eat2() {
    console.log('eat2')
    do {
        ranx2 = Math.floor(Math.random() * 840);
        ranx2 -= ranx2 % 40;
        rany2 = Math.floor(Math.random() * 840);
        rany2 -= rany2 % 40;
    } while ((function () {
        for (let i = tx.length - 1; i >= 0; i--) {
            if (tx[i] == ranx2 && ty[i] == rany2)
                return true;
        }
        return false;
    })())
    if (run[0])
        cir(ranx2, rany2, 'purple');
    setTimeout(function() {
        if ((function () {
            for (let i = tx.length - 1; i >= 0; i--) {
                if (tx[i] == ranx2 && ty[i] == rany2)
                    return false;
            }
            if (!run[0])
                return false;
            return true;
        })()) {
            c.clearRect(ranx2, rany2, 40, 40);
        }
        ranx2 = null;
        rany2 = null;
    }, 5000)
    if (!run[0])
        clearInterval(eat2);
}
function GameOver() {
    if (x < 0 || x > 800 || y < 0 || y > 800) {
        run[0] = false;
    }
    for (let i = tx.length - 2; i >= 0; i--) {
        if (x == tx[i] && Math.abs(y - ty[i]) < 39 - depth || y == ty[i] && Math.abs(x - tx[i]) < 39 - depth)
            run[0] = false;
    }
    if (x < 0)
        cir(x + speed - depth, y);
    else if (x > 800)
        cir(x - speed + depth, y);
    else if (y < 0)
        cir(x, y + speed - depth); 
    else if (y > 800)
        cir(x, y - speed + depth);
}
function reset() {
    score = 0;
    Score.textContent = "Score: " + score;
    run = [false, true];
    x = 400;
    y = 400;
    dx = 0;
    dy = 0;
    kc = null;
    templen = 0;
    tempx = [x];
    tempy = [y];
    c.clearRect(0, 0, innerWidth, innerHeight)
    cir(x, y, 'blue')
    tx = []
    ty = []
}