reset()
function animate() {
    if (run) {
        requestAnimationFrame(animate)
        // setTimeout(animate,1)
    }
    clear()
    background()
    if (!free()) {
        run = false
    }
    down--
    if (down == 0) {
        down = speed
        player.y++
        if (findx(sh,true) | !free() | player.y <= 0) {
            player.y--
            if (player.y >= 0) {
                for (let i in map) {
                    let block = {
                        x:map[i].x+player.x,
                        y:map[i].y+player.y,
                        i:player.i,
                    }
                    blocks.push(block)
                }
            }

            
            player.i = waitlist[0]
            player.r = 0
            waitlist.shift()
            waitlist.push(Math.floor(Math.random()*types.length))
            player.y = 0
            player.x = Math.floor(sw/2)-2
            if (types[player.i].p == 2) {
                player.x++
            }
            check()
        }
    }
    if (key) {
        if (key == 'ArrowUp') {
            rotate()
            player.r++
            if (free()) {
                if (findx(sw)) {
                    player.x--
                } else if (findx(-1)) {
                    player.x++
                }
                if (types[player.i].p == 4) {
                    if (findx(sw)) {
                        player.x--
                    } else if (findx(-1)) {
                        player.x++
                    }
                }
            } else {
                player.r--
                for (let i = 0; i < 3; i++) {
                    rotate()
                }
            }
        } else if (key == 'ArrowRight') {
            xlag++
            player.x++
            if (findx(sw) | !free() | xlag < xspeed) {
                player.x--
            } else if (xlag > 100) {
                xlag = -xspeed-6
            } else {
                xlag = 0
            }
        } else if (key == 'ArrowLeft') {
            xlag++
            player.x--
            if (findx(-1) | !free() | xlag < xspeed) {
                player.x++
            } else if (xlag > 100) {
                xlag = -xspeed-6
            } else {
                xlag = 0
            }
        } else if (key == 'ArrowDown') {
            player.y++
            if (!findx(sh,true) & free() & down < speed - 1) {
                down = 1
                score++
            }
            player.y--
        }
        if (key == 'ArrowUp') {
            key = null
        }
    }



    function free() {
        for (let i in map) {
            if (blocks.find(p => p.x == map[i].x+player.x & p.y == map[i].y+player.y)) {
                return false
            }
        }
        return true
    }

    function findx(x, yaxis = false) {
        if (yaxis) {
            if (map.find(p => p.y+player.y == x)) {
                return true
            }
        } else {
            if (map.find(p => p.x+player.x == x)) {
                return true
            }
        }
        return false
    }
}