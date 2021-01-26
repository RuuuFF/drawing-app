const toolBox = document.querySelector('.toolbox')
const increaseBtn = document.getElementById('increase')
const decreaseBtn = document.getElementById('decrease')
const sizeEl = document.getElementById('size')
const colorEl = document.getElementById('color')
const clearEl = document.getElementById('clear')


// Pega o elemento com id "canvas" no documento HTML
const canvas = document.getElementById('canvas')
// Ontem o contexto de renderização (2d) e suas funções de desenho
const ctx = canvas.getContext('2d')


// Define o tamanho padrão como 10
let size = 10
// Cor padrão como "black"
let color = 'black'
// Declarando "x" e "y"
let x
let y
// "isPressed" muda seu valor quando o usuário pressiona a tecla do mouse (quando segura = true | quando solta = false (false por padrão))
let isPressed = false


// Adiciona um ouvidor de evetos do tipo "mousedown" em "canvas" (quando o usuário clica e segura ele fica ativo)
canvas.addEventListener('mousedown', (event) => {
  // Define "isPressed" como true
  isPressed = true
  
  // Pega as coordenadas de onde o evento ocorreu e armazena o "offsetX" em "x" e "offsetY" em "y"
  x = event.offsetX
  y = event.offsetY
})


// Adiciona um ouvidor de eventos do tipo "mouseup" em canvas (quando o usuário pressiona o botão do mouse e é ativado quando solta)
canvas.addEventListener('mouseup', (event) => {
  // Define "isPressed" como "false"
  isPressed = false
  
  // Define "x" e "y" como "undefined"
  x = undefined
  y = undefined
})


// Adiciona um ouvidor de eventos do tipo "mousemove" em canvas (é ativo com a movimentação do mouse do usuário)
// Durante o desenho, o evento é chamado várias vezes
canvas.addEventListener('mousemove', (event) => {
  // Se "isPressed" for "true", ele entra
  // O usuário precisa clica ("mousedown", o que muda "isPressed" para "true"), se ele segurar, o evento "mousemove" consegue prosseguir com as instruções do seu bloco. E quando solto ("mouseup"), "ispressed" volta seu valor para "false"
  // "isPressed" é importante para que não fique chamando a função (desenhando) sem que o usuário clique na tela antes.
  if(isPressed) {
    // Salva as coordenadas x e y do evento em "x2" e "y2"
    const x2 = event.offsetX
    const y2 = event.offsetY
    
    // Chama a função "drawCircle" passando "x2" e "y2"
    // Coordenadas de onde o círculo será posicionado
    drawCircle(x2, y2)
    // Chama a função "drawLine" passando "x", "y", "x2", "y2"
    // Os valores iniciais em "x" e "y" são os do evento "mousedown"
    // Os dois primeiros parâmetros são a posição de início e os dois finais são onde a linha termina
    drawLine(x, y, x2, y2)
    
    // Atribui a "x" o valor em "x2" e atribui a "y" o valor em "y2"
    x = x2
    y = y2
  }
})


// Função "drawCircle"
function drawCircle(x, y) {
  // Inicia um caminho ou redefine o caminho atual (path = caminho)
  ctx.beginPath()
  
  // Cria um arco / curva (usado para criar círculos ou partes de círculos)
  // x e y = coordenadas
  // size = raio
  // 0 e Math.PI * 2 = angulo inicial e angulo final
  ctx.arc(x, y, size, 0, Math.PI * 2)
  // Define (também retorna) a cor para preencher o desenho (aceita gradientes ?)
  ctx.fillStyle = color
  // Preenche o desenho atual (path)
  ctx.fill()
}


