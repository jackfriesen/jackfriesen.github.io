// Final
//puzzle/platformer


//level related variables
let level = 0;
let respawning = true;
let fade = 255;
let heroFade = 255;
let dying = false;

//collision checking variables
let hitTop, contactTop, hitBottom, contactBottom, hitLeft, contactLeft, hitRight, contactRight, hitBad, hitDoor, hitTrap, hitCannon;
let currPlatY, currPlatH;

//environment variables
let platforms = [];
let enemies = [];
let enemyVertices = []; //bad guy hitbox vertices array
let spikes = [];
let spikeVertices = []; //spike hitbox vertices array
let doorVertices = []; //door hitbox vertices array
let door;

//cannon animation vars
let cannons = [];
let cannonBalls = [];
let count = 0;
let collision;
let cannonTimer = 0;

//hero animation vars
let jumping = false;
let rectW = 32;
let rectH = 32;
let rectX, rectY;
let xVelocity = 0;
let yVelocity = 0;
let state = 0; // 0 = idle, 1 = right, 2 = left

//illumination vars
const NUM_COLS = 40;
const NUM_ROWS = 40;
let hiding = false;
let squares = [];
let tempSquares = [];
let illuminationCollision;


function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
}

function draw() {
  background(255);

  if (level === 0) {
    tutorial();
  }
  if (level === 1) {
    levelOne();
  }
  if (level === 2) {
    background(255, 123, 0);
    levelTwo();
  }
  if (level === 3) {
    background(255, 123, 0);
    levelFive();
  }

  collisionCheck();
  deathCheck();
  death();
}

function death() {
  if (dying) {
    xVelocity = 0;
    yVelocity = 0;
    heroFade -= 7;
  }
  if (heroFade < 0) {
    respawning = true;
    heroFade = 255;
    dying = false;
  }
}

//checks for collisions between hero and environs
function collisionCheck() {


  //check collision with doors
  doorVertices = [];
  doorVertices.push(createVector(door.getX(), door.getY() - rectH));
  doorVertices.push(createVector(door.getX(), door.getY()));
  hitDoor = collideRectPoly(rectX, rectY, rectW, rectH, doorVertices);

  if (hitDoor) {
    level++;
    respawning = true;
  }

  //loop through platforms array and check if hero is touching any platforms
  //then update state variables based on answer. "hit" is only used locally 
  //to change "contactTop" which is used globally. contactTop can be found in 
  //animateHero() and is used to stop hero from falling through floor and
  //also to make hero fall if there isnt a floor. it can also be found in
  //keyPressed() when the up arrow is pressed to allow the hero to jump
  for (let i = 0; i < platforms.length; i++) {

    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hitTop = collideRectRect(rectX, rectY + yVelocity, rectW, rectH, platforms[i].getX(), platforms[i].getY(), platforms[i].getW(), 1);
    if (hitTop) {
      contactTop = true;
      currPlatY = platforms[i].getY();
    }

    //last value is 1 so the hitbox doesn't go too deep and the hero cannot become stuck in the wall
    hitBottom = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY() + platforms[i].getH(), platforms[i].getW(), 1);
    if (hitBottom) {
      contactBottom = true;
      currPlatY = platforms[i].getY();
      currPlatH = platforms[i].getH();
    }


    // - 1 values attatched to second hitbox y and h values to avoid top and bottom collisions
    hitLeft = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY() + 2, 1, platforms[i].getH() - 2);
    if (hitLeft) {
      contactLeft = true;
    }


    //extra math is to move hitbox to right side of platform
    hitRight = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX() + platforms[i].getW(), platforms[i].getY() + 2, 1, platforms[i].getH() - 2);
    if (hitRight) {
      contactRight = true;
    }
  }

  //check cannonballs hitting platforms
  for (let i = 0; i < cannonBalls.length; i++) {
    for (let j = 0; j < platforms.length; j++) {

      hitCannon = collideRectCircle(platforms[j].getX(), platforms[j].getY(), platforms[j].getW(), platforms[j].getH(), cannonBalls[i].getX(), cannonBalls[i].getY(), cannonBalls[i].getRadius());
      if (hitCannon) {
        cannonBalls.splice(i, 1); //destroy cannonball if it hits a platform
      }
    }
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
        dying = true;
      }
    }
  }

  //hitting spikes
  for (let i = 0; i < spikes.length; i++) {
    spikeVertices = [];
    //create vectors of spike's x,y pairs to load into array, to coat the spike in an invisible hitbox
    spikeVertices.push(createVector(spikes[i].getTVX1(), spikes[i].getTVY1()));
    spikeVertices.push(createVector(spikes[i].getTVX2(), spikes[i].getTVY2()));
    spikeVertices.push(createVector(spikes[i].getTVX3(), spikes[i].getTVY3()));

    hitTrap = collideRectPoly(rectX, rectY, rectW, rectH, spikeVertices);

    if (hitTrap) {
      dying = true;
    }
  }

  //hitting cannonball
  for (let i = 0; i < cannonBalls.length; i++) {
    collision = collideRectCircle(rectX, rectY, rectW, rectH, cannonBalls[i].getX(), cannonBalls[i].getY(), cannonBalls[i].getRadius());
    if (collision) {
      dying = true;
    }
  }
}

