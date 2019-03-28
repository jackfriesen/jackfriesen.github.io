//refactor exercise 1

let xPos;
let yPos;
let xSpeed;
let ySpeed;

//create canvas and give variables values
function setup() {
  createCanvas(windowWidth, windowHeight);

  xPos = 200;
  yPos = 300;
  xSpeed = random(3, 8);
  ySpeed = random(3, 8);
}

function draw() {
  background(80, 80, 80);
  move();
  rect(xPos, yPos, 250, 75);
}

//adjust rectangle variables so 
//it moves around when drawn
function move() {
  xPos += xSpeed; 
  yPos += ySpeed;
  if (yPos >= height - 75 || yPos <= 0) { 
    ySpeed = ySpeed * -1; 
  }
  if (xPos >= width - 250 || xPos <= 0) { 
    xSpeed = xSpeed * -1; 
  }
}