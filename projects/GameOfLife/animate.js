function animate() {
    if (run) {
        // requestAnimationFrame(animate)
        setTimeout(animate,100)
    }
    generation()
    print()
}