//if key released change state to 0 so nothing happens
function keyReleased() {
  state = 0; //stop hero from continually moving
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
  if (keyCode === UP_ARROW && jumping === false && dying === false) {
    yVelocity -= 18;
    jumping = true;
    contactTop = false; // needed to allow character to jump and not be teleported to top of platform
  }
}

//playable hero character
function hero() {
  //draw hero
  push();
  fill(255, 0, 0, heroFade);
  noStroke();
  rect(rectX, rectY, rectW, rectH);
  pop();

  //bounce off underside of platforms
  //NEEDS to be above animating move commmands
  if (contactBottom) {
    rectY = height - (height - currPlatY) + currPlatH + 1; //get height to 1px below underside of platform
    yVelocity = 0; //set velocity to 0 to apply gravity
    yVelocity += 1.7; //apply gravity
    contactTop = false; // stops hero from glitching to top of platform
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
  if (contactLeft) {
    xVelocity = 0;
    rectX -= 1;
    jumping = true; //need this so cant run into walls and teleport to their top

  }

  //check if running into left side of a platform
  if (contactRight) {
    xVelocity = 0;
    rectX += 1;
    jumping = true; //need this so cant run into walls and teleport to their top

  }

  //fixes jumping into wall and becoming stuck
  if (contactLeft && contactRight) {
    for (let i = 0; i < platforms.length; i++) {
      let fixL = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX(), platforms[i].getY(), 1, platforms[i].getH());
      let fixR = collideRectRect(rectX, rectY, rectW, rectH, platforms[i].getX() + platforms[i].getW(), platforms[i].getY(), 1, platforms[i].getH());
      if (fixL || fixR) {
        if (rectX - platforms[i].getW() > rectX + platforms[i].getW()) {
          rectX = platforms[i].getX() - rectW - 1;
        }
        else {
          rectX = platforms[i].getX() + platforms[i].getW() + rectW + 1;
        }
      }
    }
  }


  contactLeft = false;
  contactRight = false;

}

