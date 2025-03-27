const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

const mouse = {
  x: undefined,
  y: undefined,
}

const MAX_RADIUS = 40
const MIN_RADIUS = 30

const COLORS = [
  "#012030",
  "#13678A",
  "#45C4B0",
  "#9AEBA3",
  "#DAFDBA",
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

class Circle {
  constructor() {
    this.radius = Math.random() * 10 + 5;
    this.x = 300;
    this.y = 300;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.distance = 100;
    this.radians = 0;
  }
  draw() {
    c.beginPath();
    const x = this.x + Math.cos(this.radians) * this.distance;
    const y = this.y + Math.sin(this.radians) * this.distance;
    c.arc(x, y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
  }
  update() {
    this.radians += 0.05;
    this.draw();
  }
}

let circles = []

function init() {
  circles = Array(1).fill(true).map(() => new Circle())
}

init()

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  circles.forEach(circle => {
    circle.update();
  })

}
animate();