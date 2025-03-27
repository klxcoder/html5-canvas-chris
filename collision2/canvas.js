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
    this.velocity = {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
    }
    this.mass = 1;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  }
}

function getRandomInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

let circles = []

function init() {
  circles = []
  n = 10;
  while (n--) {
    m = 100 // prevent infinitive loop
    while (m--) {
      const radius = 100;
      x = getRandomInt(radius, window.innerWidth - radius)
      y = getRandomInt(radius, window.innerHeight - radius)
      const circle = new Circle(x, y, radius, 'black')
      collision = false
      for (let c of circles) {
        if (isCollision(c, circle)) {
          collision = true
          break
        }
      }
      if (collision) {
        continue
      }
      circles.push(circle)
      break
    }
  }
}

init()

function getDistance(circle1, circle2) {
  let dx = circle1.x - circle2.x
  let dy = circle1.y - circle2.y
  return Math.sqrt(dx * dx + dy * dy)
}

function isCollision(circle1, circle2) {
  return getDistance(circle1, circle2) < circle1.radius + circle2.radius
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < circles.length; i++) {
    const circle1 = circles[i]
    for (let j = i + 1; j < circles.length; j++) {
      const circle2 = circles[j]
      if (isCollision(circle1, circle2)) {
        resolveCollision(circle1, circle2)
      }
    }
    circle1.update();
  }
}
animate();