//blackout screen and make illumination effect
function blackout() {
  //make all squares black
  for (let y = 0; y < squares.length; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      squares[y][x].unHide();
    }
  }

  //hide squares closer to hero
  for (let y = 0; y < squares.length; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      illuminationCollision = collideRectRect(rectX, rectY, rectW, rectH, squares[y][x].getX(), squares[y][x].getY(), squares[y][x].getW(), squares[y][x].getH());
      if (illuminationCollision) {
        squares[y][x].hide();
        squares[y + 1][x].hide();
        squares[y + 2][x].hide();
        squares[y - 1][x].hide();
        squares[y + 1][x - 1].hide();
        squares[y - 1][x - 1].hide();
        squares[y + 2][x - 1].hide();
        squares[y][x + 1].hide();
        squares[y + 1][x + 1].hide();
        squares[y - 1][x + 1].hide();
        squares[y + 2][x + 1].hide();
        squares[y + 1][x - 2].hide();
        squares[y - 1][x - 2].hide();
        squares[y + 2][x - 2].hide();
        squares[y][x + 2].hide();
        squares[y + 1][x + 2].hide();
        squares[y - 1][x + 2].hide();
        squares[y + 2][x + 2].hide();
        if (rectY > height / 4 * 3) { //show more area on y axis when getting low down on y axis on level
          squares[y - 3][x].hide();
          squares[y - 3][x + 1].hide();
          squares[y - 3][x + 2].hide();
          squares[y - 3][x - 1].hide();
          squares[y - 3][x - 2].hide();
          squares[y - 4][x].hide();
          squares[y - 4][x + 1].hide();
          squares[y - 4][x + 2].hide();
          squares[y - 4][x - 1].hide();
          squares[y - 4][x - 2].hide();
        }
        if (rectX > width / 4 && rectY < height / 4 * 3) { // show more of 
          squares[y][x - 3].hide();
          squares[y - 1][x - 3].hide();
          squares[y + 1][x - 3].hide();
          squares[y + 2][x - 3].hide();
        }
        else if (rectX < width / 4 * 3 && rectY < height / 4 * 3) {
          squares[y][x + 3].hide();
          squares[y - 1][x + 3].hide();
          squares[y + 1][x + 3].hide();
          squares[y + 2][x + 3].hide();
        }
      }
    }
  }

  //show squares
  for (let y = 0; y < squares.length; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      squares[y][x].display();
    }
  }
}

function loadBlackout() {
  for (let y = 0; y < NUM_ROWS; y++) {
    tempSquares = [];
    for (let x = 0; x < NUM_COLS; x++) {
      tempSquares.push(new Square(x * width / NUM_COLS, y * height / NUM_ROWS, width / NUM_COLS, height / NUM_ROWS));
    }
    squares.push(tempSquares);
  }
}


//LEVELS//
//***************************************************************************************************************************************************************************//

//show tutorial environment
function tutorial() {
  if (respawning) { // only loads bad guy when reloading level so that bad guy can animate and doesnt keep being reset to start location
    loadTutorial();
    respawning = false;
  }
  //instructions on how to play
  instructions();

  //display platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  //show spikes in level
  for (let i = 0; i < spikes.length; i++) {
    spikes[i].display();
  }

  //show enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
  }

  door.display();
  hero();
}

//load tutorial environment into arrays
function loadTutorial() {
  //initialize hero spawn location
  rectY = height - height / 4;
  rectX = width / 18;
  yVelocity = 0;
  contactTop = false;
  dying - false;

  //reset arrays
  platforms = [];
  enemies = [];
  enemyVertices = [];
  doorVertices = [];
  spikes = [];
  spikeVertices = [];
  //reset cannon
  cannons = [];
  cannonBalls = [];
  cannonTimer = 0;

  //bottom floor
  platforms.push(new Platform(0, height - 35, width / 1.7, 15));
  platforms.push(new Platform(width / 1.7 + 150, height - 35, width - (width / 1.7 + 150), 15));
  platforms.push(new Platform(width / 1.3, height - 100, 200, 15));
  platforms.push(new Platform(width / 3, height - 100, 20, 75));

  door = new Door(width / 1.3 + 100, height - 100);

  spikes.push(new Spike(width / 4 - 45, height - 35));
  spikes.push(new Spike(width / 4 - 15, height - 35));
  spikes.push(new Spike(width / 4 - 30, height - 35));

  enemies.push(new HexBadGuy(width / 1.7 + 170, width - 60, height - 35 - 32));
}

