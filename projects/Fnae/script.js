const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log(11);
const windowRatio = 16/9
const $window = $(window)
const $main = $('main')
const soundtrack1 = new Audio('/projects/Fnae/audio/track1.mp3')
const soundtrack2 = new Audio('/projects/Fnae/audio/track2.m4a')
soundtrack1.volume = 0.5
soundtrack2.volume = 0.5
soundtrack1.loop = true
soundtrack2.loop = true
console.log(11);
const hourTime = 60
const ways = {
    b: [[8, 11, 6, 5, 3, 2], [8, 11, 3, 2]],
    c: [[8, 7, 5, 9, 1], [8, 10, 1]],
    fo: [[8, 7, 4]]
}

var night = 1
var hour = null
var flash = false
var camera = 8
var bgImages
var places = {
    b: 8,
    c: 8,
    fo: 8
}
const cams = [
    { top: '22.7em', left: '39.2em'},
    { top: '16em', left: '43.7em'},
    { top: '11.7em', left: '41.5em'},
    { top: '7em', left: '44em'},
    { top: '14.8em', left: '37em'},
    { top: '14em', left: '32em'},
    { top: '11.7em', left: '36.5em'},
    { top: '10.3em', left: '31.8em'},
    { top: '25.6em', left: '35.8em'},
    { top: '7.8em', left: '47em'},
    { top: '9em', left: '35em'}
]
var camsFiles = [
    ['c1.jpeg', 'c1-2.jpeg', 'c1-3.jpeg'],
    ['c2.jpeg', 'c2-3.jpeg'],
    ['c3.jpeg', 'c3-2.jpeg', 'c3-3.jpeg'],
    ['c4.jpeg', 'c4-2.jpeg', 'c4-3.jpeg'],
    ['c5.jpeg', 'c5-2.jpeg', 'c5-3.jpeg', 'c5-4.jpeg'],
    ['c6.jpeg', 'c6-2.jpeg', 'c6-3.jpeg'],
    ['c7.jpeg', 'c7-2.jpeg', 'c7-3.jpeg', 'c7-4.jpeg'],
    ['c8.jpeg', 'c8-2.jpeg', 'c8-3.jpeg', 'c8-4.jpeg', 'c8-5.jpeg'],
    ['c9.jpeg', 'c9-2.jpeg'],
    ['c10.jpeg', 'c10-2.jpeg', 'c10-3.jpeg'],
    ['c11.jpeg', 'c11-2.jpeg', 'c11-3.jpeg'],
]
for (let i in camsFiles) {
    for (let n in camsFiles[i]) {
        const img = new Image()
        img.src = '/projects/Fnae/img/' + camsFiles[i][n]
        img.onload = function() {
            camsFiles[i][n] = img
        }
    }
}

// home()
resizeWindow()
$('.camera').hide()
setTimeout(home, 50)


$window.resize(function() {
    resizeWindow()
})

function resizeWindow() {
    if ($window.width() > $window.height() * windowRatio) {
        $main.height($window.height())
        $main.width($window.height() * windowRatio)
    } else {
        $main.width($window.width())
        $main.height($window.width() / windowRatio)
    }
    canvas.width = $main.width()
    canvas.height = $main.height()
    $('html').css('--size', canvas.width / 50 + 'px')
    $('.camera').each(function(i) {
        if ($window.width() > $window.height() * windowRatio) {
            $(this).css('left',
                `calc(${cams[i].left} + ${($window.width() - canvas.width) / 2}px)`
            )
            $(this).css('top', cams[i].top)
        } else {
            $(this).css('left', cams[i].left)
            $(this).css('top',
                `calc(${cams[i].top} + ${($window.height() - canvas.height) / 2}px)`
            )
        }
    })
}

$('#start').click(function() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    $('#home').hide()
    $(canvas).show()
    $('.camera').hide()
    bgImages = [
        new Image(),
        new Image(),
        new Image(),
        new Image(),
        new Image()
    ]
    bgImages[0].src = '/projects/Fnae/img/bg1.jpeg'
    bgImages[1].src = '/projects/Fnae/img/bg2.jpeg'
    bgImages[2].src = '/projects/Fnae/img/bg3.jpeg'
    bgImages[3].src = '/projects/Fnae/img/bg4.jpeg'
    bgImages[4].src = '/projects/Fnae/img/bg5.jpeg'
    bgImages[0].onload = function() {
        setTimeout(() => start(), 1000)
    }
})

$('.camera').click(function() {
    camera = parseInt(this.id.substring(1))
    $('.camera').css('background', 'rgb(50, 74, 126)')
    this.style.background = 'rgb(71, 155, 92)'
})

$('html').keydown(function(e) {
    if (e.which == 17) {
        flash = true
    }
})

$('html').keyup(function(e) {
    if (e.which == 17) {
        flash = false
    }
})

$window.on('mousemove', function(event) {
    if (run) {
        if ($window.width() > $window.height() * windowRatio) {
            mouse.x = event.pageX - ($window.width() - canvas.width) / 2
            mouse.y = event.pageY
        } else {
            mouse.x = event.pageX
            mouse.y = event.pageY - ($window.height() - canvas.height) / 2
        }
        mouse.x = mouse.x / canvas.width * 1000
        mouse.y = mouse.y / canvas.height * 1000
    }
})

function home(next) {
    soundtrack1.pause()
    soundtrack2.play()
    run = false
    hour = null
    flash = false
    camera = 8
    security = false
    ready = false
    x = 0
    if (next) {
        night ++
    }
    c.clearRect(0, 0, canvas.width, canvas.height)
    $('#home').show()
    $(canvas).hide()
    $('.camera').hide()
    $('#start').text('Night ' + night)
}

var x = 0
var run = false
var mouse = { x: 0, y: 0 }
var security = false
var ready = false
    
function timer() {
    if (hour == null) {
        hour = 0
    } else {
        hour ++
    }
    if (hour == 6) {
        home(true)
    } else {
        setTimeout(timer, hourTime * 1000)
    }
}

function start() {
    soundtrack2.pause()
    soundtrack2.currentTime = 0
    soundtrack1.play()
    run = true
    timer()
    animate()
    setTimeout(move, 20000)
}

function move() {
    if (!run) {
        return
    }
    let options = Object.keys(places)
    let picked
    do {
        picked = options[ran(options.length)]
    }
    while ((picked == 'b' | picked == 'c') & places.fo == 8)
    let way
    let index
    do {
        way = ways[picked][ran(ways[picked].length)]
        index = way.indexOf(places[picked])
    }
    while (index == -1)
    if (index + 1 != way.length) {
        places[picked] = way[index + 1]
    }
    console.log(picked, way, places[picked]);
    setTimeout(move, 15000/night)
}

function ran(len) { return Math.floor(Math.random() * len) }