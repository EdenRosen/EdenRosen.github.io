var layers
var nodes
var cons


resetAI()
function resetAI() {
    layers = [sensors.length+2,7,4]
    nodes = []
    cons = []

    for (let n in layers) {
        let arr = []
        for (let i = 0; i < layers[n]; i++) {
            arr.push(0)
        }
        nodes.push(arr)
    }

    for (let n = 1; n < nodes.length; n++) {
        let obj = {}
        for (let i in nodes[n]) {
            for (let m in nodes[n-1]) {
                obj[m+i] = 0
            }
        }
        cons.push(obj)
    }
}

const fix = (i) => Math.floor(i*100)/100
const s = (i) => fix(1/(1+Math.pow(Math.E, -i)))

class NN {
    constructor(r) {
        this.nodes = nodes
        this.cons = []
        this.set(cons,r)
    }

    set(c,range = 0.3) {
        var a = JSON.parse(JSON.stringify(c))
        for (let i in a) {
            Object.entries(a[i]).forEach(
                ([key, value]) => {
                    var ran = Math.random()
                    // if (!mutate) {
                    //     ran = 0.5
                    // }
                    let val = value + ran*range - range/2
                    if (val > 1) {
                        val = 1
                    } else if (val < -1) {
                        val = -1
                    }
                    a[i][key] = val
                }
            )
        }
        this.cons = a
    }

    run(inputs) {
        this.nodes[0] = inputs
        for (let n = 1; n < this.nodes.length; n++) {
            for (let i in this.nodes[n]) {
                var sum = 0
                var bias = 0
                for (let m in this.nodes[n-1]) {
                    sum += this.cons[n-1][m+i] * this.nodes[n-1][m]
                    // bias++
                }
                this.nodes[n][i] = s(sum-bias)
            }
        }
        return this.nodes[this.nodes.length-1]
    }
    
}


function draw() {
    if (!ai) {
        return
    }
    for (let n = 1; n < layers.length; n++) {
        for (let i in nodes[n]) {
            for (let m in nodes[n-1]) {
                const nec = cons[n-1][m+i]
                let color = 'red'
                if (nec < 0) {
                    color = 'blue'
                }
                var w = Math.abs(nec)
                if (w == 0) {
                    w = 0.05
                }
                line([{x:n*70+100,y:i*30+50},{x:n*70+30,y:m*30+50}],color,w*2)
            }
        }
    }
    for (let n in layers) {
        for (let i = 0; i < layers[n]; i++) {
            let c = 255-nodes[n][i]*255
            shape('e',n*70+100,i*30+50,10,10,`rgb(${c},${c},${c})`)
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