//displays instructions on screen for user to learn to play game
function instructions() {
  //instructions on bottom floor
  push();
  fill(0, fade);
  strokeWeight(3);
  textSize(30);
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
  fill(255, fade);
  triangle(width / 3 - 48, height - 225, width / 3 - 22, height - 238, width / 3 - 22, height - 212);
  triangle(width / 3 + 78, height - 225, width / 3 + 52, height - 238, width / 3 + 52, height - 212);
  triangle(width / 3 + 2, height - 252, width / 3 + 28, height - 252, width / 3 + 15, height - 278);
  pop();
}

//show level one environment
function levelOne() {
  if (respawning) {  //reload level
    loadLevelOne();
    respawning = false;
  }

  //show platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  //show spikes in level
  for (let i = 0; i < spikes.length; i++) {
    spikes[i].display();
  }

  //animate cannon and cannonball shooting
  for (let i = 0; i < cannons.length; i++) {
    cannons[i].reload(); //add another cannonball to array
    cannons[i].shoot(); //animate the cannonball and have it move across screen
    cannons[i].display(); //show the cannon
  }
  cannonTimer++; //add to cannon timer which decides the rate of fire for cannon

  //show and animate hero and door
  door.display();
  hero();
}

//load level one environment into arrays
function loadLevelOne() {
  rectY = 20;
  rectX = 100;
  xVelocity = 0;
  yVelocity = 0;
  contactTop = false;
  dying = false;

  //reset arrays
  platforms = [];
  enemies = [];
  enemyVertices = [];
  doorVertices = [];
  spikes = [];
  spikeVertices = [];
  //reset cannon
  cannons = [];
  cannonBalls = [];
  cannonTimer = 0;

  platforms.push(new Platform(width / 20, height / 6, width / 10, 15));

  platforms.push(new Platform(width / 6, height / 3, width / 10, 25));
  platforms.push(new Platform(width / 6 + width / 10 - 15, height / 3 - height / 5 + 20, 15, height / 5));
  spikes.push(new Spike(width / 6 + width / 10 - 15 + 7.5, height / 3 - height / 5 + 20));

  platforms.push(new Platform(width / 20, height / 1.8, width / 10, 15));
  spikes.push(new Spike(width / 20 + 7.5, height / 1.8));
  spikes.push(new Spike(width / 20 + width / 10 - 7.5, height / 1.8));
  platforms.push(new Platform(width / 5 - 50, height / 2, 15, 100));

  platforms.push(new Platform(width / 5, height / 1.8, width / 15, 15));

  platforms.push(new Platform(width / 3, height / 1.8, width / 15, 15));

  platforms.push(new Platform(width / 2, height / 1.8, width / 15, 15));

  platforms.push(new Platform(width / 1.5, height / 1.8, width / 15, 15));

  platforms.push(new Platform(width / 1.2, height / 1.8, width / 15, 15));

  platforms.push(new Platform(width / 1.4, height / 2.3, width / 15, 15));

  platforms.push(new Platform(width / 1.15, height / 2.7, width / 15, 15));

  platforms.push(new Platform(width / 1.4, height / 3.5, width / 15, 15));

  platforms.push(new Platform(width / 1.15, height / 5, width / 15, 15));


  platforms.push(new Platform(width - 65, height / 2 + 40, width - (width - 60), 15));
  cannons.push(new Cannon(width - 50, height / 2, "W", 3, 180));

  //bottom floor
  platforms.push(new Platform(0, height - 15, width, 15));
  for(let i = 0; i < width; i += 15) {
    spikes.push(new Spike(i, height - 15));
  }

  platforms.push(new Platform(width - 102, 100, 102, 15));
  door = new Door(width - 50, 100);
}

//show level two
function levelTwo() {
  if (respawning) { //reload level 
    loadLevelTwo();
    respawning = false;
  }

  //show platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  //show enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
  }

  //show spikes in level
  for (let i = 0; i < spikes.length; i++) {
    spikes[i].display();
  }

  //animate cannon and cannonball shooting
  for (let i = 0; i < cannons.length; i++) {
    cannons[i].reload(); //add another cannonball to array
    cannons[i].shoot(); //animate the cannonball and have it move across screen
    cannons[i].display(); //show the cannon
  }
  cannonTimer++; //add to cannon timer which decides the rate of fire for cannon

  //text on top floor
  push();
  textSize(25);
  textAlign(CENTER);
  text("Take a leap of faith...", width / NUM_COLS * 9 + 10, height / NUM_ROWS * 9 - 20);
  pop();

  //show and animate hero and door
  door.display();
  hero();

  //blackout the screen and provide illumination effect
  blackout();
}

