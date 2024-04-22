function animate() {
    if (running) {
        requestAnimationFrame(animate)
    }
    clear()

    faces.forEach(f => f.print(-camera.xr, camera.yr))
    shape('r',cw/2,cw/4,30,3,'white')
    shape('r',cw/2,cw/4,3,30,'white')

    let diagonal = [
        keys.includes('a') & keys.includes('w') & !keys.includes('d') & !keys.includes('s'),
        keys.includes('w') & keys.includes('d') & !keys.includes('s') & !keys.includes('a'),
        keys.includes('d') & keys.includes('s') & !keys.includes('a') & !keys.includes('w'),
        keys.includes('s') & keys.includes('a') & !keys.includes('w') & !keys.includes('d'),
    ]

    if (diagonal.includes(1)) {
        speed /= Math.sqrt(2)
    }
    

    let dx = speed*fix(Math.sin(camera.yr*rad))
    let dz = speed*fix(Math.cos(camera.yr*rad))

    camera.yr = -(mouse.x-400)/2
    camera.xr = -(mouse.y-200)/2
    if (camera.xr < -90) {
        camera.xr = -90
    } else if (camera.xr > 90) {
        camera.xr = 90
    }


    if (creative) {
        if (keys.includes('a') & !keys.includes('d')) {
            camera.x -= dz
            camera.z -= dx
        } else if (keys.includes('d') & !keys.includes('a')) {
            camera.x += dz
            camera.z += dx
        }
        if (keys.includes('w') & !keys.includes('s')) {
            camera.x -= dx
            camera.z += dz
        } else if (keys.includes('s') & !keys.includes('w')) {
            camera.x += dx
            camera.z -= dz
        }
        if (keys.includes('Shift') & !keys.includes('Control')) {
            camera.y += speed
        } else if (keys.includes('Control') & !keys.includes('Shift')) {
            camera.y -= speed
        }
    } else {
        yspeed -= 1.5
        if (keys.includes(' ') & collition.bottom) {
            yspeed = 25
        } else if (yspeed < -100) {
            yspeed = -100
        }
        camera.y += yspeed
        
        const check = (c, p) => Math.abs(c+0.5-p) < 0.5
        const col = found => {
            if (found) {
                return true
            }
            return false
        }
        let p = {x:camera.x/cz+0.5,y:camera.y/cz+0.5,z:camera.z/cz+0.5}

        var top = cubes.find(c => check(c.x,p.x) & check(c.y,p.y+pz.h) & check(c.z,p.z))
        var bottom = cubes.find(c => check(c.x,p.x) & check(c.y,p.y) & check(c.z,p.z))
        
        collition.top = col(top)
        collition.bottom = col(bottom)
        collition.front = col(cubes.find(c => check(c.x,p.x) & (check(c.y,p.y+0.5) | check(c.y,p.y+0.5+Math.floor(pz.h))) & check(c.z,p.z+pz.w/2)))
        collition.back = col(cubes.find(c => check(c.x,p.x) & (check(c.y,p.y+0.5) | check(c.y,p.y+0.5+Math.floor(pz.h))) & check(c.z,p.z-pz.w/2)))
        collition.right = col(cubes.find(c => check(c.x,p.x+pz.w/2) & (check(c.y,p.y+0.5) | check(c.y,p.y+0.5+Math.floor(pz.h))) & check(c.z,p.z)))
        collition.left = col(cubes.find(c => check(c.x,p.x-pz.w/2) & (check(c.y,p.y+0.5) | check(c.y,p.y+0.5+Math.floor(pz.h))) & check(c.z,p.z)))

        if (collition.bottom) {
            camera.y = bottom.y*cz+cz/2
            yspeed = 0
        }
        if (collition.top) {
            camera.y = top.y*cz-cz*2.3
            yspeed = 0
        }
        

        function move(type,d) {
            if (!collition.back & type == 'z' & d < 0) {
                camera.z += d
            } else if (!collition.front & type == 'z' & d > 0) {
                camera.z += d
            } else if (!collition.left & type == 'x' & d < 0) {
                camera.x += d
            } else if (!collition.right & type == 'x' & d > 0) {
                camera.x += d
            }
        }

        if (keys.includes('a') & !keys.includes('d')) {
            move('x', -dz)
            move('z', -dx)
        } else if (keys.includes('d') & !keys.includes('a')) {
            move('x', dz)
            move('z', dx)
        }
        if (keys.includes('w') & !keys.includes('s')) {
            move('x', -dx)
            move('z', dz)
        } else if (keys.includes('s') & !keys.includes('w')) {
            move('x', dx)
            move('z', -dz)
        }

    }
    if (creative) {
        speed = Cspeed
    } else {
        speed = Sspeed
    }

    let cam = {x:camera.x+cz/2,y:camera.y+cz*(0.5+pz.h)-20,z:camera.z+cz/2}
    let found = false
    for (let i = 0; i<25 & !found;i++) {
        found = cubes.find(c => c.x == Math.floor(cam.x/cz) & c.y == Math.floor(cam.y/cz) & c.z == Math.floor(cam.z/cz))
        // let z = -cz*Math.cos(camera.xr*rad)
        // z = z*Math.cos(camera.yr*rad)
        cam.y += cz*Math.sin(camera.xr*rad)/4
        cam.x += -cz*Math.sin(camera.yr*rad)/4
        cam.z += cz*Math.cos(camera.yr*rad)/4
        // console.log(cz*Math.cos(camera.xr*rad)/4);
    }
    if (found) {
        // console.log(camera.yr);
        cubes.splice(cubes.indexOf(found), 1)
        // cubes.push({x:found.x,y:found.y+1,z:found.z,c:colors[2]})
        update()
    }
}