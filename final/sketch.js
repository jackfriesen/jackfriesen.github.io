// Final
//puzzle/platformer


//TO DO
//
//FIX GLITCH BY JUMPING UNDER DOOR
//
//make level transition animation
//in draw: if (level === 0.5)
//
//make a blackout effect for a tunnel level!
//-have a 2d array that divides the screen into a grid of v small squares like 1000 x 1000 and its all small black squares.
//make background a torchlight color and have the small black squares disappear in a ring around the hero as he moves so its like an 
//illumination effect
//
//try different custom font to see if that slows it down






let hitTop, contactTop, hitBottom, contactBottom, hitLeft, contactLeft, hitRight, contactRight, currPlatY, currPlatH, hitBad, contactBad, hitDoor; //collision checking variables
let platforms;
let count = 0; //just a var for checking console printing, can be deleted when program is complete
let myFont;
let enemies;
let respawning = true;
let enemyVertices; //bad guy hitbox vertices array
let doorVertices; //door hitbox vertices array
let door;
let halt = false;
let level = 0;



//hero animation vars
let jumping = true;
let rectW = 32;
let rectH = 32;
let rectX, rectY;
let xVelocity = 0;
let yVelocity = 0;
let state = 0; // 0 = idle, 1 = right, 2 = left

//load game font
function preload() {
  myFont = loadFont("assets/guilin.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  if(level === 0) {
    tutorial();
  }
  if(level === 1) {
    levelOne();
  }
  
  hero();
  deathCheck();
  collisionCheck();
}

//checks for collisions between hero and environs
function collisionCheck() {
  //loop through platforms array and check if hero is touching any platforms
  //then update state variables based on answer. all variants of the variable "hit" are only used locally
  //to change all variants of the variable "contact" which is used globally. contact can be found in
  //animateHero() and is used to allow hero to interact with platforms. it can also be found in
  //keyPressed() when the up arrow is pressed to allow the hero to jump

  for (let i = 0; i < platforms.length; i++) {
    //checks top of platform
    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hitTop = collideRectRect(rectX, rectY + yVelocity, rectW, rectH, platforms[i].getX(), platforms[i].getY(), platforms[i].getW(), 1);

    if (hitTop) {
      contactTop = true;
      currPlatY = platforms[i].getY();
    }

    //checks collision w bottom of platform
    hitBottom = collideRectRect(rectX, rectY + yVelocity, rectW, rectH, platforms[i].getX(), platforms[i].getY() + platforms[i].getH(), platforms[i].getW(), 1);

    if (hitBottom) {
      contactBottom = true;
      currPlatY = platforms[i].getY();
      currPlatH = platforms[i].getH();
    }

    //check collision w left side of platform
    // - 1 values attatched to second hitbox y and h values to avoid top and bottom collisions
    hitLeft = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY() + 2, 1, platforms[i].getH() - 2);

    if (hitLeft) {
      contactLeft = true;
    }

    //check collision w right side of platform
    //extra math is to move hitbox to right side of platform
    hitRight = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX() + platforms[i].getW(), platforms[i].getY() + 2, 1, platforms[i].getH() - 2);

    if (hitRight) {
      contactRight = true;
    }
  }

  //check collision with doors
  doorVertices = [];

  doorVertices.push(createVector(door.getDVX1(), door.getDVY1()));
  doorVertices.push(createVector(door.getDVX2(), door.getDVY2()));
  doorVertices.push(createVector(door.getDVX3(), door.getDVY3()));
  doorVertices.push(createVector(door.getDVX4(), door.getDVY4()));
  doorVertices.push(createVector(door.getDVX5(), door.getDVY5()));

  hitDoor = collideRectPoly(rectX, rectY, rectW, rectH, doorVertices);

  if(hitDoor) {
    level ++;
    respawning = true;
  }

}

//check if hero has done something to die and needs to respawn
function deathCheck() {
  //falling off the world
  if (rectY > height) {
    respawning = true;
  }

  //hitting a bad guy
  for (let i = 0; i < enemies.length; i++) {
    //checking collisions with hex bad guys 
    if (enemies[i].getVertices() === 6) { // we know its a hex bad guy because the number of vertices is 6
      enemyVertices = [];
      //create vectors of hexagon's x,y pairs to load into array, to coat bad guy in an invisible hitbox
      enemyVertices.push(createVector(enemies[i].getHVX1(), enemies[i].getHVY1()));
      enemyVertices.push(createVector(enemies[i].getHVX2(), enemies[i].getHVY2()));
      enemyVertices.push(createVector(enemies[i].getHVX3(), enemies[i].getHVY3()));
      enemyVertices.push(createVector(enemies[i].getHVX4(), enemies[i].getHVY4()));
      enemyVertices.push(createVector(enemies[i].getHVX5(), enemies[i].getHVY5()));
      enemyVertices.push(createVector(enemies[i].getHVX6(), enemies[i].getHVY6()));

      hitBad = collideRectPoly(rectX, rectY, rectW, rectH, enemyVertices);

      if (hitBad) {
        respawning = true;
      }
    }
  }
}

