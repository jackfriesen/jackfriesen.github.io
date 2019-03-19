//Image Demo

let lionL;
let lionR;
let direction = 1; //1 = left || 2 = right
let pinImages = [];

function preload() {
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");

  for(let i =0; i < 9; i ++){
    pinImages.push(loadImage("assets/pin-00.png"));
  }
  
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220, 0, 100);
  lions();
  image(pinImages[0], width / 2, height / 2);
}

function lions() {
  moving();
  imageMode(CENTER);
  push();
  translate(mouseX, mouseY);
  scale(0.5);
  if (direction === 1) {
    image(lionL, 0, 0);
  }
  else {
    image(lionR, 0, 0);
  }

  pop();
}

//determine the direction of mouse movement
function moving() {
  if (mouseX > pmouseX) { // moving right
    direction = 2;
  }
  else if (mouseX < pmouseX) { //moving left
    direction = 1;
  }
}