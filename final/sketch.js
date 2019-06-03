// Final
//puzzle/platformer


//TO DO
//
//collisions on sides of platforms
//
//respawn function with level reload, character respawn and death animation, bad guy reset
//-make level variable that tracks the level user is on so computer knows which respawn function to call




//universal vars
let platforms;
let count = 0; //just a var for checking console printing, can be deleted when program is complete
let myFont;
let currPlatY;
let currPlatH;


//hero animation vars
let jumping = true;
let rectW = 32;
let rectH = 32;
let rectX, rectY;
let xVelocity = 0;
let yVelocity = 0;
let state = 0; // 0 = idle, 1 = right, 2 = left
let hitTop = false;
let contactTop = false;
let hitBottom = false;
let contactBottom = false;

function preload() {
  myFont = loadFont("assets/guilin.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //currPlatY = height - 35; //NEED THIS FOR SQUARE TO ADJUST TO PLATFORM HEIGHT
  //initialize hero spawn location
  rectY = height - height / 4;
  rectX = width / 20;
}

function draw() {
  background(220);
  tutorial();
  animateHero();
  collisionCheck();
}

//loop through platforms array and check if hero is touching any platforms
//then update state variables based on answer. "hit" is only used locally 
//to change "contactTop" which is used globally. contactTop can be found in 
//animateHero() and is used to stop hero from falling through floor and
//also to make hero fall if there isnt a floor. it can also be found in
//keyPressed() when the up arrow is pressed to allow the hero to jump
function collisionCheck() {
  //checks top of platform
  for (let i = 0; i < platforms.length; i++) {
    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hitTop = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY(), platforms[i].getW(), 1);

    if (hitTop) {
      contactTop = true;
      currPlatY = platforms[i].getY();
    }
  }

  //checks bottom of platform
  for (let i = 0; i < platforms.length; i++) {
    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hitBottom = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY() + platforms[i].getH(), platforms[i].getW(), 1);

    if (hitBottom) {
      contactBottom = true;
      currPlatY = platforms[i].getY();
      currPlatH = platforms[i].getH();
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
    yVelocity -= 18;
    jumping = true;
    contactTop = false;
  }
}

function animateHero() {
  //draw hero
  push();
  fill(255, 0, 0);
  noStroke();
  rect(rectX, rectY, rectW, rectH);
  pop();

  //bounce off underside of platforms
  //NEEDS to be above animating move commmands
  if (contactBottom) {
    rectY = height - (height - currPlatY) + currPlatH + 1; //et height to 1px below underside of platform
    yVelocity = 0; //set velocity to 0 to apply gravity
    yVelocity += 1.7; //apply gravity
    contactBottom = false; //tell computer it isn't touching bottom of platform so it has time to fall
  }

  //animating movement commands
  rectX += xVelocity;
  rectY += yVelocity;
  xVelocity *= 0.9; //friction

  //dont fall through the floor if touching it
  if (contactTop) {
    jumping = false;
    rectY = height - rectH - (height - currPlatY);
    yVelocity = 0;
    contactTop = false;
  }
  //keep falling if not touching floor
  else {
    yVelocity += 1.7; //gravity
  }

  //check states for left and right movement
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

  //display platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }
}

//load tutorial environment into array
function loadTutorial() {
  //empties platform for level reload
  platforms = [];

  //bottom floor
  platforms.push(new Platform(0, height - 35, width / 1.7, 15));
  platforms.push(new Platform(width / 1.7 + 150, height - 35, width / 1.7, 15));
  platforms.push(new Platform(width / 1.3, height - 100, 200, 15));
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

  //"this is you" and arrow
  text("This is you", width / 15, height - 180);
  line(width / 25, height - 165, width / 18, height - 115);
  triangle(width / 20, height - 110, width / 17, height - 120, width / 17, height - 100);

  //use the arrow keys to move" and buttons
  text("Use the arrow keys to move!", width / 3, height - 180);
  rect(width / 3 - 50, height - 240, 30, 30);
  rect(width / 3 + 50, height - 240, 30, 30);
  rect(width / 3, height - 280, 30, 30);
  fill(255);
  triangle(width / 3 - 48, height - 225, width / 3 - 22, height - 238, width / 3 - 22, height - 212);
  triangle(width / 3 + 78, height - 225, width / 3 + 52, height - 238, width / 3 + 52, height - 212);
  triangle(width / 3 + 2, height - 252, width / 3 + 28, height - 252, width / 3 + 15, height - 278);
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