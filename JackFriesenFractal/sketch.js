// Fractal

let r;
let g;
let b; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0);
  drawFractal(width / 2, height * 0.02, height * 0.9, width * 0.9);
}

function drawFractal(x1, y1, armLength, baseLength) {
  
  
  if (armLength > height * 0.35) {
    let x2 = x1 - baseLength / 2;
    let y2 = y1 + armLength;
    let x3 = x1 + baseLength / 2;
    let y3 = y1 + armLength;
    triangle(x1, y1, x2, y2, x3, y3);
    drawFractal(x1, y1 * 1.5, armLength * 0.9, baseLength * 0.9);
    drawFractal(x1, y1 * 1.51, armLength * 0.91, baseLength * 0.91);
  }
}