//if key released change state to 0 so nothing happens
function keyReleased() {
  state = 0;
  halt = false;
}

//receives movement commands and changes state variable accordingly
function keyPressed() {
  if (keyCode === LEFT_ARROW && !contactRight) {
    state = 2;
  }
  if (keyCode === RIGHT_ARROW && !contactLeft) {
    state = 1;
  }
  //jump animation
  if (keyCode === UP_ARROW && jumping === false) {
    yVelocity -= 18;
    jumping = true;
    contactTop = false;
  }
}

//playable hero character
function hero() {
  //draw hero
  push();
  fill(255, 0, 0);
  noStroke();
  rect(rectX, rectY, rectW, rectH);
  pop();

  //bounce off underside of platforms
  //NEEDS to be above animating move commmands
  if (contactBottom) {
    rectY = height - (height - currPlatY) + currPlatH + 1; //get height to 1px below underside of platform
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
  if (state === 1 && !contactLeft) {
    xVelocity += 1; //go right
  }
  if (state === 2 && !contactRight) {
    xVelocity -= 1; //go left
  }

  //check if running into left side of a platform
  if (contactLeft && contactTop === false) {
    xVelocity = 0;
    rectX -= 1;
    jumping = true; //need this so cant run into walls and teleport to their top
    contactLeft = false;
  }

  //check if running into left side of a platform
  if (contactRight) {
    xVelocity = 0;
    rectX += 1;
    jumping = true; //need this so cant run into walls and teleport to their top
    contactRight = false;
  }
}

function levelOne() {
  if(respawning) {
    loadLevelOne();
    respawning = false;
  }

  for(let i = 0; i < platforms.length; i ++) {
    platforms[i].display();
  }
}

function loadLevelOne() {
  rectX = 100;
  rectY = 100;
  xVelocity = 0;
  yVelocity = 0;

  platforms = [];

  platforms.push(new Platform(50, 150, 100, 100));
}




//TUTORIAL LEVEL//
//***************************************************************************************************************************************************************************//

//show tutorial environment
function tutorial() {
  if (respawning) { // only loads bad guy when reloading level so that bad guy can animate and doesnt keep being reset to start location
    loadTutorial();
    tutorialLoadEnemies();
    respawning = false;
  }
  //instructions();
  tutorialEnemies();

  //display platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  door.display();
}

//load tutorial environment into array
function loadTutorial() {

  //initialize hero spawn location
  rectY = height - height / 4;
  rectX = width / 18;

  //empties platform for level reload
  platforms = [];

  //bottom floor
  platforms.push(new Platform(0, height - 35, width / 1.7, 15));
  platforms.push(new Platform(width / 1.7 + 150, height - 35, width - (width / 1.7 + 150), 15));
  platforms.push(new Platform(width / 1.3, height - 100, 200, 15));
  platforms.push(new Platform(width / 3, height - 100, 20, 75));

  door = new Door(width / 1.3 + 100, height - 100, rectW + 10, rectH + 10);
}

//show and animate enemies on tutorial level
function tutorialEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].display();
  }
}

