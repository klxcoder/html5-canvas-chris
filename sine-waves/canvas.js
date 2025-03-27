const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

const gui = new dat.GUI()

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
}

gui.add(wave, 'y', 0, window.innerHeight)
gui.add(wave, 'length', -0.01, 0.01)
gui.add(wave, 'amplitude', -300, 300)

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
}

const COLORS = [
  "#13678A",
]

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init()
})

class Line {
  constructor() {
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  }
  draw() {
    c.beginPath()
    c.moveTo(0, window.innerHeight / 2)
    for (let i = 0; i < window.innerWidth; i++) {
      c.lineTo(i, wave.y + Math.sin(i * wave.length) * wave.amplitude)
    }
    c.strokeStyle = this.color
    c.stroke()
  }
  update() {
    this.radians += 0.05;
    this.draw();
  }
}

let lines = []

function init() {
  lines = Array(1).fill(true).map(() => new Line())
}

init()

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.08)'
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  lines.forEach(line => {
    line.update();
  })

}
animate();