'use strict'

class CrtObj {
    constructor ( width, height, fill = " ", color = 0) {
        this.width = width || 80
        this.height = height || 25
        this.ctx = null

        this.chars = []
        for ( let y = 0; y < this.height; y++ ) {
            let row = []
            for ( let x = 0; x < this.width; x++ ) {
                let c = new Char(fill.charCodeAt(0), color)
                row.push(c)
            }
            this.chars.push(row)
        }
    }

    setCtx ( ctx ) {
        if ( ctx != this.ctx ) {
            console.log('New context')
            this.resize()
        } else {
            console.log('Trying to set context that is already set')
        }
    }

    resize () {
        let maxCharWidth = ctx.canvas.width / this.width
        let maxCharHeight = ctx.canvas.height / this.height

        if (maxCharHeight / this.charRatio > maxCharWidth) {
            this.charWidth = Math.floor(maxCharWidth)
            this.charHeight = Math.floor(this.charWidth * this.charRatio)

        } else {
            this.charHeight = Math.floor(maxCharHeight)
            this.charWidth = Math.floor(this.charHeight / this.charRatio)
        }
        this.offsetX = Math.floor((ctx.canvas.width - this.charWidth * this.width) / 2)
        this.offsetY = Math.floor((ctx.canvas.height - this.charHeight * this.height) / 2)
    }

    ctxDraw () {

    }

    addChild ( crtobj ) {

    }

    removeChild ( crtobj ) {

    }
}