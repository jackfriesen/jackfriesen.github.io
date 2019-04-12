//Generative Art

//save();
//
//4500 x 3000 max dimensions
//
//zoom out of browser window if you can't see full image
//bc canvas is too big

let frameOneW;
let frameOneH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  frameOneW = width / 2 + 10;
  frameOneH = height / 2 + 10
}

function draw() {
  drawFrameOne();
  drawFrameTwo();
  
  
  
}

function keyPressed() {
  if (keyCode === " ") {
    save();
  }
}

function drawFrameOne() {
  push();
  strokeWeight(7);
  rect(5, 5, frameOneW, frameOneH);
  pop();
}

function drawFrameTwo() {
  push();
  strokeWeight(3);
  translate(width / 2 + 2, 3);
  rect(0, 0, width / 4, height / 4);
  pop();
}



