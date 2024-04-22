const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const cw = 800 // canvas width
const ch = 400 // canvas height
canvas.width = cw;
canvas.height = ch;

var list = []
var run = false
var time = 0
var count = 0
var speed = 50

for (let i = 0; i < 100; i++) {
    list.push(i+1)
}

var mv = Math.max(...list) // max value

print()

function print(...data) {
    clear()
    for (let i in list) {
        const w = cw/list.length
        const h = ch/mv*list[i]
        const x = cw/list.length*i
        const y = ch-h
        var color = 'white'
        if (data.includes(parseInt(i))) {
            color = 'red'
        }
        shape('r', x+w/2, y+h/2, w, h, color)
        shape('r', x+w/2, y+h/2, w, h, color)
        shape('r', x+w/2, y+h/2, w, h, color)
    }
}

function reset() {
    count = 0
    bubble = list.length-1
    selection = 0
    seMin = {p:0,v:mv}
    insertion = 0
    pivot = 0
    ifr = list.length-1
    ifl = 1
    pivots = []
    time = 0
    merge = []
    merged = []
    ls = 0
    rs = 0
    done = []
    end = false
}


function shuffle() {
    const ran = Math.floor(Math.random()*(list.length-count))+count
    const temp = list[count]
    list[count] = list[ran]
    list[ran] = temp
    print(count, ran)
    if (count < list.length-1 & run) {
        setTimeout(shuffle, 1)
    }
    count++
    if (count == list.length) {
        run = false
        print()
    }
}

$('canvas').click(function() {
    run = false
    setTimeout(function() {
        for (let i = 0; i < list.length; i++) {
            list[i] = i+1
        }
        print()
    }, speed+1)
})

$('.btn-row > button').click(function() {
    if (!run) {
        if (this.id == 'shuffle') {
            count = 0
            run = true
            shuffle()
            print()
        } else {
            reset()
            run = true
            customSort(this.id)
        }
    }
})

$('#range').change(function() {
    if (!run) {
        list = []
        for (let i = 0; i < this.value; i++) {
            list.push(i+1)
        }
        mv = Math.max(...list)
        print()
    }
})

$('#speed').change(function() {
    let options = [1000,500,200,100,70,40,20,10,5,2,1]
    speed = options[this.value]
})

var bubble
var selection
var seMin
var insertion
var pivot
var ifr
var ifl
var pivots
var merge
var merged
var ls
var rs
var saved
var done
var end

function customSort(type) {
    if (type == 'b') {
        if (list[count]>list[count+1]) {
            swap(count, count+1)
        }
        if (bubble == count) {
            bubble--
            if (bubble == 1) {
                run = false
            }
            count = -1
        }
        print(count, count+1)
        count++
    } else if (type == 's') {
        if (list[count]<seMin.v) {
            seMin.v = list[count]
            seMin.p = count
        }
        if (count == list.length-1) {
            seMin.v = mv
            selection++
            if (selection == count) {
                run = false
            }
            count = selection-1
            swap(selection-1, seMin.p)
            print(selection-1, seMin.p)
        } else {
            print(count, seMin.p)
        }
        count++
    } else if (type == 'i') {
        if (count == list.length) {
            run = false
        } else if (count==0) {
            count = 1
            insertion = 1
        } else if (list[insertion]<list[insertion-1]) {
            swap(insertion,insertion-1)
            insertion--
            if (insertion == 0) {
                count++
                insertion = count
            }
        } else {
            count++
            insertion = count
        }
        print(insertion)
    } else if (type == 'q') {
        if (list[ifr]<list[pivot] & list[ifl]>list[pivot]) {
            swap(ifl, ifr)
        }
        if (list[ifr]>list[pivot]) {
            ifr--
        }
        if (list[ifl]<list[pivot]) {
            ifl++
        }
        if (ifr<ifl) {
            swap(ifr, pivot)
            pivots.push(ifr)
            pivot = null
            for (let i = 0; i < list.length; i++) {
                if (!pivots.includes(i)) {
                    pivot = i
                    break
                }
            }
            if (pivot == null) {
                run = false
            } else {
                ifr = list.length-1
                for (let i = pivot+2; i < list.length; i++) {
                    if (pivots.includes(i)) {
                        ifr = i-1
                        break
                    }
                }
                ifl = pivot+1
                if (ifl == ifr) {
                    if (list[ifr]<list[pivot]) {
                        swap(pivot, ifr)
                    }
                    pivots.push(ifr, pivot)
                    ifr = pivot
                }
            }
        }
        print(ifl, ifr)
    } else if (type == 'm') {
        if (!merge.length) {
            if (done.length) {
                let last = done[done.length-1]
                let last2 = done[done.length-2]
                let sum = done.reduce((a,b) => a+b)
                if (done.length == 1) {
                    if (sum == list.length-1) {
                        done.push(1)
                        sum++
                        Merge(0, sum-2, sum-1)
                    }
                    if (last == 2) {
                        compare(2,3)
                    } else {
                        compare(last, last+1)
                    }
                } else if (sum == list.length | last == last2) {
                    Merge(sum-last-last2, sum-last-1, sum-1)
                } else if (sum == list.length-1) {
                    done.push(1)
                    sum++
                    Merge(sum-last-last2, sum-last-1, sum-1)
                } else {
                    compare(sum, sum+1)
                }
            } else {
                compare(0,1)
            }
        }

        if (merge.length) {
            const lss = list[ls]
            const rss = list[rs]
            if (merge[0] == -1) {
                let i = merge[2]-merged.length+1
                list[i] = saved.split(',').map(s => parseInt(s))[merged[0]]
                merged.splice(0, 1)
                if (!merged.length) {
                    merge = []
                    if (done[0] == list.length) {
                        run = false
                    }
                }
                print(i)
            } else if ((end == 'r' | rss<lss) & end != 'l') {
                merged.push(rs)
                print(ls, rs)
                rs++
                if (rs > merge[2]) {
                    end = 'l'
                    rs--
                }
            } else  {
                merged.push(ls)
                print(ls, rs)
                ls++
                if (ls > merge[1]) {
                    end = 'r'
                    ls--
                }
            }
            if (merged.length == merge[2]-merge[0]+1) {
                end = false
                merge[0] = -1
                saved = list.join()
            }
        }

        function compare(a,b) {
            if (list[a]>list[b]) {
                swap(a, b)
            }
            done.push(2)
            print(a,b)
        }

        function Merge(a, b, c) {
            merge = [a, b, c]
            ls = a
            rs = b+1
            done.splice(done.length-2, 2, done[done.length-1]+done[done.length-2])
        }
    }
    if (run) {
        setTimeout(() => customSort(type), speed)
    } else {
        print()
    }
    
    function swap(a, b) {
        const temp = list[a]
        list[a] = list[b]
        list[b] = temp
    }
}

function timer() {
    time++
    console.log(time/100);
    if (run) {
        setTimeout(timer, 10)
    }
}

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
        if (i > 0) {
            ctx.lineTo(points[i][0], points[i][1])
        }
    }
    if (fillColor) {
        ctx.closePath()
        ctx.fillStyle = fillColor
        ctx.fill()
    }
    ctx.stroke()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
