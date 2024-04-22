const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 1000
const ch = 600

canvas.width = cw;
canvas.height = ch;

// const rad = Math.PI/180
const es = 30 // enemy size
const waypoints = [[-5,90],[30,80],[20,20],[80,30],[55,75],[75,90],[105,60]]
const prices = [[170,370,920,1640,2200,4600,13400,34000,135000,485000,1000000]]
const speeds = [3,4,5,8,15,13,11,16,2,1.5,1,0.7]
const lifes = [1,1,1,1,1,1,1,1,100,400,1000,4000]
const sizes = [10,10,10,10,10,8,9,10,20,25,30,35]
const colors = ['red','blue','green','yellow','pink','black','white','purple','lightblue','red','green','purple']
const images = [['img/t1.png','img/t2.png','img/t3.png','img/t4.png',],['img/dart1.png','img/dart2.png']]
const rounds = [
    // -----
    [[1,5,50],[0,1,200],[1,15,45],[0,1,300]], // 1
    [[1,20,30],[0,1,100],[1,15,15],[0,1,300]],
    [[1,25,20],[0,1,100],[2,5,50],[0,1,300]],
    [[1,35,10],[0,1,100],[2,18,20],[0,1,300]],
    [[1,5,30],[0,1,100],[2,27,10],[0,1,300]],
    [[1,15,30],[0,1,100],[2,15,20],[0,1,100],[3,4,50],[0,1,300]],
    [[1,20,20],[0,1,100],[2,20,20],[0,1,100],[3,5,40],[0,1,300]],
    [[1,10,10],[0,1,10],[2,20,15],[0,1,100],[3,14,30],[0,1,300]],
    [[3,10,50],[0,1,10],[3,5,15],[0,1,10],[3,15,5],[0,1,300]],
    [[2,62,10],[0,1,100],[2,40,7],[0,1,300]], // 10
    [[1,6,20],[0,1,10],[2,12,20],[0,1,10],[3,12,40],[0,1,100],[4,3,40],[0,1,300]],
    [[2,15,10],[0,1,10],[3,10,15],[0,1,10],[4,5,40],[0,1,300]],
    [[2,50,5],[0,1,10],[3,23,20],[0,1,300]],
    [[1,49,10],[0,1,10],[2,15,15],[0,1,10],[3,10,20],[0,1,100],[4,9,20],[0,1,300]],
    [[1,49,10],[0,1,10],[2,15,15],[0,1,10],[3,10,20],[0,1,100],[4,9,20],[0,1,100],[5,5,40],[0,1,300]],
    [[3,40,5],[0,1,10],[4,8,20],[0,1,300]],
    [[4,15,7],[0,1,10],[4,17,10],[0,1,300]],
    [[3,30,7],[0,1,10],[3,50,15],[0,1,300]],
    [[3,10,10],[0,1,100],[4,25,20],[0,1,100],[5,15,15],[0,1,300]],
    [[6,6,60],[0,1,300]], // 20
    [[4,40,10],[0,1,10],[5,14,25],[0,1,300]],
    [[7,5,30],[0,1,200],[7,11,15],[0,1,300]],
    [[6,7,30],[0,1,100],[7,7,30],[0,1,300]],
    [[2,20,15],[0,1,10],[7,10,20],[0,1,300]],
    [[4,25,15],[0,1,10],[8,10,40],[0,1,300]],
    [[4,25,15],[0,1,10],[8,10,40],[0,1,300]],
    [[1,100,25],[0,1,10],[2,60,20],[0,1,10],[3,45,20],[0,1,10],[4,45,20],[0,1,300]],
    [[7,25,15],[0,1,10],[8,30,20],[0,1,300]],
    [[4,50,15],[0,1,10],[7,15,20],[0,1,300]],
    [[7,15,15],[0,1,10],[8,40,20],[0,1,300]], // 30
    [[6,8,15],[0,1,10],[7,8,20],[0,1,10],[8,10,20],[0,1,300]],
    [[6,15,15],[0,1,10],[7,20,20],[0,1,10],[8,10,20],[0,1,300]],
    [[1,20,10],[0,1,10],[4,15,10],[0,1,300]],
    [[4,100,10],[0,1,10],[8,20,15],[0,1,300]],
    [[5,35,15],[0,1,10],[6,30,20],[0,1,10],[7,25,20],[0,1,10],[8,50,20],[0,1,300]],
    [[5,140,5],[0,1,10],[8,20,15],[0,1,300]],
    [[6,25,20],[0,1,10],[7,25,20],[0,1,10],[8,45,20],[0,1,300]],
    [[5,42,10],[0,1,10],[7,17,15],[0,1,10],[8,160,5],[0,1,300]],
    [[6,10,20],[0,1,10],[7,10,20],[0,1,10],[8,70,10],[0,1,300]],
    [[9,1,500],[0,1,1000]], // 40
    [[6,60,5],[0,1,10],[8,60,5],[0,1,300]],
    [[7,60,5],[0,1,10],[8,80,2],[0,1,300]],
    [[7,60,5],[0,1,10],[8,300,1],[0,1,300]],
    [[9,10,300],[0,1,1000]],
]
const turretSize = 6
const trackWidth = 6

