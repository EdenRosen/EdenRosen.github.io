var pnn
var nn = []
var con = []

const fix = (i) => Math.floor(i*100)/100
const s = (i) => fix(1/(1+Math.pow(Math.E, -i)))

class Player {
    constructor(c,r,i) {
        this.y = ch/2
        this.x = 200
        this.run = true
        this.dy = 0
        this.nn = nn
        this.c = []
        this.i = i
        this.set(c,r,false)
    }

    set(c,r,o) {
        var a = JSON.parse(JSON.stringify(c))
        for (let i in a) {
            Object.entries(a[i]).forEach(
                ([key, value]) => {
                    var ran = Math.random()
                    if (o) {
                        ran = 0.5
                    }
                    let val = value + ran*r-r/2
                    if (val > 1) {
                        val = 1
                    } else if (val < -1) {
                        val = -1
                    }
                    a[i][key] = val
                }
            )
        }
        this.c = a
    }

    print() {
        shape('r',this.x,ch-this.y,50,50,'red')
    }

    move() {
        this.dy -= 0.8
        this.y += this.dy
        if (this.y <= 0) {
            this.dy = 0
            this.y = 0
        }
        var dis = this.x-x
        if (this.y < 25 | this.y > ch-25 | (Math.abs(dis) < 25+w/2 & (this.y < h+25 | this.y > h+wh-25))) {
            this.run = false
        }
        const r = exe(this)
        if (r > 0.7) {
            this.dy = 15
        }

        function exe(that) {
            let speed = that.dy
            if (speed < -15) {
                speed = -15
            }
            let bottom = (that.y-h)/ch*2
            if (bottom < 0) {
                bottom = 0
            } else if (bottom > 1) {
                bottom = 1
            }
            let top = (h+wh-that.y)/ch*2
            if (top < 0) {
                top = 0
            } else if (top > 1) {
                top = 1
            }
            let bluex = x
            if (bluex > cw*0.3) {
                bluex = cw*0.3
            }
            that.nn[0] = [that.y/(ch-50), bluex/cw/0.3, bottom, top]
            for (let n = 1; n < that.nn.length; n++) {
                for (let i in that.nn[n]) {
                    var sum = 0
                    var bias = 0
                    for (let m in that.nn[n-1]) {
                        sum += that.c[n-1][m+i] * that.nn[n-1][m]
                        // bias++
                    }
                    that.nn[n][i] = s(sum-bias)
                }
            }
            if (that.i == 0) {
                nn = that.nn
            }
            return that.nn[nn.length-1][0]
        }
    }
    
}


function resetAI() {
    pnn = [4,3,1]
    nn = []
    con = []

    for (let n in pnn) {
        let arr = []
        for (let i = 0; i < pnn[n]; i++) {
            arr.push(0)
        }
        nn.push(arr)
    }

    for (let n = 1; n < nn.length; n++) {
        let obj = {}
        for (let i in nn[n]) {
            for (let m in nn[n-1]) {
                obj[m+i] = 0
            }
        }
        con.push(obj)
    }

    for (let i = 0; i < 500; i++) {
        players.push(new Player(con,2,i))
    }
    players[0].print()
}

function draw(birds = 0) {
    for (let n = 1; n < pnn.length; n++) {
        for (let i in nn[n]) {
            for (let m in nn[n-1]) {
                const nec = con[n-1][m+i]
                let color = 'red'
                if (nec < 0) {
                    color = 'blue'
                }
                var w = Math.abs(nec)
                if (w == 0) {
                    w = 0.1
                }
                line([[n*70+100,i*40+50],[n*70+30,m*40+50]],color,w*3)
            }
        }
    }
    for (let n in pnn) {
        for (let i = 0; i < pnn[n]; i++) {
            let c = 255-nn[n][i]*255
            shape('e',n*70+100,i*40+50,15,15,`rgb(${c},${c},${c})`)
        }
    }
    // var points = []
    // const max = Math.max(...progress)
    // for (let n in progress) {
    //     points.push([n*140/(progress.length-1)+270,150-progress[n]/max*100])
    // }
    // line(points,'black')
    // ctx.font = '30px Ariel'
    // ctx.fillText(`Gen: ${gen}`,cw-150,50)
    // ctx.fillText(`Birds: ${birds}`,cw-150,100)
}