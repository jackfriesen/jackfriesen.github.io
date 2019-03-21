//Sprite Animation

let imgArray = [];
let idleState = true;
let idleCount = 0;
let idleCounter = 1;



//load images
function preload() {
  //load right states
  for (let i = 0; i < 4; i++) {
    imgArray.push(loadImage("assets/Bowser_right" + i + ".png"));
  }
  //load left states
  for (let j = 4; j < 8; j++) {
    let img1 = loadImage("assets/Bowser_left" + j + ".png");
    imgArray.push(img1);
  }
  //load idle states
  for (let k = 8; k < 12; k++) {
    let img2 = loadImage("assets/Bowser_idle" + k + ".png");
    imgArray.push(img2);
  }
}

//create canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //cycle through idle states
  if (idleState) {
    idle();
  }
}

function idle() {

}