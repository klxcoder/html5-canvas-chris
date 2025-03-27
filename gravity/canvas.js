const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

const mouse = {
  x: undefined,
  y: undefined,
}

const MAX_RADIUS = 40
const MIN_RADIUS = 2

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

window.addEventListener('click', () => {
  init()
})

class Circle {
  constructor() {
    this.radius = Math.random() * 20 + 1;
    this.minRadius = this.radius;
    this.x = Math.random() * (window.innerWidth - 2 * this.radius) + this.radius;
    this.y = Math.random() * (window.innerHeight - 2 * this.radius) + this.radius;
    this.dx = Math.random() * 2;
    this.dy = Math.random() * 8;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.friction = 0.95;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
  }
  update() {
    if (this.x + this.radius > window.innerWidth) {
      this.dx = -Math.abs(this.dx) * this.friction;
    } else if (this.x - this.radius < 0) {
      this.dx = Math.abs(this.dx) * this.friction;
    }
    if (this.y + this.radius > window.innerHeight) {
      this.dy = -Math.abs(this.dy) * this.friction;
    } else if (this.y - this.radius < 0) {
      this.dy = Math.abs(this.dy) * this.friction;
    } else {
      this.dy += 0.1;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circles = []

function init() {
  circles = Array(100).fill(true).map(() => new Circle())
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