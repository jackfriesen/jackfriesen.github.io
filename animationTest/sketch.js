// combining rectangle animations with bowser logic for us for final project















// make a class out of it

















let jumping = true;
let rectW = 32;
let rectH = 32;
let rectX = 144;
let xVelocity = 0;
let rectY = 0;
let yVelocity = 0;

let state = 0; // 0 = idle, 1 = right, 2 = left

function setup() {
  createCanvas(320, 180);
  noStroke();
}

function draw() {
  background(0);
  fill(266, 16, 30);
  rect(rectX, rectY, rectW, rectH);

  //animating movement commands
  yVelocity += 1.5; //gravity
  rectX += xVelocity;
  rectY += yVelocity;
  xVelocity *= 0.9; //friction
  yVelocity *= 0.9; //friction

  //dont fall through the floor
  if(rectY > height - rectH - 2) {
    jumping = false;
    rectY = height-rectH - 2;
    yVelocity = 0;
  }

  //lets rectangle teleport from one side of screen to another
  if(rectX < 0 - rectW) {
    rectX = width - rectW;
  }
  else if(rectX > width) {
    rectX = 1;
  }

  //check states
  if(state === 1) {
    right();
  }
  else if(state === 2) {
    left();
  }
}

function keyReleased() {
  state = 0;
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    state = 2;
    
  }
  if(keyCode === RIGHT_ARROW) {
    state = 1;
  }
  if(keyCode === UP_ARROW && jumping === false) {
    yVelocity -= 20;
    jumping = true;
  }
}

function left () {
  xVelocity -= 1;
}

function right () {
  xVelocity += 1;
}