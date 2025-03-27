const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

//
// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'rgba(0, 0, 255, 0.5)'
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)'
// c.fillRect(300, 300, 100, 100)

// // Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false)
// c.strokeStyle = 'blue'
// c.stroke();

// for (let i = 0; i < 3; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = 'blue'
//   c.stroke();
// }

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

class Circle {
  constructor() {
    this.radius = Math.random() * 20 + 1;
    this.minRadius = this.radius;
    this.x = Math.random() * (window.innerWidth - 2 * this.radius) + this.radius;
    this.y = Math.random() * (window.innerHeight - 2 * this.radius) + this.radius;
    this.dx = 0;
    this.dy = Math.random() * 8;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy * 0.5;
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