// Função "drawLine"
function drawLine(x1, y1, x2, y2) {
  // Inicia um caminho ou redefine o caminho atual (path = caminho)
  ctx.beginPath()
  // Move o caminho (path) para o ponto especificado na tela, sem criar uma linha
  ctx.moveTo(x1, y1)
  // Adiciona um novo ponto e cria uma linha para esse ponto a partir do último ponto especificado na tela (moveTo)
  ctx.lineTo(x2, y2)
  // Define (ou retorna) a cor usada para traços (aceita gradientes ?)
  ctx.strokeStyle = color
  // Define (ou retorna) a largura da linha
  ctx.lineWidth = size * 2
  // Desenha o caminho que você definido em "moveTo" e "lineTo"
  ctx.stroke()
}


// Função "updateSizeOnScreen"
function updateSizeOnScreen() {
  // Pega o elemento "sizeEl" e atribui seu texto com o valor em "size"
  sizeEl.innerText = size
}


// Adiciona um ouvidor de eventos do tipo "click" em "increaseBtn"
increaseBtn.addEventListener('click', () => {
  // Incrementa "size" em 5 (+5)
  size += 5
  // "size" é maior que 50? Se sim, size volta para 50, senão, mantém o valor incrementado
  size > 50 ? size = 50 : size
  // Chama a função "updateSizeOnScreen" para atualizar o tamanho da linha
  updateSizeOnScreen()
})


// Adiciona um ouvidor de eventos do tipo "click" em "decreaseBtn"
decreaseBtn.addEventListener('click', () => {
  // Decrementa "size" em 5 (-5)
  size -= 5
  // "size" é menor que 5? Se for, "size" retorna seu valor para 5, senão, mantém o valor decrementado
  size < 5 ? size = 5 : size
  // Chama a função "updateSizeOnScreen" para atualizar o tamanho da linha
  updateSizeOnScreen()
})


// Adiciona um ouvidor de evenos do tipo "change" em "colorEl" (ocorre quando o valor de um elemento for alterado)
// Pega "color" e atribui a ele o novo valor que o alvo do evento recebeu (que, no caso, é "colorEl")
colorEl.addEventListener('change', (e) => color = e.target.value)


// Adiciona um ouvidor de eventos do tipo "click" em "clearEl"
// Pega o novo contexto do canvas, utiliza a função "clearRect" para limpar o canvas todo ("0, 0" Esquerda em cima | "canvas.width, canvas.height" = Direita inferiot)
clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))



// Event "mousedown": https://www.w3schools.com/jsref/event_onmousedown.asp
// Event "mousemove": https://www.w3schools.com/jsref/event_onmousemove.asp
// Event "mouseup": https://www.w3schools.com/jsref/event_onmouseup.asp
// HTML Canvas Reference: https://www.w3schools.com/tags/ref_canvas.asp



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
  let screenHeight = document.body.clientHeight
  
  // Pegando a largura (95%) e altura (90%) do canvas baseado em "screenWidth" e "screenHeight"
  let canvasWidth = 95 * screenWidth / 100
  let canvasHeight = 90 * screenHeight / 100
  
  // Limite de 800 para a largura e altura do canvas
  canvasWidth > 800 ? canvasWidth = 800 : canvasWidth
  canvasHeight > 800 ? canvasHeight = 800 : canvasHeight
  
  // Se "screenWidth" for menor que 580, "size" = 5, senão não faz nada
  screenWidth < 580 ? size = 5 : size
  // Chama a função
  updateSizeOnScreen()
  
  // Pega a altura do elemento com a classe ".toolbox"
  // "split" transforma a string em substring e retorna um novo array. 'px' é onde queremos separar a string
  // "filter" deixa passar os arrays diferentes de vazios (com conteúdo)
  let toolBoxHeight = +getComputedStyle(toolBox).height.split('px').filter(array => array !== '')
  
  // Largura de "toolBox" como a largura de "canvasWidth" + 4px (+4 pelas bordas do canvas (2+2 (de cada lado) = 4))
  toolBox.style.width = `${canvasWidth + 4}px`
  // "canvas" não precisa ser especificado com "px", somente números
  canvas.width = canvasWidth
  canvas.height = canvasHeight - toolBoxHeight
}

window.addEventListener('load', setCanvasWidth)