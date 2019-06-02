// testing jump animation for hero








//CREATE SMOOTHER MOVEMENTS LEFT AND RIGHT 
// (when friction is commented out the square can move of its own)

//^in response: im going to use the rectangle's animations but my bowser's state change logic to receive move commands
















let jumping = true;
let rectW = 32;
let rectH = 32;
let rectX = 144;
let xVelocity = 0;
let rectY = 0;
let yVelocity = 0;

function setup() {
  createCanvas(320, 180);
  noStroke();
}

function draw() {
  background(0);
  fill(266, 16, 30);
  rect(rectX, rectY, rectW, rectH);

  yVelocity += 1.5; //gravity
  rectX += xVelocity;
  rectY += yVelocity;
  xVelocity *= 0.9; //friction
  yVelocity *= 0.9; //friction

  if(rectY > height - rectH - 2) {
    jumping = false;
    rectY = height-rectH - 2;
    yVelocity = 0;
  }

  if(rectX < 0 - rectW) {
    rectX = width - rectW;
  }
  if(rectX > width) {
    rectX = 1;
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    xVelocity -= 5;
  }
  if(keyCode === RIGHT_ARROW) {
    xVelocity += 5;
  }
  if(keyCode === UP_ARROW && jumping === false) {
    yVelocity -= 20;
    jumping = true;
  }
}

