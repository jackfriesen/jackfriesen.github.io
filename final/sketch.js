// Final
//puzzle/platformer
//game is meant to be played on devices with a resolution of 1600 x 789 or higher

//new laptop resolution is 981x754








//COMBINE BOWSER AND RECTANGLE ANIMATIONS 
//-use rectangle animation but use bowsers state cycle so that states are changed and functions are 
//called in keyPressed rather than calling code when the key is pressed





























//universal vars
let platformImg = [];
let platforms = [];
let hit = false;
let imgArray = [];
let platformX = [];
let platformY = [];
let platX, platY, platW, platH;

let count = 0;


function preload() {
  platformImg.push(loadImage("assets/platform.png"));
  platformImg.push(loadImage("assets/platform_up.png"));

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

function setup() {
  createCanvas(1600, 789);
  loadLevelOne();
}

//load level environs into their respective arrays and position characters
function loadLevelOne() {
  //intialize hero location
  x = 3;
  y = height - 62;

  //load bottom floor
  platX = 0;
  platY = height - 15;
  
  for (let i = 0; i < 9; i++) {
    platforms.push(new HorizontalPlatform(platX, platY));
    platformX.push(platX);
    platformY.push(platY);
    platX += 180;
  }
  //load right wall
  platX = width - 15;
  platY = height - 150;
  platforms.push(new VerticalPlatform(platX, platY)); //wall
  platformX.push(platX);
  platformY.push(platY);
}

function draw() {
  background(0);
  // hit = collideRectRect(0, height -15, 180, 15, x, y, 55, 58);
  // print(hit);

  //create level one
  levelOne();

  //for Hero Animation
  stateCycle();

  //check for collisions
  collide();
}

//check for collisions
function collide() {
  for (let i = 0; i < platforms.length; i++) {
    platW = platforms[i].getWidth();
    platH = platforms[i].getHeight();

    hit = collideRectRect(x, y, 55, 58, platformX[i], platformY[i], platW, platH);
    if (hit) {
      //print(hit, count);
    }
    count++;
  }
}

//display level one
function levelOne() {
  //bottom floor
  for (let i = 0; i < 9; i++) {
    platforms[i].display();
  }

  //second floor and walls
  platforms[9].display();
  //for(data to create second floor) {
  //
  //}
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





//CHARACTERS//
//************************************************************************************************************************************************************************//



//HERO ANIMATIONS//
//*****************//

//adjustable variables for hero x and y position
let x;
let y;

//state variable to dictate which animation is used based on the key pressed
let state = 0; //0 - idle 1 - right 2 - left 3 - up 4 -down

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

//cycle through upwards-facing states
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

//cycle through downwards-facing animation states
function down() {
  image(imgArray[downIndex], x, y);

  //change costume every 20 frames
  if (downCounter % 20 === 0) {
    downIndex++;
  }

  //loop back to start of downwards-facing costumes
  if (downIndex > 19) {
    downIndex = 16;
  }
  downCounter++;
}

//cycle through left-facing animation states
function left() {
  image(imgArray[leftIndex], x, y);

  //change costume every 20 frames
  if (leftCounter % 20 === 0) {
    leftIndex++;
  }

  //loop back to start of left-facing costumes
  if (leftIndex > 7) {
    leftIndex = 4;
  }
  leftCounter++;
}

//cycles through right-facing animation states
function right() {
  image(imgArray[rightIndex], x, y);

  //change costume every 20 frames
  if (rightCounter % 20 === 0) {
    rightIndex++;
  }

  //loop back to start of right-facing costumes
  if (rightIndex > 3) {
    rightIndex = 0;
  }
  rightCounter++;
}

//cycles through idle animation states
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

//check movement animation state and move character accordingly
function stateCycle() {
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

//*************************************************************************************************************************************************************************//








//CLASSES//
//**************************************************************************************************************************************************************************//

//playable hero character
class Hero {

}

//horizontal platform object for level building
class HorizontalPlatform {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = platformImg[0].width;
    this.h = platformImg[0].height;
  }

  //Class Methods
  display() {
    image(platformImg[0], this.x, this.y);
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }
}

//vertical platform object for level building
class VerticalPlatform {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = platformImg[1].width;
    this.h = platformImg[1].height;
  }

  //Class Methods
  display() {
    image(platformImg[1], this.x, this.y);
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }
}

//************************************************************************************************************************************************************************//