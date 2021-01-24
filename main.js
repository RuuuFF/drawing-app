const canvas = document.getElementById('canvas')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')
const ctx = canvas.getContext('2d')

let size = 10
let color = 'black'
let x
let y
let isPressed = false

canvas.addEventListener('mousedown', (event) => {
  isPressed = true
  
  x = event.offsetX
  y = event.offsetY
})

canvas.addEventListener('mouseup', (event) => {
  isPressed = false
  
  x = undefined
  y = undefined
})

canvas.addEventListener('mousemove', (event) => {
  if(isPressed) {
    const x2 = event.offsetX
    const y2 = event.offsetY
    
    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)
    
    x = x2
    y = y2
  }
})

function drawCircle(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()
}

function updateSizeOnScreen() {
  sizeEl.innerText = size
}

increaseBtn.addEventListener('click', () => {
  size += 5
  size > 50 ? size = 50 : size
  updateSizeOnScreen()
})

decreaseBtn.addEventListener('click', () => {
  size -= 5
  size < 5 ? size = 5 : size
  updateSizeOnScreen()
})

colorEl.addEventListener('change', (e) => color = e.target.value)

clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))


// ===== MOBILE =====
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault()
  x = Math.ceil(event.touches[0].pageX) - event.target.offsetLeft
  y = Math.ceil(event.touches[0].pageY) - event.target.offsetTop
})

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault()
  x2 = Math.ceil(event.touches[0].pageX) - event.target.offsetLeft
  y2 = Math.ceil(event.touches[0].pageY) - event.target.offsetTop
  
  drawCircle(x2, y2)
  drawLine(x, y, x2, y2)
  
  x = x2
  y = y2
})

function setCanvasWidth() {
  let screenWidth = document.body.clientWidth
  
  let canvasWidth = 90 * screenWidth / 100
  
  canvasWidth > 800 ? canvasWidth = 800 : canvasWidth
  
  screenWidth < 580 ? size = 5 : size
  updateSizeOnScreen()
  
  canvas.width = canvasWidth
  canvas.height = canvasWidth
}

window.addEventListener('load', setCanvasWidth)