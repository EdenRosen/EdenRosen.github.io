class Canvas {
    constructor (canvas) {
        this.ctx = canvas.getContext('2d')

    }

    rect (x, y, w, h, color = 'black', deg = 0) {
        const rad = -deg * Math.PI / 180
        this.ctx.fillStyle = color
        
        x -= w/2
        y -= h/2
        this.ctx.save()
        this.ctx.translate(x + w/2, y + h/2);
        this.ctx.rotate(rad);
        this.ctx.fillRect(-w/2, -h/2, w, h)
        this.ctx.restore()
        this.ctx.fillStyle = 'black'
    }

    img (x, y, w, h, color = 'black', deg = 0) {
        const rad = -deg * Math.PI / 180
        if (typeof color == 'string') {
            return
        }
        
        x -= w/2
        y -= h/2
        this.ctx.save()
        this.ctx.translate(x + w/2, y + h/2);
        this.ctx.rotate(rad);
        this.ctx.drawImage(color, -w/2, -h/2, w, h)
        this.ctx.restore()
    }

    oval (x, y, w, h, color = 'black', deg = 0) {
        const rad = -deg * Math.PI / 180
        this.ctx.fillStyle = color
        
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, w/2, h/2, rad, 0, 2 * Math.PI);
        this.ctx.fill()
        this.ctx.fillStyle = 'black'
    }

    line (points, color = 'black', w = 2, fillColor = false) {
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = w
        this.ctx.beginPath()
        this.ctx.moveTo(points[0].x, points[0].y)
        for (let i in points) {
            if (i > 0) {
                this.ctx.lineTo(points[i].x, points[i].y)
            }
        }
        if (fillColor) {
            this.ctx.closePath()
            this.ctx.fillStyle = fillColor
            if (fillColor) {
                this.ctx.fill()
            }
        }
        this.ctx.stroke()
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 3
    }

    clear () {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    text (content,x,y,size = 30,color = 'black',font = 'Arial') {
        this.ctx.fillStyle = color
        this.ctx.font = `${size}px ${font}`;
        this.ctx.fillText(content, x, y);
    }
}