const $panel = $('#panel')
const $audios = $('#audios')
const $soundControl = $('#soundControl')
const KEYS = '1234qwerasdfzxcv'

var blockCount = 16
var blocks = []
var controlsId = null


function addHTML(id) {
    const HTML_BLOCK = `<div id="btn${id}" class="audioBtn"></div>`
    const HTML_AUDIO = `<audio id="audio${id}" class="playback" controls></audio>`
    $panel.append(HTML_BLOCK)
    $audios.append(HTML_AUDIO)
}

function addBlocks() {
    for (let i = 0; i < blockCount; i++) {
        addHTML(i+1)
        var block = new SoundBlock(i+1)
        blocks.push(block)
    }
}

function setupAudio() {
    addBlocks()

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        })
        .then(setupStream)
        .catch(err => {
            console.log(err);
        })
    }
}
setupAudio()

function setupStream(stream) {
    for (let i = 0; i < blockCount; i++) {
        blocks[i].setupStream(stream)
    }
}

$('#clearAllBtn').click(() => {
    for (let block of blocks) {
        block.removeAudio()
    }
    if (controlsId != null) {
        blocks[controlsId-1].toggleControls()
    }
    
})

$('#playAllBtn').click(() => {
    for (let block of blocks) {
        block.stopAudio()
        block.playAudio()
    }
})

$('#stopAllBtn').click(() => {
    for (let block of blocks) {
        block.stopAudio()
        if (block.recording) {
            block.toggleMic()
        }
    }
})