'use strict'

const fontsToLoad = [
    "/resources/font.png",
    "/resources/font_r.png",
    "/resources/font_g.png",
    "/resources/font_b.png",
]

let fontReady = 0

const fonts = []
for ( let i = 0; i < fontsToLoad.length; i++ ) {
    fonts[i] = new Image()

    fonts[i].addEventListener('load', () => {
        fontReady++
        console.log('font ', fontsToLoad[i], ' ready')
    })
    fonts[i].src = fontsToLoad[i]
}

// const font = new Image()

// font.addEventListener('load', () => {
//     fontReady++
//     console.log('font ready')
// })
// font.src = "/resources/font.png"

function getCharPosX ( char ) {
    if (char instanceof String || typeof char == 'string') {
        char = char.charCodeAt(0)
    }

    return char % 32
}

function getCharPosY ( char ) {
    if (char instanceof String || typeof char == 'string') {
        char = char.charCodeAt(0)
    }

    return Math.floor(char / 32)
}

class Char {
    constructor (value, color) {
        this.value = value
        this.color = color
    }
}

class Crt {
    constructor (ctx, width, height) {
        this.width = width || 80
        this.height = height || 25
//        this.charRatio = 1.0
        this.charRatio = 1.78

        this.bg = "#000000"
        this.fg = "#ffffff"

        this.setCtx(ctx)
        this.resize()

        this.stats = {
            framesThisSecond: 0,
            lastFps: 0,
            secondsTotal: 0,
            framesTotal: 0
        }

        this.screen = []
        for ( let y = 0; y < this.height; y++ ) {
            let row = []
            for ( let x = 0; x < this.width; x++ ) {
                let c = new Char(0, Math.floor(Math.random() * 4))
                row.push(c)
            }
            this.screen.push(row)
        }

        setInterval( () => {
            this.nextSecond()
//            this.debugScreenPattern2()
        }, 1000)
    }

    nextSecond () {
        this.stats.secondsTotal++
        this.stats.framesTotal += this.stats.framesThisSecond
        this.stats.lastFps = this.stats.framesThisSecond
        this.stats.framesThisSecond = 0
        console.log(this.stats.lastFps)
    }

    setCtx ( ctx ) {
        this.ctx = ctx
    }

    setBg ( backgroundColor ) {
        this.bg = backgroundColor
    }

    setFg ( foregroundColor ) {
        this.fg = foregroundColor
    }

    setChar (x, y, char) {
        this.screen[y][x].value = char
    }

    screenFade( f = 1 ) {
        for ( let x = 0; x < this.width; x++ ) {
            for ( let y = 0; y < this.height; y++ ) {
                if (this.screen[y][x].value >= f) {
                    this.screen[y][x].value -= f
                } else {
                    this.screen[y][x].value = 0
                }
            }
        }
    }

    resize () {
        let maxCharWidth = gc.width / this.width
        let maxCharHeight = gc.height / this.height

        if (maxCharHeight / this.charRatio > maxCharWidth) {
            this.charWidth = Math.floor(maxCharWidth)
            this.charHeight = Math.floor(this.charWidth * this.charRatio)

        } else {
            this.charHeight = Math.floor(maxCharHeight)
            this.charWidth = Math.floor(this.charHeight / this.charRatio)
        }
        this.offsetX = Math.floor((gc.width - this.charWidth * this.width) / 2)
        this.offsetY = Math.floor((gc.height - this.charHeight * this.height) / 2)
    }

    print (x, y, text, direction) {
        for ( let i = 0; i < text.length; i++ ) {
            if (direction != 1) {
                this.screen[y][x+i] = text.charCodeAt(i)
            } else {
                this.screen[y+i][x] = text.charCodeAt(i)
            }
        }
    }

    debugScreenPattern1 () {
        let c = 0
        for ( let y = 0; y < this.height; y++ ) {
            c = (c + 1) % 2
            for ( let x = 0; x < this.width; x++ ) {
                this.setChar(x, y, c * Math.random() * 255)
                c = (c + 1) % 2
            }
        }
    }

    debugScreenPattern2 () {
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                this.setChar(x, y, Math.floor(Math.random() * 255))
            }
        }
    }

    debugScreenPattern3 () {
        let c = 0
        for ( let y = 0; y < this.height; y++ ) {
            for ( let x = 0; x < this.width; x++ ) {
                this.setChar(x, y, c++ % 256)
            }
        }
    }

    clearScreen () {
        this.ctx.fillStyle = this.bg
        this.ctx.fillRect(
            this.offsetX,
            this.offsetY,
            (this.width * this.charWidth),
            (this.height * this.charHeight)
        )
    }

    drawScreen () {
        this.stats.framesThisSecond++
        // this.ctx.drawImage( font, 0, 16, 9, 16, 0, 0, this.charWidth, this.charHeight )
        this.ctx.strokeStyle = "#ff00ff"

        for ( let x = 0; x < this.width; x++ ) {
            for ( let y = 0; y < this.height; y++ ) {
                this.ctx.drawImage(fonts[this.screen[y][x].color],
                    getCharPosX( this.screen[y][x].value ) * 9,
                    getCharPosY( this.screen[y][x].value ) * 16,
                    9,
                    16,
                    x * this.charWidth + this.offsetX,
                    y * this.charHeight + this.offsetY,
                    this.charWidth, this.charHeight )

                // this.ctx.fillStyle = "#ff000080"
                // this.ctx.fillRect(
                //     x * this.charWidth + this.offsetX,
                //     y * this.charHeight + this.offsetY,
                //     this.charWidth,
                //     this.charHeight
                // )
                // this.ctx.strokeRect(
                //     x * this.charWidth + this.offsetX,
                //     y * this.charHeight + this.offsetY,
                //     this.charWidth,
                //     this.charHeight
                // )

                // this.ctx.fillStyle = "#" + String(x*y * x*y)
                // let c = 'rgb(' + this.screen[y][x] + ', ' + this.screen[y][x] + ', ' + this.screen[y][x] + ')'
                // this.ctx.fillStyle = c
                // this.ctx.fillRect(
                //     x * this.charWidth + this.offsetX,
                //     y * this.charHeight + this.offsetY,
                //     this.charWidth,
                //     this.charHeight
                // )

                if (this.screen[y][x].value > 0) {

                    // this.ctx.drawImage(
                    //     fonts[0],
                    //     9, 32,
                    //     // getCharPosX(this.screen[y][x]) * 9,
                    //     // getCharPosY(this.screen[y][x]) * 16,
                    //     9,
                    //     16,
                    //     x * this.charWidth + this.offsetX,
                    //     y * this.charHeight + this.offsetY,
                    //     this.charWidth,
                    //     this.charHeigh
                    // )
                } else {
                    this.ctx.fillStyle = "#000000"
                    this.ctx.fillRect(
                        x * this.charWidth + this.offsetX,
                        y * this.charHeight + this.offsetY,
                        this.charWidth,
                        this.charHeight
                    )
                }
            }
        }
    }
}