var w1 = document.getElementById('w1');
var w2 = document.getElementById('w2');
var w3 = document.getElementById('w3');
var w4 = document.getElementById('w4');
var w5 = document.getElementById('w5');
var w6 = document.getElementById('w6');
var w7 = document.getElementById('w7');
var w8 = document.getElementById('w8');
var w9 = document.getElementById('w9');
var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3');
var b4 = document.getElementById('b4');
var b5 = document.getElementById('b5');
var b6 = document.getElementById('b6');
var b7 = document.getElementById('b7');
var b8 = document.getElementById('b8');
var b9 = document.getElementById('b9');
var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');
var r4 = document.getElementById('r4');
var r5 = document.getElementById('r5');
var r6 = document.getElementById('r6');
var r7 = document.getElementById('r7');
var r8 = document.getElementById('r8');
var r9 = document.getElementById('r9');
var aD = document.getElementById('aD');
var aL = document.getElementById('aL');
var aR = document.getElementById('aR');
var w = ['w','w','w','w','w','w','w','w','w'];
var b = ['b','b','b','b','b','b','b','b','b'];
var r = ['r','r','r','r','r','r','r','r','r'];
var y = ['y','y','y','y','y','y','y','y','y'];
var g = ['g','g','g','g','g','g','g','g','g'];
var o = ['o','o','o','o','o','o','o','o','o'];
function reset() {
    w = ['w','w','w','w','w','w','w','w','w'];
    b = ['b','b','b','b','b','b','b','b','b'];
    r = ['r','r','r','r','r','r','r','r','r'];
    y = ['y','y','y','y','y','y','y','y','y'];
    g = ['g','g','g','g','g','g','g','g','g'];
    o = ['o','o','o','o','o','o','o','o','o'];
    update();
}
const moves = [L, Lq, R, Rq, F, Fq, B, Bq, D, Dq, U, Uq, M, Mq, S, Sq, E, Eq]
function ran(min, max) {return Math.floor(Math.random() * (max - min +1)) + min}
function mix() {
    let times = 0;
    loop();
    function loop() {
        times++
        moves[ran(0, moves.length - 1)]()
        if (times < 20) {
            setTimeout(loop, 50)
        }
    }
}
arrows();
function arrows() {
    if (aD.style.display == 'none') {
        aD.style.display = 'block';
        aL.style.display = 'block';
        aR.style.display = 'block';
    } else {
        aD.style.display = 'none';
        aL.style.display = 'none';
        aR.style.display = 'none';
    }
}
function update() {
    setColor(w1, w[0])
    setColor(w2, w[1])
    setColor(w3, w[2])
    setColor(w4, w[3])
    setColor(w5, w[4])
    setColor(w6, w[5])
    setColor(w7, w[6])
    setColor(w8, w[7])
    setColor(w9, w[8])
    setColor(b1, b[0])
    setColor(b2, b[1])
    setColor(b3, b[2])
    setColor(b4, b[3])
    setColor(b5, b[4])
    setColor(b6, b[5])
    setColor(b7, b[6])
    setColor(b8, b[7])
    setColor(b9, b[8])
    setColor(r1, r[0])
    setColor(r2, r[1])
    setColor(r3, r[2])
    setColor(r4, r[3])
    setColor(r5, r[4])
    setColor(r6, r[5])
    setColor(r7, r[6])
    setColor(r8, r[7])
    setColor(r9, r[8])
}
function setColor(obj, color) {
    switch (color) {
        case 'w':
            obj.style.background = 'white';
            break;
        case 'b':
            obj.style.background = 'blue';
            break;
        case 'r':
            obj.style.background = 'red';
            break;
        case 'y':
            obj.style.background = 'yellow';
            break;
        case 'g':
            obj.style.background = 'green';
            break;
        case 'o':
            obj.style.background = 'orange';
            break;
    }
}
update();
r1.addEventListener('mouseover', hr1);
r2.addEventListener('mouseover', hr2);
r3.addEventListener('mouseover', hr3);
r4.addEventListener('mouseover', hr4);
r5.addEventListener('mouseover', hr5);
r6.addEventListener('mouseover', hr6);
r7.addEventListener('mouseover', hr7);
r8.addEventListener('mouseover', hr8);
r9.addEventListener('mouseover', hr9);
b1.addEventListener('mouseover', hb1);
b2.addEventListener('mouseover', hb2);
b3.addEventListener('mouseover', hb3);
b4.addEventListener('mouseover', hb4);
b5.addEventListener('mouseover', hb5);
b6.addEventListener('mouseover', hb6);
b7.addEventListener('mouseover', hb7);
b8.addEventListener('mouseover', hb8);
b9.addEventListener('mouseover', hb9);
r1.addEventListener('mouseout', out);
r2.addEventListener('mouseout', out);
r3.addEventListener('mouseout', out);
r4.addEventListener('mouseout', out);
r5.addEventListener('mouseout', out);
r6.addEventListener('mouseout', out);
r7.addEventListener('mouseout', out);
r8.addEventListener('mouseout', out);
r9.addEventListener('mouseout', out);
b1.addEventListener('mouseout', out);
b2.addEventListener('mouseout', out);
b3.addEventListener('mouseout', out);
b4.addEventListener('mouseout', out);
b5.addEventListener('mouseout', out);
b6.addEventListener('mouseout', out);
b7.addEventListener('mouseout', out);
b8.addEventListener('mouseout', out);
b9.addEventListener('mouseout', out);
window.addEventListener('keydown', keyboard);
window.addEventListener('dblclick', dblclick);
var hover = null;
function out() {hover = null;}
function hr1() {hover = 'r1';}
function hr2() {hover = 'r2';}
function hr3() {hover = 'r3';}
function hr4() {hover = 'r4';}
function hr5() {hover = 'r5';}
function hr6() {hover = 'r6';}
function hr7() {hover = 'r7';}
function hr8() {hover = 'r8';}
function hr9() {hover = 'r9';}
function hb1() {hover = 'b1';}
function hb2() {hover = 'b2';}
function hb3() {hover = 'b3';}
function hb4() {hover = 'b4';}
function hb5() {hover = 'b5';}
function hb6() {hover = 'b6';}
function hb7() {hover = 'b7';}
function hb8() {hover = 'b8';}
function hb9() {hover = 'b9';}
function dblclick() {
    switch (hover) {
        case 'r1':
        case 'r2':
        case 'r3':
        case 'r4':
        case 'r5':
        case 'r6':
        case 'r7':
        case 'r8':
        case 'r9':
            D();
            E();
            Uq();
            break;
        case 'b1':
        case 'b2':
        case 'b3':
        case 'b4':
        case 'b5':
        case 'b6':
        case 'b7':
        case 'b8':
        case 'b9':
            Dq();
            Eq();
            U();
            break;
    }
}
function keyboard(key) {
    switch (key.keyCode) {
        case 37:
            switch (hover) {
                case 'r3':
                case 'r6':
                case 'r9':
                case 'b1':
                case 'b2':
                case 'b3':
                    Dq();
                    break;
                case 'r2':
                case 'r5':
                case 'r8':
                case 'b4':
                case 'b5':
                case 'b6':
                    Eq();
                    break;
                case 'r1':
                case 'r4':
                case 'r7':
                case 'b7':
                case 'b8':
                case 'b9':
                    U();
                    break;
            }
            break;
        case 38:
            switch (hover) {
                case 'r1':
                case 'r2':
                case 'r3':
                    Lq();
                    break;
                case 'r4':
                case 'r5':
                case 'r6':
                    Mq();
                    break;
                case 'r7':
                case 'r8':
                case 'r9':
                    R();
                    break;
                
                case 'b1':
                case 'b4':
                case 'b7':
                    Fq();
                    break;
                case 'b2':
                case 'b5':
                case 'b8':
                    Sq();
                    break;
                case 'b3':
                case 'b6':
                case 'b9':
                    B();
                    break;
            }
            break;
        case 39:
            switch (hover) {
                case 'r3':
                case 'r6':
                case 'r9':
                case 'b1':
                case 'b2':
                case 'b3':
                    D();
                    break;
                case 'r2':
                case 'r5':
                case 'r8':
                case 'b4':
                case 'b5':
                case 'b6':
                    E();
                    break;
                case 'r1':
                case 'r4':
                case 'r7':
                case 'b7':
                case 'b8':
                case 'b9':
                    Uq();
                    break;
            }
            break;
        case 40:
            switch (hover) {
                case 'r1':
                case 'r2':
                case 'r3':
                    L();
                    break;
                case 'r4':
                case 'r5':
                case 'r6':
                    M();
                    break;
                case 'r7':
                case 'r8':
                case 'r9':
                    Rq();
                    break;
                case 'b1':
                case 'b4':
                case 'b7':
                    F();
                    break;
                case 'b2':
                case 'b5':
                case 'b8':
                    S();
                    break;
                case 'b3':
                case 'b6':
                case 'b9':
                    Bq();
                    break;
            }
            break;
    }
}
function L() {
    let temp = [r[0],r[1],r[2]];
    r[0] = w[6];
    r[1] = w[3];
    r[2] = w[0];
    w[6] = o[2];
    w[3] = o[1];
    w[0] = o[0];
    o[2] = y[0];
    o[1] = y[3];
    o[0] = y[6];
    y[0] = temp[0];
    y[3] = temp[1];
    y[6] = temp[2];
    temp = [g[6],g[7]];
    g[6] = g[8];
    g[7] = g[5];
    g[8] = g[2];
    g[5] = g[1];
    g[2] = g[0];
    g[1] = g[3];
    g[0] = temp[0];
    g[3] = temp[1];
    update();
}
function Lq() {
    let temp = [r[0],r[1],r[2]];
    r[0] = y[0];
    r[1] = y[3];
    r[2] = y[6];
    y[0] = o[2];
    y[3] = o[1];
    y[6] = o[0];
    o[2] = w[6];
    o[1] = w[3];
    o[0] = w[0];
    w[6] = temp[0];
    w[3] = temp[1];
    w[0] = temp[2];
    temp = [g[6],g[3]];
    g[6] = g[0];
    g[3] = g[1];
    g[0] = g[2];
    g[1] = g[5];
    g[2] = g[8];
    g[5] = g[7];
    g[8] = temp[0];
    g[7] = temp[1];
    update();
}
function R() {
    let temp = [r[6],r[7],r[8]];
    r[6] = y[2];
    r[7] = y[5];
    r[8] = y[8];
    y[2] = o[8];
    y[5] = o[7];
    y[8] = o[6];
    o[8] = w[8];
    o[7] = w[5];
    o[6] = w[2];
    w[8] = temp[0];
    w[5] = temp[1];
    w[2] = temp[2];
    temp = [b[6],b[3]];
    b[6] = b[0];
    b[3] = b[1];
    b[0] = b[2];
    b[1] = b[5];
    b[2] = b[8];
    b[5] = b[7];
    b[8] = temp[0];
    b[7] = temp[1];
    update();
}
function Rq() {
    let temp = [r[6],r[7],r[8]];
    r[6] = w[8];
    r[7] = w[5];
    r[8] = w[2];
    w[8] = o[8];
    w[5] = o[7];
    w[2] = o[6];
    o[8] = y[2];
    o[7] = y[5];
    o[6] = y[8];
    y[2] = temp[0];
    y[5] = temp[1];
    y[8] = temp[2];
    temp = [b[6],b[3]];
    b[6] = b[8];
    b[3] = b[7];
    b[8] = b[2];
    b[7] = b[5];
    b[2] = b[0];
    b[5] = b[1];
    b[0] = temp[0];
    b[1] = temp[1];
    update();
}
function F() {
    let temp = [b[6],b[3],b[0]];
    b[6] = w[0];
    b[3] = w[1];
    b[0] = w[2];
    w[0] = g[0];
    w[1] = g[3];
    w[2] = g[6];
    g[0] = y[2];
    g[3] = y[1];
    g[6] = y[0];
    y[2] = temp[0];
    y[1] = temp[1];
    y[0] = temp[2];
    temp = [r[6],r[7]];
    r[6] = r[0];
    r[7] = r[3];
    r[0] = r[2];
    r[3] = r[1];
    r[2] = r[8];
    r[1] = r[5];
    r[8] = temp[0];
    r[5] = temp[1];
    update();
}
function Fq() {
    let temp = [b[6],b[3],b[0]];
    b[6] = y[2];
    b[3] = y[1];
    b[0] = y[0];
    y[2] = g[0];
    y[1] = g[3];
    y[0] = g[6];
    g[0] = w[0];
    g[3] = w[1];
    g[6] = w[2];
    w[0] = temp[0];
    w[1] = temp[1];
    w[2] = temp[2];
    temp = [r[6],r[7]];
    r[6] = r[8];
    r[7] = r[5];
    r[8] = r[2];
    r[5] = r[1];
    r[2] = r[0];
    r[1] = r[3];
    r[0] = temp[0];
    r[3] = temp[1];
    update();
}
function B() {
    let temp = [b[8],b[5],b[2]];
    b[8] = y[8];
    b[5] = y[7];
    b[2] = y[6];
    y[8] = g[2];
    y[7] = g[5];
    y[6] = g[8];
    g[2] = w[6];
    g[5] = w[7];
    g[8] = w[8];
    w[6] = temp[0];
    w[7] = temp[1];
    w[8] = temp[2];
    temp = [o[6],o[7]];
    o[6] = o[8];
    o[7] = o[5];
    o[8] = o[2];
    o[5] = o[1];
    o[2] = o[0];
    o[1] = o[3];
    o[0] = temp[0];
    o[3] = temp[1];
    update();
}
function Bq() {
    let temp = [b[8],b[5],b[2]];
    b[8] = w[6];
    b[5] = w[7];
    b[2] = w[8];
    w[6] = g[2];
    w[7] = g[5];
    w[8] = g[8];
    g[2] = y[8];
    g[5] = y[7];
    g[8] = y[6];
    y[8] = temp[0];
    y[7] = temp[1];
    y[6] = temp[2];
    temp = [o[6],o[7]];
    o[6] = o[0];
    o[7] = o[3];
    o[0] = o[2];
    o[3] = o[1];
    o[2] = o[8];
    o[1] = o[5];
    o[8] = temp[0];
    o[5] = temp[1];
    update();
}
function D() {
    let temp = [r[2],r[5],r[8]];
    r[2] = g[2];
    r[5] = g[1];
    r[8] = g[0];
    g[2] = o[8];
    g[1] = o[5];
    g[0] = o[2];
    o[8] = b[0];
    o[5] = b[1];
    o[2] = b[2];
    b[0] = temp[0];
    b[1] = temp[1];
    b[2] = temp[2];
    temp = [y[6],y[3]];
    y[6] = y[8];
    y[3] = y[7];
    y[8] = y[2];
    y[7] = y[5];
    y[2] = y[0];
    y[5] = y[1];
    y[0] = temp[0];
    y[1] = temp[1];
    update();
}
function Dq() {
    let temp = [r[2],r[5],r[8]];
    r[2] = b[0];
    r[5] = b[1];
    r[8] = b[2];
    b[0] = o[8];
    b[1] = o[5];
    b[2] = o[2];
    o[8] = g[2];
    o[5] = g[1];
    o[2] = g[0];
    g[2] = temp[0];
    g[1] = temp[1];
    g[0] = temp[2];
    temp = [y[6],y[3]];
    y[6] = y[0];
    y[3] = y[1];
    y[0] = y[2];
    y[1] = y[5];
    y[2] = y[8];
    y[5] = y[7];
    y[8] = temp[0];
    y[7] = temp[1];
    update();
}
function U() {
    let temp = [r[0],r[3],r[6]];
    r[0] = b[6];
    r[3] = b[7];
    r[6] = b[8];
    b[6] = o[6];
    b[7] = o[3];
    b[8] = o[0];
    o[6] = g[8];
    o[3] = g[7];
    o[0] = g[6];
    g[8] = temp[0];
    g[7] = temp[1];
    g[6] = temp[2];
    temp = [w[6],w[3]];
    w[6] = w[0];
    w[3] = w[1];
    w[0] = w[2];
    w[1] = w[5];
    w[2] = w[8];
    w[5] = w[7];
    w[8] = temp[0];
    w[7] = temp[1];
    update();
}
function Uq() {
    let temp = [r[0],r[3],r[6]];
    r[0] = g[8];
    r[3] = g[7];
    r[6] = g[6];
    g[8] = o[6];
    g[7] = o[3];
    g[6] = o[0];
    o[6] = b[6];
    o[3] = b[7];
    o[0] = b[8];
    b[6] = temp[0];
    b[7] = temp[1];
    b[8] = temp[2];
    temp = [w[6],w[3]];
    w[6] = w[8];
    w[3] = w[7];
    w[8] = w[2];
    w[7] = w[5];
    w[2] = w[0];
    w[5] = w[1];
    w[0] = temp[0];
    w[1] = temp[1];
    update();
}