//load level two
function loadLevelTwo() {
  rectY = height / NUM_ROWS * 4;
  rectX = width / NUM_COLS * 3;
  xVelocity = 0;
  yVelocity = 0;
  contactTop = false;
  dying = false;

  //reset arrays
  squares = [];
  platforms = [];
  enemies = [];
  enemyVertices = [];
  doorVertices = [];
  spikes = [];
  spikeVertices = [];
  //reset cannon
  cannons = [];
  cannonBalls = [];
  cannonTimer = 0;

  //buffer platforms to make a frame
  platforms.push(new Platform(0, 0, width / NUM_COLS * 2 + 20, height));
  platforms.push(new Platform(width / NUM_COLS * 37 + 20, 0, width / NUM_COLS * 38 + 20, height));
  platforms.push(new Platform(0, 0, width, height / NUM_ROWS * 2 + 20));
  platforms.push(new Platform(0, height / NUM_ROWS * 37, width, height / NUM_ROWS * 2 + 20));

  //first floor
  platforms.push(new Platform(0, height / NUM_ROWS * 9, width / 3, 15));
  spikes.push(new Spike(width / NUM_COLS * 5 + 10, height / NUM_ROWS * 9));
  spikes.push(new Spike(width / NUM_COLS * 5 + 25, height / NUM_ROWS * 9));

  //second floor
  platforms.push(new Platform(width / 3 + 100, height / 2, width / 3 * 2, 15));
  cannons.push(new Cannon(width / NUM_COLS * 36 + 20, height / 2 - 40, "W", 3, 120));

  //bottom floor
  spikes.push(new Spike(width / NUM_COLS * 14, height / NUM_ROWS * 37));
  spikes.push(new Spike(width / NUM_COLS * 14 + 15, height / NUM_ROWS * 37));
  spikes.push(new Spike(width / NUM_COLS * 14 + 30, height / NUM_ROWS * 37));
  enemies.push(new HexBadGuy(width / 2, width / 1.3, height / NUM_ROWS * 37 - 32));

  door = new Door(width / NUM_COLS * 35, height / NUM_ROWS * 37);

  loadBlackout();
}

function levelFive() {
  if (respawning) { //reload level 
    loadLevelFive();
    respawning = false;
  }

  //show platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].display();
  }

  //animate cannon and cannonball shooting
  for (let i = 0; i < cannons.length; i++) {
    cannons[i].reload(); //add another cannonball to array
    cannons[i].shoot(); //animate the cannonball and have it move across screen
    cannons[i].display(); //show the cannon
  }
  cannonTimer++; //add to cannon timer which decides the rate of fire for cannon

  //show and animate hero and door
  door.display();
  hero();

  //blackout the screen and provide illumination effect
  blackout();
}