var mouse = { x: 0, y: 0, c: false }
var running = false
var enemies = []
var turrets = []
var darts = []
var freq = 10
var time = 1
var hold = false
var viewed = false
var scan = [1,1]
var end = false
var money = 250
var hearts = 100
var gspeed = 200 // percentage of global speed
var round = 1


var wayline = []

for (let i in waypoints) {
    wayline.push([
        waypoints[i][0]/100 * cw,
        ch - waypoints[i][1]/100 * ch
    ])
    waypoints[i][1] *= ch/cw
}

line(wayline,'gray',50)
ctx.font = '23px Ariel'

const dis = (x1,y1,x2,y2) => Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))

class Enemy {
    constructor(level,x = waypoints[0][0],y = waypoints[0][1]) {
        this.x = x
        this.y = y
        this.target = 1
        this.level = level
        this.life = lifes[level-1]
        this.dis = 0
    }
    
    print() {
        shape('e',this.x*cw/100,ch-this.y*cw/100,
        es/10*sizes[this.level-1],
        es/10*sizes[this.level-1],
        colors[this.level-1])
    }

    move() {
        const t = waypoints[this.target]
        const rad = Math.atan2(t[1]-this.y,t[0]-this.x)

        let speed = speeds[this.level-1]*gspeed/100
        let mx = Math.cos(rad)/20*speed
        let my = Math.sin(rad)/20*speed
        this.x += mx
        this.y += my

        this.dis = Math.sqrt(Math.pow(this.x-t[0],2) + Math.pow(this.y-t[1],2))

        const rad2 = Math.atan2(t[1]-this.y,t[0]-this.x)
        if (Math.abs(rad-rad2)>0.01) {
            this.x = t[0]
            this.y = t[1]
            this.target++
        }
        let a = darts.find(d => {
            let dis = Math.sqrt(Math.pow(this.x-d.x,2) + Math.pow(this.y-d.y,2))
            return dis < 4
        })
        if (a) {
            const dart = darts[darts.indexOf(a)]
            this.life -= dart.type+1
            if (this.life <= 0) {
                if (this.level == 9) {
                    for (let i = -20; i < 30; i++) {
                        let enemy = new Enemy(this.level-1,this.x+mx*i,this.y+my*i)
                        enemy.target = this.target
                        enemies.push(enemy)
                    }
                    
                } else if (this.level >= 10) {
                    for (let i = -2; i < 2; i++) {
                        let enemy = new Enemy(this.level-1,this.x+mx*i*10,this.y+my*i*10)
                        enemy.target = this.target
                        enemies.push(enemy)
                    }
                }
                this.level--
                this.life = lifes[this.level-1]
                if (this.level <= 8) {
                    money++
                }
            }
            darts[darts.indexOf(a)].level--
        }
    }
}

class Dart {
    constructor(type,level,life,x,y,deg) {
        this.x = x
        this.y = y
        this.deg = deg+90
        this.type = type
        this.level = level
        this.life = life
    }
    
    print() {
        var img = images[1][0]
        if (this.type >= 5) {
            img = images[1][1]
        }
        shape('img',this.x*cw/100,ch-this.y*cw/100,img.width/10*2,img.height/10*2,img,this.deg-90)
    }

    move() {
        let speed = [15,20,25,35,40,40,40,40,40,40,40,40]
        this.x += Math.cos(this.deg*Math.PI/180)/10*speed[this.level]/100*gspeed
        this.y += Math.sin(this.deg*Math.PI/180)/10*speed[this.level]/100*gspeed
        this.life--
    }
}