function M() {
    let temp = [r[3],r[4],r[5]];
    r[3] = w[7];
    r[4] = w[4];
    r[5] = w[1];
    w[7] = o[5];
    w[4] = o[4];
    w[1] = o[3];
    o[5] = y[1];
    o[4] = y[4];
    o[3] = y[7];
    y[1] = temp[0];
    y[4] = temp[1];
    y[7] = temp[2];
    update();
}
function Mq() {
    let temp = [r[3],r[4],r[5]];
    r[3] = y[1];
    r[4] = y[4];
    r[5] = y[7];
    y[1] = o[5];
    y[4] = o[4];
    y[7] = o[3];
    o[5] = w[7];
    o[4] = w[4];
    o[3] = w[1];
    w[7] = temp[0];
    w[4] = temp[1];
    w[1] = temp[2];
    update();
}
function S() {
    let temp = [b[7],b[4],b[1]];
    b[7] = w[3];
    b[4] = w[4];
    b[1] = w[5];
    w[3] = g[1];
    w[4] = g[4];
    w[5] = g[7];
    g[1] = y[5];
    g[4] = y[4];
    g[7] = y[3];
    y[5] = temp[0];
    y[4] = temp[1];
    y[3] = temp[2];
    update();
}
function Sq() {
    let temp = [b[7],b[4],b[1]];
    b[7] = y[5];
    b[4] = y[4];
    b[1] = y[3];
    y[5] = g[1];
    y[4] = g[4];
    y[3] = g[7];
    g[1] = w[3];
    g[4] = w[4];
    g[7] = w[5];
    w[3] = temp[0];
    w[4] = temp[1];
    w[5] = temp[2];
    update();
}
function E() {
    let temp = [r[1],r[4],r[7]];
    r[1] = g[5];
    r[4] = g[4];
    r[7] = g[3];
    g[5] = o[7];
    g[4] = o[4];
    g[3] = o[1];
    o[7] = b[3];
    o[4] = b[4];
    o[1] = b[5];
    b[3] = temp[0];
    b[4] = temp[1];
    b[5] = temp[2];
    update();
}
function Eq() {
    let temp = [r[1],r[4],r[7]];
    r[1] = b[3];
    r[4] = b[4];
    r[7] = b[5];
    b[3] = o[7];
    b[4] = o[4];
    b[5] = o[1];
    o[7] = g[5];
    o[4] = g[4];
    o[1] = g[3];
    g[5] = temp[0];
    g[4] = temp[1];
    g[3] = temp[2];
    update();
}