//Black and White Target

const X_POS = 200;
const Y_POS = 200;
const NUM_CIRC = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  drawTarget();
}

//draw a black and white target
function drawTarget() {
  let circleSize = 400;
  
  //draw circles of decreasing size
  for (let i = 0; i < NUM_CIRC; i++) {
    ellipse(X_POS, Y_POS, circleSize, circleSize);
    circleSize -= 40;
  }
}