function animate() {
    if (run) {
        requestAnimationFrame(animate)
        // setTimeout(animate,1)
    }
    clear()
    let alive = 0
    let best
    for (let i in players) {
        if (!players[i].run) {
            continue
        } else {
            alive++
        }
        players[i].move()
        players[i].print()
        if (!players[i].run) {
            alive--
            best = players[i]
        }
    }
    if (alive == 0) {
        var range = 0.1
        if (progress[gen] < 150) {
            range = 0.4
        }
        gen++
        progress.push(0)
        if (gen > 100) {
            console.log(con);
        }
        for (let i in players) {
            p = players[i]
            p.run = true
            p.y = ch/2
            p.dy = 0
            if (i == 0) {
                p.set(best.c,range,true)
            } else {
                p.set(best.c,range)
            }
            // p.set(best.c,0.1)
            con = best.c
        }
        reblue()
    }
    speed = 7 + progress[gen]/300
    if (speed > 25) {
        speed = 25
    }
    if (speed%1 == 0) {
        console.log('speed: '+speed);
    }
    x -= speed
    shape('r',x,ch-h/2,w,h,'blue')
    shape('r',x,(ch-h-wh)/2,w,ch-h-wh,'blue')
    if (x <= 0) {
        reblue()
    }

    function reblue() {
        x = cw
        h = Math.random()*ch*0.6+ch*0.1
        h = Math.floor(Math.random()*5)*ch*0.12+ch*0.1
    }

    progress[gen]++
    draw(alive)
}

draw()
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
    var points = []
    const max = Math.max(...progress)
    for (let n in progress) {
        points.push([n*140/(progress.length-1)+270,150-progress[n]/max*100])
    }
    line(points,'black')
    ctx.font = '30px Ariel'
    ctx.fillText(`Gen: ${gen}`,cw-150,50)
    ctx.fillText(`Birds: ${birds}`,cw-150,100)
}