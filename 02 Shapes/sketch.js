// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y; 
let xSpeed;
let ySpeed;


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = width/2;
  xSpeed = random(-3, 3);
  ySpeed = random(-3, 3);
  background(0);
  noStroke();
}

function draw() {
  //background(0);
  fill(random(255), random(255), random(255));
  ellipse(x, y, 30, 30);
  x += xSpeed;
  y += ySpeed;

  if(x < 0 || x > width){
    xSpeed *= -1;
  }
  if(y < 0 || y > height){
    ySpeed *= -1;
  }
}

function mousePressed(){
  xSpeed = random(-3, 3);
  ySpeed = random(-3, 3);
}

