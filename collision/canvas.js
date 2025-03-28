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
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
  }
  update() {
    this.draw();
  }
}

let circles = []

function init() {
  circle1 = new Circle(300, 300, 100, 'black')
  circle2 = new Circle(undefined, undefined, 30, 'red')
}

init()

function getDistance(circle1, circle2) {
  let dx = circle1.x - circle2.x
  let dy = circle1.y - circle2.y
  return Math.sqrt(dx * dx + dy * dy)
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  if (getDistance(circle1, circle2) < circle1.radius + circle2.radius) {
    circle1.color = 'red'
  } else {
    circle1.color = 'black'
  }
  circle2.update();
}
animate();