// Final
//puzzle/platformer
//game is meant to be played on devices with a resolution of 1600 x 789 or higher































//WATCH JUMP VID
//WHY DOESNT COLLIDE FUNCTION WORK - why are plat w and h undefined? is it because they are objects and not images????
//stop level one from looping and pushing more platforms in


























//collision function can constantly loop through platforms array
//platW = platforms[i].width;
//platH = platforms[i].height;


//collisionRectRect(x, y, 55, 58, platX, platY, platW, platH);



























//universal vars
let platformImg = [];
let platforms = [];
let hit = false;
let imgArray = [];
let platformX = [];
let platformY = [];
let platX, platY;


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
  x = width / 2;
  y = height - 60;

   platX = 0;
   platY = height - 15;

   loadLevelOne();
   print(platforms);
}

function loadLevelOne () {
  for (let i = 0; i < 9; i++) {
    platforms.push(new HorizontalPlatform(platX, platY));
    platformX.push(platX);
    platformY.push(platY);
    platX += 180;
  }
  platforms.push(new VerticalPlatform(width - 15, height - 150)); //wall
}

function draw() {
  background(0);
  //hit = collideRectRect(0, height -15, 180, 15, x, y, 55, 58);
  //print(hit);

  //create level one
  levelOne();

  //for Hero Animation
  stateCycle();

  //collide();

  rect(0, 0, 25, 25);

}

function collide() {
  for (let i = 0; i < platforms.length; i++) {
    platW = platforms[i].width;
    platH = platforms[i].height;

    print(platW, platH);
    print(platforms);

    hit = collideRectRect(x, y, 55, 58, platformX[i], platformY[i], platW, platH);
  }
}

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
  print(platformX, platformY);
  //print(hit, platformX, platformY);
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









//CLASSES//
//**************************************************************************************************************************************************************************//

class Hero {

}

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
}

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
}





//************************************************************************************************************************************************************************//








//USELESS//
//************************************************************************************************************************************************************************//






//HERO ANIMATIONS//
//*****************//

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

//cycle through down states
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

function stateCycle() {
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
//***************//
//***************//