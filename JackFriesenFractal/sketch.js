// Fractal

//PRODUCTION RULES
//
//draw a triangle
//locate the corners of that triangle and draw smaller triangles out 
//in space lined up with the nearest base corner and the tip

let r = 255;
let g = 0;
let b = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0);
  drawFractal(width / 2, height * 0.02, height * 0.9, width * 0.9);
}

function drawFractal(x1, y1, armLength, baseLength) {
  fill(r, g, b);

  if(g === 0) {
    g = 255;
  } 
  else {
    g = 0;
  }
  
  if (armLength > height * 0.1) {
    let x2 = x1 - baseLength / 2;
    let y2 = y1 + armLength;
    let x3 = x1 + baseLength / 2;
    let y3 = y1 + armLength;
    triangle(x1, y1, x2, y2, x3, y3);
    drawFractal(x1 - baseLength/2 + baseLength * 0.2, y1 * 1.5, armLength * 0.4, baseLength * 0.4);
    drawFractal(x1 + baseLength/2 - baseLength * 0.2, y1 * 1.5, armLength * 0.4, baseLength * 0.4);
    drawFractal(x1 - baseLength/2 + baseLength * 0.2, y1 * 6, armLength * 0.4, baseLength * 0.4);
    drawFractal(x1 + baseLength/2 - baseLength * 0.2, y1 * 6, armLength * 0.4, baseLength * 0.4);
  }
}