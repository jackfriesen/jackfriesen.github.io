// my first mobile game

let x ;
let xSpeed = 0;
let y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = height / 3;
  x = width / 2;
}

function draw() {
  background(0);
  fill(255);
  text(accelerationX, width / 2, height / 2);
  accelerationX = 0;
  if(accelerationX > 0) {
    x += 3;
  }
  else if(accelerationX < 0) {
    x -= 3;
  }

  if(x > width) {
    x = 0;
  }
  else if (x < 0) {
    x = width - 50;
  }

  rect(x, y, 50, 50);
}
