class SoundBlock {
    constructor (id) {
        this.id = id
        this.mic = $(`#btn${id}`)
        this.audio = document.getElementById(`audio${id}`)
        this.playing = false
        this.recording = false
        this.recorder = null
        this.can_record = false
        this.playable = false
        this.chunks = []
        this.setup()
    }

    setupStream(stream) {
        this.recorder = new MediaRecorder(stream)

        this.recorder.ondataavailable = e => {
            this.chunks.push(e.data)
        }

        this.recorder.onstop = e => {
            if (!this.recording) {
                return
            }
            this.recording = false
            const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" })
            this.chunks = []
            const audioURL = window.URL.createObjectURL(blob)
            this.audio.src = audioURL
            this.playable = true
            this.mic.addClass('playable')
        }
        this.can_record = true
    }

    toggleMic() {
        if (!this.can_record) return
        this.stopAudio()
        if (!this.recording) {
            this.recording = true
            this.recorder.start()
            this.mic.removeClass('playable')
            this.mic.addClass('recording')
        } else {
            this.recorder.stop()
            this.mic.removeClass('recording')
        }
    }

    toggleLoop() {
        if (!this.playable) {
            return
        }
        if (this.audio.loop) {
            this.audio.loop = false
        } else {
            this.audio.loop = true
        }
        this.updateLoopBtn()
    }

    updateLoopBtn() {
        if (this.audio.loop) {
            $('#loopBtn').addClass('activated')
        } else {
            $('#loopBtn').removeClass('activated')
        }
    }

    stopAudio() {
        if (this.playing) {
            this.audio.currentTime = 0
            this.audio.pause()
        }
        this.playing = false
        this.mic.removeClass('playing')
    }
    
    playAudio() {
        if (!this.playable) {
            return
        }
        this.playing = true
        this.audio.play()
        this.mic.addClass('playing')
    }

    removeAudio() {
        this.stopAudio()
        if (this.recording) {
            this.toggleMic()
        }
        this.audio.src = ''
        this.audio.loop = false
        this.playable = false
        this.updateLoopBtn()
        this.mic.removeClass('playable')
    }

    toggleControls() {
        if (controlsId != this.id) {
            if (controlsId != null) {
                blocks[controlsId-1].audio.classList.remove('display')
            }
            controlsId = this.id
            $soundControl.addClass('display')
            this.audio.classList.add('display')
            const text = `Block ${this.id}`
            $('#soundControl .title').text(text)
            this.updateLoopBtn()
            
        } else {
            controlsId = null
            $soundControl.removeClass('display')
            this.audio.classList.remove('display')
        }
        
    }

    click() {
        if (this.playing) {
            this.stopAudio()
            this.playAudio()
        } else if (this.recording) {
            this.toggleMic()
        } else  if (this.playable) {
            this.playAudio()
        } else {
            this.toggleMic()
        }
    }

    setup() {
        this.mic.mousedown(e => {
            if (e.which == 1) {
                this.click()
            } else if (e.which == 2) {
                this.stopAudio()
            } else if (e.which == 3) {
                this.toggleMic()
            }
        })
    
        this.mic.bind('contextmenu', e => {
            e.preventDefault()
        })
    
        this.audio.onended = () => {
            this.stopAudio()
        }
    
        this.mic.dblclick(() => {
            this.toggleControls()
        })

        $('html').keydown(e => {
            if (e.key == KEYS[this.id-1]) {
                this.click()
            }
        })

        $('#deleteBtn').click(() => {
            if (controlsId == this.id) {
                this.removeAudio()
            }
        })

        $('#loopBtn').click(() => {
            if (controlsId == this.id) {
                this.toggleLoop()
            }
        })
    }
}