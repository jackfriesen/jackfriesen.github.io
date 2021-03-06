//Sprite Animation
//Jack F


//universal vars
let imgArray = [];
let x;
let y;
let state = 0; //0 - idle 1 - right 2 - left 3 - up 4 -down
let backwardsForwards;

//vars for idle states
let idleIndex = 8;
let idleCounter = 0;

//vars for right states
let rightIndex = 0;
let rightCounter = 0;

//vars for left states
let leftIndex = 4;
let leftCounter = 0;

//vars for up states
let upIndex = 12;
let upCounter = 0;

//vars for down states
let downIndex = 16;
let downCounter = 0;







//load images
function preload() {
  //load right states
  for (let i = 0; i < 4; i++) {
    imgArray.push(loadImage("assets/Bowser_right" + i + ".png"));
  }
  //load left states
  for (let j = 4; j < 8; j++) {
    imgArray.push(loadImage("assets/Bowser_left" + j + ".png"));
  }
  //load idle states
  for (let k = 8; k < 12; k++) {
    imgArray.push(loadImage("assets/Bowser_idle" + k + ".png"));
  }
  //load up states
  for (let l = 12; l < 16; l++) {
    imgArray.push(loadImage("assets/Bowser_up" + l + ".png"));
  }
  //load down states
  for (let m = 16; m < 20; m++) {
    imgArray.push(loadImage("assets/Bowser_down" + m + ".png"));
  }

}

//create canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
}

//animate bowser
function draw() {
  background(220, 0, 100);

  //cycle through states
  if (state === 2) {
    left();
    x -= 2;
  }
  else if (state === 1) {
    right();
    x += 2;
  }
  else if (state === 0) {
    idle();
  }
  else if (state === 3) {
    up();
    y -= 2;
  }
  else if (state === 4) {
    down();
    y += 2;
  }

}

function keyReleased() {
  state = 0;
}

function keyPressed() {
  //go right
  if (keyCode === RIGHT_ARROW) {
    state = 1;
  }

  //go left
  if (keyCode === LEFT_ARROW) {
    state = 2;
  }

  //go down
  if (keyCode === DOWN_ARROW) {
    state = 4;
  }

  //go up
  if (keyCode === UP_ARROW) {
    state = 3;
  }


}

//cycle through up states
function up() {
  image(imgArray[upIndex], x, y);

  //change costume every 20 frames
  if (upCounter % 20 === 0) {
    upIndex++;
  }

  //loop back to start of up costumes
  if (upIndex > 15) {
    upIndex = 12;
  }

  upCounter++;
}

function down() {
  image(imgArray[downIndex], x, y);

  //change costume every 20 frames
  if (downCounter % 20 === 0) {
    downIndex++;
  }

  //loop back to start of idle costumes
  if (downIndex > 19) {
    downIndex = 16;
  }

  downCounter++;
}

//cycle through left states
function left() {
  image(imgArray[leftIndex], x, y);

  //change costume every 20 frames
  if (leftCounter % 20 === 0) {
    leftIndex++;
  }

  //loop back to start of idle costumes
  if (leftIndex > 7) {
    leftIndex = 4;
  }

  leftCounter++;
}

//cycles through right states
function right() {
  image(imgArray[rightIndex], x, y);

  //change costume every 20 frames
  if (rightCounter % 20 === 0) {
    rightIndex++;
  }

  //loop back to start of right costumes
  if (rightIndex > 3) {
    rightIndex = 0;
  }

  rightCounter++;
}

//cycles through idle states
function idle() {
  image(imgArray[idleIndex], x, y);

  //change costume every 20 frames
  if (idleCounter % 20 === 0) {
    idleIndex++;
  }

  //loop back to start of idle costumes
  if (idleIndex > 11) {
    idleIndex = 8;
  }

  idleCounter++;
}