


function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  drawFrameOne();
  drawFrameTwo();
}

function drawFrameOne() {

  push();
  strokeWeight(5);
  rect(5, 5, width / 2 - 10, height / 2 - 10);
  pop();

  
}

function drawFrameTwo() {
  push();
  strokeWeight(3);
  translate(width / 2, 5);
  rect(0, 0, width /4, height/ 4);
  pop();

}