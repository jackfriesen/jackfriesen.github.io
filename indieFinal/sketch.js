// Final
//puzzle/platformer
//game is meant to be played on devices with a resolution of 1600 x 789 or higher

//new laptop resolution is 981x754

//horizontal platforms are 180x15
//vertical platforms are 15x150

//jump height is about 93.87 px
//jump distance is about 137 px


//FOR COLLISIONS
//
//check if "platforms[i].getX()" works, if not use platformsX array





























//TO DO 
//
//save tutorial creation for later!
//create collisions
//generate levels and test to see if collisions work
//create code to stop gravity if touching the floor

















//universal vars
let platforms;
let hit = false;
let platX, platY;
let count = 0;

let myFont; 

//hero animation vars
let jumping = true;
let rectW = 32;
let rectH = 32;
let rectX = 144;
let xVelocity = 0;
let rectY = 630;
let yVelocity = 0;
let state = 0; // 0 = idle, 1 = right, 2 = left

function preload() {
  myFont = loadFont("assets/guilin.ttf");
}

function setup() {
  createCanvas(1600, 789);
}

function draw() {
  background(255);
  tutorial();
  animateHero();
}

//show tutorial environment
function tutorial() {
  loadTutorial();

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  //instructions on bottom floor
  push();
  fill(0);
  strokeWeight(3);
  textSize(30);
  textFont(myFont);
  textAlign(CENTER);

  text("This is you", 120, height - 180);
  line(100, height - 165, 125, height - 115);
  triangle(110, height - 110, 140, height - 120, 130, height - 100);

  text("Use the arrow keys to move!", 550, height - 180);
  rect(495, height - 240, 30, 30);
  rect(575, height -240, 30, 30);
  rect(535, height - 280, 30, 30);
 
  fill(255);
  triangle(497, height - 225, 520, height - 238, 520, height - 212);
  triangle(600, height - 225, 577, height - 238, 577, height - 212);
  triangle(537, height - 252, 563, height - 252, 550, height - 278);


  pop();
}

//load tutorial environment into array
function loadTutorial() {

  //empties platform for level reload
  platforms = [];
  //initialize hero location
  //x = ???
  //y = ???

  //bottom floor
  platforms.push(new Platform(0, height - 35, width / 1.7, 15));
  platforms.push(new Platform (width / 1.7 + 150, height - 35, 1000, 15));
}

//if key released change state to 0 so nothing happens
function keyReleased() {
  state = 0;
}

//receives movement commands and changes state variable accordingly
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    state = 2;

  }
  if (keyCode === RIGHT_ARROW) {
    state = 1;
  }
  
  //jump animation
  if (keyCode === UP_ARROW && jumping === false) {
    yVelocity -= 25;
    jumping = true;
  }
}

function animateHero() {
  push();
  fill(255, 0, 0);
  noStroke();
  rect(rectX, rectY, rectW, rectH);
  pop();

  //animating movement commands
  yVelocity += 1.7; //gravity
  rectX += xVelocity;
  rectY += yVelocity;
  xVelocity *= 0.9; //friction
  yVelocity *= 0.9; //friction

  //dont fall through the floor
  if (rectY > height - rectH - 35) {
    jumping = false;
    rectY = height - rectH - 35;
    yVelocity = 0;
  }

  //lets rectangle teleport from one side of screen to another
  if (rectX < 0 - rectW) {
    rectX = width - rectW;
  }
  else if (rectX > width) {
    rectX = 1;
  }

  //check states
  if (state === 1) {
    xVelocity += 1; //go right
  }
  else if (state === 2) {
    xVelocity -= 1; //go left
  }
}




//CLASSES//
//**************************************************************************************************************************************************************************//

//playable hero character
class Hero {

}

// platform object for level building
class Platform {
  //Constructor and Class Properties
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
  }

  //Class Methods
  display() {
    push();
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

//************************************************************************************************************************************************************************//