function loadLevelFive() {
  rectY = height / NUM_ROWS * 30;
  rectX = width / NUM_COLS * 3;
  xVelocity = 0;
  yVelocity = 0;
  contactTop = false;
  dying = false;

  //reset arrays
  squares = [];
  platforms = [];
  enemies = [];
  enemyVertices = [];
  doorVertices = [];
  spikes = [];
  spikeVertices = [];
  //reset cannon
  cannons = [];
  cannonBalls = [];
  cannonTimer = 0;

  //buffer platforms to make a frame
  platforms.push(new Platform(0, 0, width / NUM_COLS * 2 + 20, height));
  platforms.push(new Platform(width / NUM_COLS * 37 + 20, 0, width / NUM_COLS * 38 + 20, height));
  platforms.push(new Platform(0, 0, width, height / NUM_ROWS * 2 + 20));
  platforms.push(new Platform(0, height / NUM_ROWS * 37, width, height / NUM_ROWS * 2 + 20));

  cannons.push(new Cannon(width / NUM_COLS * 5, height / NUM_ROWS * 20 + 20, "S", 0.4, 60));
  cannons.push(new Cannon(width / NUM_COLS * 8, height / NUM_ROWS * 20 + 20, "S", 0.3, 60));
  cannons.push(new Cannon(width / NUM_COLS * 11, height / NUM_ROWS * 20 + 20, "S", 0.4, 60));
  cannons.push(new Cannon(width / NUM_COLS * 14, height / NUM_ROWS * 20 + 20, "S", 0.5, 60));
  cannons.push(new Cannon(width / NUM_COLS * 17, height / NUM_ROWS * 20 + 20, "S", 0.4, 60));
  cannons.push(new Cannon(width / NUM_COLS * 20, height / NUM_ROWS * 20 + 20, "S", 0.3, 60));
  cannons.push(new Cannon(width / NUM_COLS * 23, height / NUM_ROWS * 20 + 20, "S", 0.4, 60));
  cannons.push(new Cannon(width / NUM_COLS * 26, height / NUM_ROWS * 20 + 20, "S", 0.5, 60));
  cannons.push(new Cannon(width / NUM_COLS * 29, height / NUM_ROWS * 20 + 20, "S", 0.4, 60));
  cannons.push(new Cannon(width / NUM_COLS * 32, height / NUM_ROWS * 20 + 20, "S", 0.47, 60));

  door = new Door(width / NUM_COLS * 36, height / NUM_ROWS * 37);

  loadBlackout();
}

//***************************************************************************************************************************************************************************//




//CLASSES//
//**************************************************************************************************************************************************************************//

//square for blackout effect
class Square {
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.illuminate = 255;
    this.hiding = false;
  }

  display() {
    if (this.hiding === false) {
      push();
      strokeWeight(1);
      fill(0, this.illuminate);
      rect(this.x, this.y, this.w, this.h);
      pop();
    }

  }

  hide() {
    this.illuminate = 0;
    this.hiding = true;
  }

  unHide() {
    this.illuminate = 255;
    this.hiding = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getW() {
    return this.w;
  }

  getH() {
    return this.h;
  }
}

//cannon object
class Cannon {
  //Class Properties
  constructor(x_, y_, d_, s_, r_) {
    this.x = x_;
    this.y = y_;
    this.w = 40;
    this.h = 40;
    this.direction = d_;
    this.speed = s_;
    this.rateOfFire = r_;
  }

  //Class Methods

  //show cannon
  display() {
    push();
    rectMode(CENTER);
    fill(0);
    translate(this.x, this.y);
    if (this.direction === "N") {
      rotate(radians(270));
      rect(- this.h / 2, this.h / 2, this.h, this.w);
      rect(this.h / 8, this.h / 2, this.w / 4, this.h / 1.5);

    }
    else if (this.direction === "S") {
      rotate(radians(90));
      rect(this.h / 2, - this.w / 2, this.h, this.w);
      rect(this.h * 1.1, -this.w / 2, this.w / 4, this.h / 1.5);
    }
    else if (this.direction === "E") {
      rect(0, this.h / 2, this.w, this.h);
      rect(this.w / 1.7, this.h / 2, this.w / 4, this.h / 1.5);
    }
    else if (this.direction === "W") {
      rotate(radians(180));
      rect(-this.w / 2, -this.h / 2, this.w, this.h);
      rect(this.w / 7, - this.h / 2, this.w / 4, this.h / 1.5);
    }
    pop();
  }

  //load another cannonball into array
  reload() {
    if (cannonTimer % this.rateOfFire === 0) {
      cannonBalls.push(new CannonBall(this.x + this.w / 2, this.y + this.h / 2, this.h / 1.5, this.direction, this.speed));
    }

  }

