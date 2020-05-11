console.log("hello")

let x = 0;
const ctx = canvas.getContext('2d');
draw();
startStream();

function startStream() {
  // grab our MediaStream
  const stream = canvas.captureStream(30);
  // feed the <video>
  vid.srcObject = stream;
  vid.play();
}
function draw() {
  x = (x + 1) % (canvas.width + 50);
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x - 25, 75, 25, 0, Math.PI*2);
  ctx.fill();
  requestAnimationFrame(draw);
}