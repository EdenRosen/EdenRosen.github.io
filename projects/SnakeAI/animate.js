function animate() {
    if (running) {
        // requestAnimationFrame(animate)
        setTimeout(animate,1)
        
    }
    c.clear()
    let restart = false
    if (100-time%100 < speed | time%100 == 0) {
        time = Math.round(time/100)*100
        snake = snakes[0]
        tail = JSON.parse(JSON.stringify(parts[parts.length-1]))
        restart = true
        snakes.forEach((s,i) => {
            if (s.running) {
                if (!snake.running) {
                    snake = snakes[i]
                    neat.cons = snake.nn.cons
                }
                s.move()
                restart = false
            }
        })
        parts = snake.parts
        length = snake.length
        apple = snake.apple
    }
    print(time % 100)
    time += speed
    if (restart) {
        time = 0
        generation++
        console.log(generation);
        let index = 0
        snakes.forEach((s,i) => {
            if (s.score > snakes[index].score) {
                index = i
            } else if (s.score == snakes[index].score & s.time > snakes[index].time) {
                index = i
            }
        })
        let first = snakes[0]
        snakes[0] = snakes[index]
        snakes[index] = first
        neat.cons = snakes[0].nn.cons
        neat.nodes = snakes[0].nn.nodes
        snake = snakes[0]
        snake.reset()
        for (let i = 1; i < snakes.length; i++) {
            let range
            if (i < 20/100*population) {
                range = 0.04
            } else if (i < 70/100*population) {
                range = 0.1
            } else {
                range = 0.3
            }

            neat.mutate(snakes[i].nn,range)
            snakes[i].reset()
        }
    }
}