  //shoot cannonballs
  shoot() {
    for (let i = 0; i < cannonBalls.length; i++) {
      cannonBalls[i].move();
      cannonBalls[i].display();
    }
  }
}

//class for cannon balls
class CannonBall {
  //Class Properties
  constructor(x_, y_, r_, d_, s_) {
    this.x = x_;
    this.y = y_;
    this.radius = r_;
    this.direction = d_;
    this.speed = s_;
  }

  //Class Methods

  //show cannonballs
  display() {
    push();
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();

    //stop cannonball if it goes off screen
    if (this.x > width + this.radius || this.x < 0 - this.radius || this.y > height + this.radius || this.y < 0 - this.radius) {
      cannonBalls.shift();
    }
  }

  //move cannonball across screen
  move() {
    if (this.direction === "E") {
      this.x += this.speed;
    }
    else if (this.direction === "N") {
      this.y -= this.speed;
    }
    else if (this.direction === "S") {
      this.y += this.speed;
    }
    else if (this.direction === "W") {
      this.x -= this.speed;
    }
  }

  //return circ size for collisions
  getRadius() {
    return this.radius;
  }

  //return x pos for collisions
  getX() {
    return this.x;
  }

  //return y pos for collisions
  getY() {
    return this.y;
  }
}

//creates a single spike to kill hero
class Spike {
  //constructor and class properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = 15;
    this.h = 20;
  }

  //class methods

  display() {
    push();
    fill(0, fade);
    noStroke();
    triangle(this.x - this.w / 2, this.y, this.x, this.y - this.h, this.x + this.w / 2, this.y);
    pop();
  }

  //return left vertex x
  getTVX1() {
    return this.x - this.w / 2;
  }

  getTVY1() {
    return this.y;
  }

  getTVX2() {
    return this.x;
  }

  getTVY2() {
    return this.y - this.h;
  }

  getTVX3() {
    return this.x + this.w / 2;
  }

  getTVY3() {
    return this.y;
  }
}

//makes a basic bad guy
class HexBadGuy {
  //Constructor and Class Properties
  constructor(xR1_, xR2_, y_) {
    this.xRangeLeft = xR1_; //must be leftmost x value in movement range
    this.xRangeRight = xR2_; //must be rightmost x value in movement range
    this.x = xR1_ + 10; //initialize bad guy's variable x position
    this.xVelocity = 3; //movement speed
    this.y = y_; //static y pos
    this.w = 40;
    this.h = 32;
  }

  //Class Methods
  display() {
    //draw bad guy
    push();
    fill(75, 0, 130, fade);
    noStroke();
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.w, this.y);
    vertex(this.x + this.w + 9, this.y + this.h / 2);
    vertex(this.x + this.w, this.y + this.h);
    vertex(this.x, this.y + this.h);
    vertex(this.x - 9, this.y + this.h / 2);
    endShape();
    pop();


  }

  //move bad guy
  move() {
    if (this.x <= this.xRangeLeft) {
      this.xVelocity *= -1;
    }
    else if (this.x >= this.xRangeRight) {
      this.xVelocity *= -1;
    }
    this.x += this.xVelocity;
  }

  //returns number of vertices so that bad guy collision checker knows to check for a hexbadguy
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

//platform object for level building
class Platform {
  //Constructor and Class Properties
  constructor(x_, y_, w_, h_) {
    this.x = int(x_);
    this.y = int(y_);
    this.w = w_;
    this.h = h_;
  }

  //Class Methods
  display() {
    push();
    fill(0, fade);
    stroke(0, fade);
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

//creates door for hero to reach to progress to next level
class Door {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = rectW + 10;
    this.h = rectH + 10;
    this.xBuffer = 15;
    this.yBuffer = 10;
    this.roofBuffer = 40;
    this.count = 255;
    this.countSpeed = -5;
  }

  //Class Methods

  display() {
    push();
    fill(this.count, 0, 0, fade);
    strokeWeight(8);
    stroke(0, fade);
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

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

//************************************************************************************************************************************************************************//