// Final
//puzzle/platformer
//game is meant to be played on devices with a resolution of 1600 x 789 or higher


//TO DO 
//REMOVE FIXED VALUES AND BASE THIS OFF OF MATH WITH WIDTH AND HEIGHT (width / 2 instead of 100px)
//create hitboxes on underside of floating platforms to prevent hero from teleporting to the top of them


//universal vars
let platforms;
let hit = false;
let count = 0; //just a var for checking console printing, can be deleted when program is complete
let myFont;
let contact = true;
let currPlatY;


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
  currPlatY = height - 35; //NEED THIS FOR SQUARE TO ADJUST TO PLATFORM HEIGHT
}

function draw() {
  background(220);
  tutorial();
  animateHero();
  collisionCheck();
}

//loop through platforms array and check if hero is touching any platforms
//then update state variables based on answer. "hit" is only used locally 
//to change "contact" which is used globally. contact can be found in 
//animateHero() and is used to stop hero from falling through floor and
//also to make hero fall if there isnt a floor. it can also be found in
//keyPressed() when the up arrow is pressed to allow the hero to jump
function collisionCheck() {
  for (let i = 0; i < platforms.length; i++) {
    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hit = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY(), platforms[i].getW(), 1);

    if(hit) {
      contact = true;
      currPlatY = platforms[i].getY();
    }
  }
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
    contact = false; 
  }
}

function animateHero() {
  //draw hero
  push();
  fill(255, 0, 0);
  noStroke();
  rect(rectX, rectY, rectW, rectH);
  pop();

  //animating movement commands
  rectX += xVelocity;
  rectY += yVelocity;
  xVelocity *= 0.9; //friction
  yVelocity *= 0.9; //friction

  //dont fall through the floor
  if (contact) {
    jumping = false;
    rectY = height - rectH - (height - currPlatY);
    yVelocity = 0;
    contact = false;
  }
  //keep falling if not touching floor
  else {
    yVelocity += 1.7; //gravity
  }

  //check states
  if (state === 1) {
    xVelocity += 1; //go right
  }
  else if (state === 2) {
    xVelocity -= 1; //go left
  }
}



//TUTORIAL LEVEL//
//***************************************************************************************************************************************************************************//

//show tutorial environment
function tutorial() {
  loadTutorial();
  instructions();

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }
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
  platforms.push(new Platform(width / 1.7 + 150, height - 35, 1000, 15));
  platforms.push(new Platform(1200, 700, 200, 15));
}

//displays instructions on screen for user to learn to play game
function instructions() {
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
  rect(575, height - 240, 30, 30);
  rect(535, height - 280, 30, 30);
  fill(255);
  triangle(497, height - 225, 520, height - 238, 520, height - 212);
  triangle(600, height - 225, 577, height - 238, 577, height - 212);
  triangle(537, height - 252, 563, height - 252, 550, height - 278);
  pop();
}


//***************************************************************************************************************************************************************************//

//CLASSES//
//**************************************************************************************************************************************************************************//

//playable hero character
class Hero {
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
  }
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

  getW() {
    return this.w;
  }

  getH() {
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