function animate() {
    if (run) {
        requestAnimationFrame(animate)
    }
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    const aspR = bgImages[0].width / bgImages[0].height
    const hidden = canvas.height * aspR - canvas.width
    
    if (mouse.y < 980) {
        ready = true
    }
    if (mouse.y > 980 & ready) {
        if (security) {
            security = false
            $('.camera').hide()
        } else {
            security = true
            $('.camera').show()
        }
        ready = false
    }
    if (!security) {
        if (mouse.x < 100 & x > -100) {
            x -= 2
        } else if (mouse.x > 900 & x < 100) {
            x += 2
        }
        let img
        if (flash & x > 0) {
            img = 3
        } else {
            img = 0
        }
        c.drawImage(bgImages[img], -hidden/2 + -x * hidden / 200, 0, canvas.height * aspR, canvas.height)
    } else {
        let cam = 0  // will have use in the future
        let fcam = 1
        switch (camera) {
            case 1:
            case 3:
            case 4:
            case 6:
            case 10:
            case 11:
                if (Object.values(places).includes(camera)) {
                    fcam = 2
                }
                break
            case 2: // need more cam
            case 9:
                if (Object.values(places).includes(camera)) {
                    cam = 1
                }
                fcam = cam
                break
            case 5:
                if (places.c == camera) {
                    fcam = 2
                } else if (places.b == camera) {
                    fcam = 3
                }
                break
            case 7:
                if (places.fo == camera) {
                    fcam = 2
                } else if (places.c == camera) {
                    fcam = 3
                }
                break
            case 8:
                if (places.fo == camera) {
                    cam = 1
                } else if (places.c == camera & places.b == camera) {
                    cam = 2
                } else if (places.c == camera) {
                    cam = 3
                } else if (places.b == camera) {
                    cam = 4
                }
                fcam = cam
                break
        }
        if (flash) {
            c.drawImage(camsFiles[camera - 1][fcam], 0, 0, canvas.width, canvas.height)
        } else {
            c.drawImage(camsFiles[camera - 1][cam], 0, 0, canvas.width, canvas.height)
        }
        const img = new Image()
        img.src = '/projects/Fnae/img/map1.png'
        c.drawImage(img, canvas.width * 0.45, canvas.height * 0.08, canvas.width * 0.7, canvas.height * 1)
    }
    if (security) {
        c.fillStyle = 'white'
    } else {
        c.fillStyle = 'black'
    }
    c.font = canvas.width / 40 + "px 'Nunito'"
    if (hour == 0) {
        c.fillText('12 PM', canvas.width * 0.92, canvas.width * 0.03)
    } else {
        c.fillText(hour + ' AM', canvas.width * 0.92, canvas.width * 0.03)
    }
    c.font = canvas.width / 65 + "px 'Nunito'"
    c.fillText('Night ' + night, canvas.width * 0.922, canvas.width * 0.053)
}