// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x=45;
let xSpeed=6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(255);
  fill('red');
  ellipse(x, 200, 125);
  fill(0);
  rect(mouseX, 400, 75, 75);

  x+=xSpeed;
  if(x>windowWidth) x=-30;
}
