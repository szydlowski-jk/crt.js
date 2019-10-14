'use strict'

const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')

window.setInterval(loop, 1000/60)

gc.width = gc.clientWidth
gc.height = gc.clientHeight

ctx.fillStyle = "#ff00ff"
ctx.fillStyle = "#000"
ctx.fillRect(0, 0, gc.width, gc.height)

ctx.imageSmoothingEnabled = false

let crt = new Crt(ctx)
// setInterval(crt.nextSecond, 1000)

let x = 0
let y = 0


crt.debugScreenPattern2()


let i = 0
function loop () {
//   crt.setChar(x, y, 0)
    // x += 1
    // if (x > crt.width-1) {
    //     x = 0
    //     y += 1
    // }
    // if ( y > crt.height-1) {
    //     y = 0
    // }
    // crt.setChar(x, y, 254)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screen[Math.floor(Math.random() * 25)][Math.floor(Math.random() * 80)].value = Math.floor(Math.random() * 255)
    crt.screenFade(1)

    crt.clearScreen()
    crt.drawScreen()

}