//reload and initiate enemies on tutorial level
function tutorialLoadEnemies() {
  enemies = [];
  //enemies.push(new HexBadGuy(width / 1.7 + 170, height - 35 - 32, width - 60, 40, 32, 65, 0, 120));
  enemies.push(new HexBadGuy(width / 1.7 + 170, height - 35 - 32, width - 60, 40, 32));

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

  //watch out for bad guys
  text("Avoid bad guys", width / 2.1, height - 50);
  triangle(width / 1.8 + 5, height - 57.5, width / 1.8 - 10, height - 65, width / 1.8 - 10, height - 50);


  //enter the door
  text("Enter for next level", width / 1.3, height - 300);
  line(width / 1.3, height - 275, width / 1.3 + 50, height - 225);
  triangle(width / 1.3 + 60, height - 210, width / 1.3 + 40, height - 220, width / 1.3 + 55, height - 235);

  //use the arrow keys to move" and buttons
  text("Use the arrow keys to move", width / 3, height - 180);
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

//makes a basic bad guy
class HexBadGuy {
  //Constructor and Class Properties
  constructor(xR1_, y_, xR2_, w_, h_) {
    this.xRangeLeft = xR1_; //must be leftmost x value in movement range
    this.xRangeRight = xR2_; //must be rightmost x value in movement range
    this.x = xR1_ + 10; //bad guy's variable x position
    this.xVelocity = 3;
    this.y = y_; //most be lower y value
    this.w = w_;
    this.h = h_;
  }

  //Class Methods
  display() {
    //body
    push();
    fill(75, 0, 130);
    noStroke();
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.w, this.y);
    vertex(this.x + this.w + 9, this.y + this.h / 2);
    vertex(this.x + this.w, this.y + this.h);
    vertex(this.x, this.y + this.h);
    vertex(this.x - 9, this.y + this.h / 2);
    endShape();

    //yellow highlight
    // beginShape();
    // strokeWeight(1);
    // stroke(255, 255, 0);
    // vertex(this.x + 3, this.y + 3);
    // vertex(this.x + this.w - 3, this.y + 3);
    // vertex(this.x + this.w + 5, this.y + this.h / 2);
    // vertex(this.x + this.w - 3, this.y + this.h - 3);
    // vertex(this.x + 3, this.y + this.h - 3);
    // vertex(this.x - 5, this.y + this.h / 2);
    // vertex(this.x + 3, this.y + 3);
    // endShape();
    pop();
  }

  move() {
    if (this.x <= this.xRangeLeft) {
      this.xVelocity *= -1;
    }
    else if (this.x >= this.xRangeRight) {
      this.xVelocity *= -1;
    }
    this.x += this.xVelocity;
  }

  getVertices() {
    return 6;
  }

  //CLASS METHODS BELOW return vertices locations for collision check
  //starting with top left rect corner and working clockwise

  //get the top left square vertex (SV) x pos
  getHVX1() {
    return this.x;
  }

  //get the top left square vertex (SV) y pos
  getHVY1() {
    return this.y;
  }

  //get top right square vertex (SV) x pos
  getHVX2() {
    return this.x + this.w;
  }

  //get top right square vertex (SV) y pos
  getHVY2() {
    return this.y;
  }

  //get the right triangle's vertex (TV) x pos that doesnt contact rect
  getHVX3() {
    return this.x + this.w + 10;
  }

  //get the right triangle's vertex (TV) y pos that doesnt contact rect
  getHVY3() {
    return this.y + this.h / 2;
  }

  getHVX4() {
    return this.x + this.w;
  }

  getHVY4() {
    return this.y + this.h;
  }

  getHVX5() {
    return this.x;
  }

  getHVY5() {
    return this.y + this.h;
  }

  getHVX6() {
    return this.x - 10;
  }

  getHVY6() {
    return this.y + this.h / 2;
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

class Door {
  //Constructor and Class Properties
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.xBuffer = 15;
    this.yBuffer = 10;
    this.roofBuffer = 40;
    this.count = 255;
    this.countSpeed = -5;
  }

  //Class Methods

  display() {
    push();
    fill(this.count, 0, 0);
    stroke(0);
    strokeWeight(8);
    beginShape();
    vertex(this.x - this.w / 2 - this.xBuffer, this.y);
    vertex(this.x - this.w / 2 - this.xBuffer, this.y - this.h - this.yBuffer);
    vertex(this.x, this.y - this.h - this.yBuffer - this.roofBuffer);
    vertex(this.x + this.w / 2 + this.xBuffer, this.y - this.h - this.yBuffer);
    vertex(this.x + this.w / 2 + this.xBuffer, this.y);
    endShape();
    pop();

    if (this.count < 150) {
      this.countSpeed *= -1;
    }
    else if (this.count > 255) {
      this.countSpeed *= -1;
    }
    this.count += this.countSpeed;
  }

  //return bottom left vertex x pos
  getDVX1() {
    return this.x - this.w / 2 - this.xBuffer;
  }

  //bottom left y pos
  getDVY1() {
    return this.y;
  }

  //top left x pos
  getDVX2() {
    return this.x - this.w / 2 - this.xBuffer;
  }

  //top left y pos
  getDVY2() {
    return this.y - this.h - this.yBuffer;
  }

  //roof peak x pos
  getDVX3() {
    return this.x;
  }

  //roof peak y pos
  getDVY3() {
    return this.y - this.h - this.yBuffer - this.roofBuffer;
  }

  //top right x pos
  getDVX4() {
    return this.x + this.w / 2 + this.xBuffer;
  }

  //top right y pos
  getDVY4() {
    return this.y - this.h - this.yBuffer;
  }

  //bottom right x pos
  getDVX5() {
    return this.x + this.w / 2 + this.xBuffer;
  }

  //bottom right y pos
  getDVY5() {
    return this.y;
  }

}

//************************************************************************************************************************************************************************//