'use strict'

document.title = "WebGL"

const gc = document.getElementById('gc')
const gl = gc.getContext('webgl')

if ( gl === null ) {
    alert ( "No WebGL!")
}

gc.width = gc.clientWidth
gc.height = gc.clientHeight


window.onload = main
//window.setInterval(loop, 1000/60)

const vertexShader = `
    attribute vec4 aVertexPosition;

    void main () {
        gl_Position = aVertexPosition;
    }
`

const fragmentShader = `
    void main () {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`

function loadShader (gl, type, source) {
    const shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader ", type, " compile failed")
        gl.deleteShader(shader)
        return null
    }

    return shader
}

function makeProgram (gl, vertex, fragment) {
    const vShader = loadShader(gl, gl.VERTEX_SHADER, vertex)
    const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fragment)

    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vShader)
    gl.attachShader(shaderProgram, fShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert ("Program not linked")
        gl.deleteProgram(shaderProgram)
        return null
    }

    return shaderProgram
}

let programInfo

function main () {
    gl.clearColor(0.3, 0.3, 0.3, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    let shaderProgram = makeProgram(gl, vertexShader, fragmentShader)
    programInfo = {
        program: shaderProgram,
        atributes: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
        },
        uniforms: {

        }
    }



}
