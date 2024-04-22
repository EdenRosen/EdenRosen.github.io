const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 1000
const ch = 800

canvas.width = cw;
canvas.height = ch;

const rad = Math.PI/180
const leftBorder = [
    {x:347,y:760},{x:175,y:759},{x:91,y:726},{x:48,y:670},
    {x:48,y:586},{x:81,y:489},{x:112,y:400},{x:109,y:308},
    {x:84,y:228},{x:73,y:126},{x:96,y:70},{x:134,y:40},
    {x:186,y:31},{x:275,y:43},{x:344,y:58},{x:420,y:60},
    {x:499,y:48},{x:611,y:35},{x:713,y:33},{x:794,y:42},
    {x:857,y:61},{x:891,y:105},{x:901,y:150},{x:886,y:189},
    {x:848,y:221},{x:778,y:236},{x:707,y:248},{x:636,y:255},
    {x:552,y:250},{x:458,y:249},{x:409,y:270},{x:405,y:292},
    {x:441,y:315},{x:503,y:316},{x:555,y:304},{x:625,y:292},
    {x:708,y:287},{x:819,y:302},{x:864,y:343},{x:886,y:397},
    {x:892,y:462},{x:878,y:538},{x:886,y:566},{x:904,y:613},
    {x:904,y:645},{x:892,y:676},{x:855,y:714},{x:804,y:734},
    {x:737,y:724},{x:684,y:696},{x:639,y:665},{x:613,y:669},
    {x:593,y:681},{x:580,y:703},{x:561,y:725},{x:519,y:741},
    {x:453,y:753},{x:337,y:760}
]
const rightBorder = [
    {x:451,y:679},{x:347,y:689},{x:279,y:692},{x:208,y:686},
    {x:155,y:676},{x:114,y:635},{x:116,y:586},{x:135,y:545},
    {x:159,y:487},{x:174,y:419},{x:180,y:342},{x:176,y:264},
    {x:164,y:235},{x:154,y:184},{x:154,y:148},{x:175,y:120},
    {x:213,y:114},{x:252,y:114},{x:353,y:120},{x:445,y:117},
    {x:544,y:104},{x:638,y:99},{x:723,y:103},{x:769,y:114},
    {x:800,y:134},{x:794,y:149},{x:784,y:159},{x:741,y:169},
    {x:696,y:176},{x:619,y:185},{x:533,y:187},{x:462,y:186},
    {x:386,y:202},{x:334,y:228},{x:320,y:286},{x:329,y:328},
    {x:358,y:350},{x:416,y:369},{x:461,y:371},{x:527,y:373},
    {x:602,y:365},{x:680,y:356},{x:753,y:374},{x:805,y:405},
    {x:809,y:448},{x:821,y:495},{x:816,y:529},{x:831,y:568},
    {x:843,y:618},{x:823,y:647},{x:783,y:667},{x:735,y:659},
    {x:690,y:634},{x:665,y:610},{x:630,y:597},{x:570,y:593},
    {x:538,y:614},{x:521,y:650},{x:508,y:677},{x:484,y:679},
    {x:451,y:679},
]
const waylines = [
    [{x:366,y:764},{x:360,y:658}],
    [{x:332,y:659},{x:336,y:763}],
    [{x:279,y:763},{x:283,y:662}],
    [{x:209,y:764},{x:211,y:657}],
    [{x:108,y:737},{x:167,y:639}],
    [{x:152,y:620},{x:42,y:667}],
    [{x:43,y:602},{x:155,y:601}],
    [{x:166,y:572},{x:58,y:539}],
    [{x:76,y:484},{x:194,y:519}],
    [{x:105,y:379},{x:228,y:377}],
    [{x:226,y:436},{x:102,y:413}],
    [{x:89,y:449},{x:207,y:487}],
    [{x:219,y:321},{x:103,y:336}],
    [{x:219,y:321},{x:103,y:3360}],
    [{x:99,y:292},{x:214,y:272}],
    [{x:204,y:227},{x:83,y:243}],
    [{x:201,y:213},{x:79,y:216}],
    [{x:196,y:191},{x:73,y:174}],
    [{x:66,y:130},{x:205,y:171}],
    [{x:213,y:156},{x:133,y:36}],
    [{x:242,y:31},{x:249,y:154}],
    [{x:351,y:138},{x:346,y:53}],
    [{x:421,y:54},{x:425,y:138}],
    [{x:549,y:128},{x:537,y:40}],
    [{x:670,y:26},{x:670,y:123}],
    [{x:727,y:120},{x:773,y:34}],
    [{x:763,y:130},{x:881,y:71}],
    [{x:766,y:132},{x:905,y:141}],
    [{x:759,y:133},{x:869,y:210}],
    [{x:755,y:136},{x:834,y:231}],
    [{x:738,y:143},{x:774,y:242}],
    [{x:683,y:149},{x:690,y:256}],//
    [{x:575,y:149},{x:569,y:253}],
    [{x:468,y:150},{x:462,y:255}],
    [{x:429,y:258},{x:310,y:162}],
    [{x:413,y:273},{x:224,y:234}],
    [{x:416,y:285},{x:238,y:315}],
    [{x:427,y:303},{x:304,y:412}],
    [{x:469,y:309},{x:443,y:439}],
    [{x:570,y:298},{x:587,y:425}],
    [{x:668,y:283},{x:680,y:423}],
    [{x:898,y:454},{x:769,y:467}],
    [{x:757,y:577},{x:868,y:716}],
    [{x:639,y:673},{x:652,y:554}],
    [{x:473,y:622},{x:593,y:694}],
    [{x:443,y:648},{x:460,y:760}],
]
const gspeed = 1
const sr = 300 // sense range pixels
const start = {x:380,y:710,d:180}
const acc = 3*gspeed
const drift = 1.5*gspeed
const driftlimit = 2.4*gspeed
const maxspeed = 2*gspeed
const minspeed = -1*gspeed
const turnspeed = 3*gspeed
const size = 16
const sensors = [0,15,45,90,135,225,270,315,-15]
const population = 200
const ai = true
const godmode = false
const range = 0.4
const edit = true



