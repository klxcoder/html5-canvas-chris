const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d')

//
c.fillStyle = 'rgba(255, 0, 0, 0.1)'
c.fillRect(100, 100, 100, 100)
c.fillRect(400, 100, 100, 100)
c.fillRect(300, 300, 100, 100)

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = '#fa34a3';
c.stroke();