class Turret {
    constructor(type,level,x,y) {
        this.x = x
        this.y = y*ch/cw
        this.deg = 0
        this.type = type
        this.level = level
        this.r = 15
        this.f = 0
    }
    
    print() {
        let level = this.level-1
        if (level >= 4) {
            level = 3
        }
        const img = images[0][level]
        shape('img',this.x*cw/100,ch-this.y*cw/100,img.width/10*4,img.height/10*4,img,this.deg)
    }

    move() {
        const rs = [14,17,20]
        if (this.level >= 3) {
            this.r = rs[2]
        } else {
            this.r = rs[this.level-1]
        }
        var t = -1
        for (let i in enemies) {
            let dis = Math.sqrt(Math.pow(this.x-enemies[i].x,2) + Math.pow(this.y-enemies[i].y,2))
            if (dis < this.r) {
                if (t == -1) {
                    t = i
                } else if (enemies[i].target > enemies[t].target) {
                    t = i
                } else if (enemies[i].target == enemies[t].target & enemies[i].dis < enemies[t].dis) {
                    t = i
                }
            }
        }
        if (t != -1) {
            t = enemies[t]
            const rad = Math.atan2(t.y-this.y,t.x-this.x)
            this.deg = rad/Math.PI*180-90
            if (this.f == 0) {
                let type = 0
                let l = [4,7,30]
                let li = 0
                if (this.level >= 3) {
                    li = 2
                } else {
                    li = this.level-1
                }
                if (this.level >= 8) {
                    type = this.level-6
                }
                if (this.level >= 7) {
                    let rad = (this.deg)*Math.PI/180
                    let o = {
                        x:Math.cos(rad)/10*6,
                        y:Math.sin(rad)/10*6
                    }
                    darts.push(
                        new Dart(type,this.level,l[li],this.x+o.x,this.y+o.y,this.deg-3),
                        new Dart(type,this.level,l[li],this.x-o.x,this.y-o.y,this.deg+3),
                    )
                }
                darts.push(new Dart(type,this.level,l[li],this.x,this.y,this.deg))
                let a = [40,25,15,7,3,1,1,1,1,1,1]
                this.f = Math.round(a[this.level-1]*100/gspeed)
            } else {
                this.f--
            }
        }
    }
}

for (let n in images) {
    for (let i in images[n]) {
        let img = new Image()
        img.src = images[n][i]
        img.onload = () => {
            images[n][i] = img
        }
    }
}

function play() {
    if (running) {
        running = false
    } else if (hearts > 0) {
        running = true
        time = 0
        animate()
    }
}

function changeSpeed(btn) {
    if (gspeed == 200) {
        gspeed = 400
        $(btn).text('Slow')
    } else {
        gspeed = 200
        $(btn).text('Fast')
    }
}

function notTrack(x,y) {
    for (let i = 0; i < waypoints.length-1; i++) { // h2 not working
        let x1 = waypoints[i][0]
        let y1 = waypoints[i][1]
        let x2 = waypoints[i+1][0]
        let y2 = waypoints[i+1][1]
        let m = (y1-y2)/(x1-x2)
        let h = Math.abs(m*x-y+y1-m*x1)/Math.sqrt(m*m+1)
        let x3 = (x1+x2)/2
        let y3 = (y1+y2)/2
        m = -1/m
        let h2 = Math.abs(m*x-y+y3-m*x3)/Math.sqrt(m*m+1)
        if (h < trackWidth & h2 < (dis(x1,y1,x2,y2)+trackWidth)/2) {
            return false
        }
    }
    return true
}

$(document).keypress(function(e) {
    if (e.key == 'p') {
        money += 100000
    }
})

$(canvas).bind('mousemove', function(e) {
    mouse.x = e.pageX - canvas.offsetLeft
    mouse.y = e.pageY - canvas.offsetTop
})

$(document).keydown(function(e) {
    if (running) {
        if (e.key == 1) {
            if (hold == 1) {
                hold = false
            } else {
                hold = 1
            }
        } else if (e.key == 'u' & viewed !== false) {
            hold = 'u'
        }
    }
})

$(document).mousedown(function(e) {
    if (e.which == 1) {
        mouse.c = 'left'
    } else if (e.which == 3) {
        mouse.c = 'right'
    }
})

$(document).mouseup(function() {
    mouse.c = false
})

$(canvas).bind("contextmenu", function(e) {
    return false;
})

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