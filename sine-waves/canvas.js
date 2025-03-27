const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

const gui = new dat.GUI()

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
  color: 196,
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'y', 0, window.innerHeight)
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)

const colorFolder = gui.addFolder('color')
colorFolder.add(wave, 'color', 0, 360)

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
}

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
    this.increment = wave.frequency
  }
  draw() {
    c.beginPath()
    c.moveTo(0, window.innerHeight / 2)
    for (let i = 0; i < window.innerWidth; i++) {
      c.lineTo(i, wave.y + Math.sin(i * wave.length + this.increment) * wave.amplitude)
    }
    c.strokeStyle = `hsl(${wave.color}, 76%, 30%)`
    c.stroke()
  }
  update() {
    this.increment += wave.frequency
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
  c.fillStyle = 'rgba(255, 255, 255, 0.05)'
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  lines.forEach(line => {
    line.update();
  })

}
animate();