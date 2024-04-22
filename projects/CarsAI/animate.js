class Car {
    constructor (ai = true) {
        this.x = start.x
        this.y = start.y
        this.force = {d:start.d,s:0}
        this.motion = {d:start.d,s:0}
        this.keys = {
            l: false,
            r: false,
            u: false,
            d: false,
        }
        this.run = true
        this.score = 0
        this.time = 0
        this.nn = new NN(2)
        this.ai = ai
    }

    reset() {
        this.x = start.x
        this.y = start.y
        this.run = true
        this.force.d = start.d
        this.motion.d = start.d
        this.force.s = 0
        this.motion.s = 0
        this.score = []
        this.time = 0
    }

    print() {
        var color = 'red'
        if (!this.ai) {
            color = 'blue'
        }
        shape('r',this.x,this.y,size/2,size,color,this.force.d-90)
    }

    move() {
        this.sense()
        if (this.ai) {
            this.check()
        }
        let reverse = 1
        if (this.motion.s < 0) {
            reverse = -1
        }
        var dif = Math.abs(this.force.d-this.motion.d)-60
        if (dif > 0) {
            dif = Math.pow(2,dif/5)
        } else {
            dif = 1
        }

        if (this.motion.s != 0) {
            if (this.keys.r & !this.keys.l) {
                this.force.d -= turnspeed*reverse/dif
            } else if (!this.keys.r & this.keys.l) {
                this.force.d += turnspeed*reverse/dif
            }
        }
        
    
        if (this.keys.u & !this.keys.d) {
            this.force.s = maxspeed
        } else if (!this.keys.u & this.keys.d) {
            this.force.s = minspeed
        } else {
            this.force.s = 0
        }

        if (Math.abs(this.motion.s - this.force.s) < 0.1) {
            this.motion.s = this.force.s
        }
        
        if (this.motion.s < this.force.s) {
            this.motion.s += acc/100*Math.sin((this.force.d+90-this.motion.d)*rad)
        } else if (this.force.s < 0 & this.motion.s > this.force.s) {
            this.motion.s -= acc/100
        } else if (this.motion.s > this.force.s) {
            this.motion.s -= acc/400
        }

        var truedrift = turnspeed
        if (this.motion.s > driftlimit) {
            truedrift = drift
        }
        if (this.motion.d > this.force.d) {
            this.motion.d -= truedrift
        } else if (this.motion.d < this.force.d) {
            this.motion.d += truedrift
        }

        
        if (Math.abs(this.motion.d - this.force.d) < truedrift) {
            this.motion.d = this.force.d
        }
        
        this.x += Math.cos(this.motion.d*rad)*this.motion.s
        this.y += -Math.sin(this.motion.d*rad)*this.motion.s
    }

    sense() {
        var inputs = []
        for (let i in sensors) {
            inputs.push([])
        }
        const borders = [leftBorder,rightBorder]
        for (let n in borders) {
            for (let i = 1; i < borders[n].length; i++) {
                const p1 = {x:this.x,y:this.y}
                const p3 = borders[n][i-1]
                const p4 = borders[n][i]


                for (let m in sensors) {
                    var r = this.force.d+sensors[m]
                    r *= rad
                    const p2 = {x:p1.x+Math.cos(r)*sr,y:p1.y+Math.sin(-r)*sr}
                    
                    const m1 = (p1.y-p2.y)/(p1.x-p2.x)
                    const m2 = (p3.y-p4.y)/(p3.x-p4.x)

                    
                    var x5 = (m1*p1.x-m2*p3.x+p3.y-p1.y)/(m1-m2)

                    if (m2 == Infinity) {
                        x5 = p3.x
                    }
                    
                    var y5 = m1*(x5-p1.x)+p1.y
                    if (Math.abs(m1) > 10000) {
                        y5 = m2*(x5-p3.x)+p3.y
                    }

                    const isInter = (intersects(
                        p1.x,p1.y,p2.x,p2.y,p3.x,p3.y,p4.x,p4.y,
                    ))

                    if (isInter) {
                        inputs[m].push({x:x5,y:y5})
                    }
                }
                
            }    
        }
        
        var input = []
        for (let i in sensors) {
            input.push({x:10000,y:10000})
        }
        for (let i in inputs) {
            var inp = inputs[i]
            for (let n in inp) {
                if (dis(inp[n],this) < dis(input[i],this)) {
                    input[i] = inp[n]
                }
            }
            const distance = dis(input[i],this)
            // if (distance < 1000) {
            //     line([input[i],this])
            // }
            // shape('e',input[i].x,input[i].y,10,10,'blue')
            if (distance < size/2) {
                this.run = false
                if (!this.ai && !godmode) {
                    this.reset()
                }
            }
            input[i] = distance
        }
        if (this.ai) {
            this.think(input)
        }
    }

    check() {
        if (this.score.length == waylines.length) {
            return
        }
        const p = waylines[this.score.length]
        const angle = this.force.d*rad

        const isInter = (intersects(
            p[0].x,p[0].y,p[1].x,p[1].y,this.x,this.y,
            this.x+Math.cos(angle)*10,
            this.y+Math.sin(-angle)*10,
        ))

        this.time++
        if (isInter) {
            this.score.push(time)
            this.time = 0
        } else if (this.time > 400/gspeed) {
            this.run = false
        }
    }

    think(sensors) {
        for (let i in sensors) {
            sensors[i] /= sr
        }
        var driftSensor = Math.abs(this.force.d-this.motion.d)/70
        const inputs = sensors.concat([this.motion.s/maxspeed,driftSensor])
        const outputs = this.nn.run(inputs)
        const meanings = ['l','r','u','d']

        for (let i in meanings) {
            const key = meanings[i]
            if (outputs[i] > 0.5) {
                this.keys[key] = true
            } else {
                this.keys[key] = false
            }
        }
    }
}

var car = new Car(false)

if (ai) {
    for (let i = 0; i < population; i++) {
        cars.push(new Car())
    }
}

reset()
draw()

function animate() {
    if (run) {
        requestAnimationFrame(animate)
        // setTimeout(animate,1)
    }
    clear()
    draw()
    background()
    var alive = 0
    var aliveone = 0
    if (ai) {
        for (let i in cars) {
            if (cars[i].run) {
                cars[i].move()
                cars[i].print()
                aliveone = i
                alive++
            }
        }
        nodes = cars[aliveone].nn.nodes
    }
    car.move()
    car.print()
    console.log(time);

    if (alive == 0 & ai) {
        gen++
        time = 0
        var max = 0
        for (let i in cars) {
            if (cars[max].score.length < cars[i].score.length) {
                max = i
            } else if (cars[max].score.length == cars[i].score.length) {
                const length = cars[max].score.length
                if (cars[max].score[length-1] > cars[i].score[length-1]) {
                    max = i
                }
            }
        }

        
        for (let i in cars) {
            cars[i].reset()
            if (i != max) {
                let r = range
                cars[i].nn.set(cars[max].nn.cons,r)
            }
        }

        cons = cars[max].nn.cons
    }

    if (true) {
        if (keys.includes('ArrowRight')) {
            car.keys.r = true
        } else {
            car.keys.r = false
        }
        if (keys.includes('ArrowLeft')) {
            car.keys.l = true
        } else {
            car.keys.l = false
        }
        if (keys.includes('ArrowUp')) {
            car.keys.u = true
        } else {
            car.keys.u = false
        }
        if (keys.includes('ArrowDown')) {
            car.keys.d = true
        } else {
            car.keys.d = false
        }
    }


    time++
}