var pmouse = false
function animate() {
    if (running) {
        requestAnimationFrame(animate)
    }
    clear()
    line(wayline,'gray',50)
    for (let i in darts) {
        darts[i].move()
        if (darts[i].level < 1 || darts[i].life == 0) {
            darts.splice(i,1)
        } else {
            darts[i].print()
        }
    }
    for (let i in enemies) {
        enemies[i].move()
        if (enemies[i].target == waypoints.length) {
            hearts -= lifes[enemies[i].level-1] + enemies[i].level-1
            enemies.splice(i,1)
            if (hearts <= 0) {
                hearts = 0
                running = false
            }
        } else {
            enemies[i].print()
        }
    }
    for (let i in turrets) {
        turrets[i].move()
        turrets[i].print()
    }
    if (viewed) {
        const t = turrets[viewed]
        const p = prices[t.type][t.level]
        if (p) {
            ctx.fillText(`${p} $`,t.x/100*cw-26,ch-t.y/100*cw+70)
        }
        if (hold == 'u') {
            if (t.level < 11 & money - prices[t.type][t.level] >= 0) {
                turrets[viewed].level++
                money -= prices[t.type][t.level-1]
            }
            hold = false
        }
        shape('e',t.x/100*cw,ch-t.y/100*cw,t.r*2/100*cw,t.r*2/100*cw,'rgba(137,137,137,0.3)')
    }
    if (hold & hold != 'u') {
        const img = images[0][hold-1]
        const o = cw/canvas.offsetWidth
        const t = {
            x: mouse.x*100/canvas.offsetWidth,
            y: ((canvas.offsetHeight-mouse.y)*100/canvas.offsetHeight)*ch/cw
        }
        let color = 'rgba(255,137,137,0.3)'
        const can = turrets.find(t2 => Math.sqrt(Math.pow(t2.x-t.x,2) + Math.pow(t2.y-t.y,2)) < turretSize)
        if (!can & notTrack(t.x,t.y)) {
            color = 'rgba(137,137,137,0.3)'
        }
        shape('e',mouse.x*o,mouse.y*o,30/100*cw,30/100*cw,color)
        shape('img',mouse.x*o,mouse.y*o,img.width/10*4,img.height/10*4,img,0)
        ctx.fillText(`${prices[hold-1][0]} $`,mouse.x*o-26,mouse.y*o+70)
        viewed = false
    }
    if (pmouse != mouse.c) {
        const o = {
            x: mouse.x*100/canvas.offsetWidth,
            y: (canvas.offsetHeight-mouse.y)*100/canvas.offsetHeight
        }
        if (mouse.c == 'left') {
            if (hold & hold != 'u') {
                if (money - prices[hold-1][0] >= 0) {
                    const can = turrets.find(t => Math.sqrt(Math.pow(o.x-t.x,2) + Math.pow(o.y*ch/cw-t.y,2)) < turretSize)
                    if (!can & notTrack(o.x,o.y*ch/cw)) {
                        turrets.push(new Turret(hold-1,1,o.x,o.y))
                        money -= prices[hold-1][0]
                        hold = false
                    }
                }
            } else {
                viewed = false
                for (let i in turrets) {
                    let dist = dis(o.x,o.y*ch/cw,turrets[i].x,turrets[i].y)
                    if (dist < 6) {
                        viewed = i
                    }
                }
            }
        } else if (mouse.c == 'right') {
            viewed = false
        }
    }
    const wave = rounds[scan[0]-1][scan[1]-1]
    if (time % Math.round(wave[2]/gspeed*100) == 0) {
        rounds[scan[0]-1][scan[1]-1][1]--
        if (wave[0] != 0) {
            enemies.push(new Enemy(wave[0]))
        }
        if (wave[1] == 0) {
            if (rounds[scan[0]-1].length == scan[1]) {
                round++
                if (rounds.length == scan[0]) {
                    end = true
                    time = 1
                } else {
                    scan[0]++
                    time = 0
                }
                scan[1] = 1
            } else {
                scan[1]++
                time = 0
            }
        }
    }
    pmouse = mouse.c
    ctx.fillText(`${hearts} ❤`,10,23)
    ctx.fillText(`${money} $`,110,23)
    ctx.fillText(`Round ${round}`,cw-100,23)
    if (!end) {
        time++
    }
}