var run
var keys
var cars = []
var time
var gen



const dis = (p1, p2) => Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))



function intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
}

// var p1 = {x:6,y:6}
// var p2 = {x:0,y:0}
// var p3 = {x:0,y:2}
// var p4 = {x:6,y:4}

// if (p1.y > p2.y) {
//     let temp = p1
//     p1 = p2
//     p2 = temp
// }

// if (p3.y < p4.y) {
//     let temp = p3
//     p3 = p4
//     p4 = temp
// }

// const h = angle(p3,p4)
// var gama = angle(p1,p3)
// const beta = Math.abs(180*rad-h)+gama
// const a = dis(p1,p3)


// const f = angle(p1,p2)-gama

// const alfa = 180*rad-f-beta
// const b = a*Math.sin(beta)/Math.sin(alfa)
// console.log(gama/rad);
// const x5 = Math.cos(f+gama)*b+p1.x
// const y5 = Math.sin(f+gama)*b+p1.y


// const isInter = (intersects(
//     p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y,
// ))

// if (isInter) {
//     console.log(x5,y5);
// }

// function angle(p1,p2) {
//     var r = Math.atan2(p1.y-p2.y,p1.x-p2.x)
//     if (r < 0) {
//         r += 180*rad
//     } else if (r > 180) {
//         r -= 180*rad
//     }
//     return r
// }



$(document).keydown(function(e) {
    if (!keys.includes(e.key)) {
        keys.push(e.key)
    }
})

$(document).keyup(function(e) {
    if (keys.includes(e.key)) {
        keys.splice(keys.indexOf(e.key),1)
    }
})

if (edit) {
    var aa = []
    $(canvas).on('click', function(e) {
        let x = e.pageX - canvas.offsetLeft
        let y = e.pageY - canvas.offsetTop
        aa.push({x:x,y:y})
        console.log(JSON.stringify(aa));
        line(aa,'black')
    })
}


function play() {
    if (!run) {
        run = true
        animate()
    }
}

function reset() {
    resetAI()
    run = false
    keys = []
    time = 0
    gen = 1
    background()
    for (let i in cars) {
        cars[i].reset()
    }
    cars[0].sense()
    cars[0].print()
}


function background() {
    line(leftBorder)
    line(rightBorder)
    if (ai) {
        for (let i in waylines) {
            line(waylines[i],'green')
        }
    }
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

function line(points, color = 'black', w = 2, fillColor = false) {
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i in points) {
        if (i > 0) {
            ctx.lineTo(points[i].x, points[i].y)
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