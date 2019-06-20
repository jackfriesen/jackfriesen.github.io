// CS30 - Final Programming Challenge
// by Jack Friesen
//
//create animated fox program
// -controllable by WASD keys


//user controlled fox vars
let x; //x pos
let y; //y pos
let animationImages = [];//array to hold all 8 images in each direction
let index = 0; //variable used to navigate animation array
let counter = 0; //changes fox costume over time
let state = 4; //0 = up, 1 = left, 2 = down, 3 = right 
let scaler = 1;
let pepsiMode = false; //triggers pepsi mode
let scalerCount = 0.1;
let foxes = []; //holds computer generated foxes

//load fox animation images
function preload() {
  //0-7 LEFT
  for (let i = 1; i <= 8; i++) {
    animationImages.push(loadImage("/assets/left" + i + ".png"));
  }

  //8-15 RIGHT
  for (let i = 1; i <= 8; i++) {
    animationImages.push(loadImage("/assets/right" + i + ".png"));
  }

  //16-23 UP
  for (let i = 1; i <= 8; i++) {
    animationImages.push(loadImage("/assets/up" + i + ".png"));
  }

  //24-31 DOWN
  for (let i = 1; i <= 8; i++) {
    animationImages.push(loadImage("/assets/down" + i + ".png"));
  }
}

//draw canvas, initialize fox position, and load computer foxes
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  x = width / 2;
  y = height / 2;

  foxes.push(new ComputerFox(100, 100));
  foxes.push(new ComputerFox(width - 100, height - 100));
  foxes.push(new ComputerFox(width / 3, height / 4));
}

//show fox animations
function draw() {
  background(220);
  drawFox(x, y);

  //animate computer foxes
  for (let i = 0; i < foxes.length; i++) {
    push();
    foxes[i].decideDirection();
    foxes[i].move();
    foxes[i].display();
    pop();
  }
}

//change fox size
function mouseClicked() {
  //top half
  if (mouseY > height / 2) {
    scaler -= 0.1;
  }
  else { //bottom half
    scaler += 0.1;
  }
}

//stop fox moving
function keyReleased() {
  state = 4; //stop animating
}

//change state variable to move fox
function keyPressed() {
  if (pepsiMode === false) {
    //key is W, go up
    if (keyCode === 87) {
      state = 0;
    }
    //key is A, go left
    if (keyCode === 65) {
      state = 1;
    }
    //key is S, go down
    if (keyCode === 83) {
      state = 2;
    }
    //key is D, go right
    if (keyCode === 68) {
      state = 3;
    }
  }

  //key is P, trigger pepsi mode
  if (keyCode === 80) {
    pepsiMode = !pepsiMode;
  }
  //key is R, reset program
  if (keyCode === 82) {
    reset();
  }
}

//reset fox
function reset() {
  pepsiMode = false;
  x = width / 2;
  y = height / 2;
  state = 4;
  index = 0;
  scaler = 1;
}

//fox animations
function drawFox(xPos, yPos) {
  push();
  //trigger crazy pepsi mode if true
  if (pepsiMode) {
    tint(random(255), random(255), random(255)); //flip fox through random colors
    //check if fox is about to leave screen and if yes, move back into play area. if not, move randomly
    if (xPos < 100) { //moving off left side
      state = 3;
    }
    else if (xPos > width - 100) { //moving off right side
      state = 1;
    }
    else if (yPos < 100) { //moving off top
      state = 2;
    }
    else if (yPos > height - 100) { //moving off bottom
      state = 0;
    }
    else { //move randomly
      if (counter % 60 === 0) {
        state = int(random(4));
      }
    }

    //change size
    if (scaler >= 1.5 || scaler <= 0.5) {
      scalerCount *= -1;
    }
    scaler += scalerCount;
  }
  else { //normal color
    scaler = 1; //reset size
    noTint(); //reset fox color
  }

  move(); //move fox based on state variable
  counter++; //costume animation timer
  translate(xPos, yPos); //translate for smoother scaling
  scale(scaler); //set scale based on mouseClicked event or pepsiMode
  image(animationImages[index], 0, 0); //show fox at proper position
  pop();
}

//move fox and animate costume change
function move() {
  //going up 
  if (state === 0) {
    //costume change every 4th frame
    if (counter % 4 === 0) {
      //loop back to start of up costumes if at the end or if have been animating in a different direction
      if (index >= 23 || index <= 16) {
        index = 16;
      }
      //move through up costumes
      index++;
    }
    if (pepsiMode) { //move up
      y -= 4;
    }
    else {
      y -= 2; 
    }
  }

  //going left
  if (state === 1) {
    //costume change every 4th frame
    if (counter % 4 === 0) {
      //loop back to start of left costumes if at the end or if have been animating in a different direction
      if (index >= 7) {
        index = 0;
      }
      //move through left costumes
      index++;
    }
    if (pepsiMode) { //move left
      x -= 4;
    }
    else {
      x -= 2; 
    }
  }

  //going down
  if (state === 2) {
    //costume change every 4th frame
    if (counter % 4 === 0) {
      //loop back to start of up costumes if at the end or if have been animating in a different direction
      if (index >= 31 || index <= 24) {
        index = 24;
      }
      //move through down costumes
      index++;
    }
    if (pepsiMode) { //move down
      y += 4;
    }
    else {
      y += 2; 
    }
  }

  //going right
  if (state === 3) {
    //costume change every 4th frame
    if (counter % 4 === 0) {
      //loop back to start of up costumes if at the end or if have been animating in a different direction
      if (index >= 15 || index <= 8) {
        index = 8;
      }
      //move through right costumes
      index++;
    }
    if (pepsiMode) { //move right
      x += 4;
    }
    else {
      x += 2; 
    }
  }
}

//self animated fox
class ComputerFox {
  //constructor and class properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.computerCounter = 0;
    this.computerIndex = 0;
    this.computerState = 4;
  }

  //Class Methods

  display() {
    if (dist(x, y, this.x, this.y) <= 200) {
      tint(0, 0, 255);
    }
    else {
      tint(this.r, this.g, this.b);
    }
    image(animationImages[this.computerIndex], this.x, this.y);
  }

  //essentially the same as fox move function
  move() {
    //going up 
    if (this.computerState === 0) {
      //costume change every 4th frame
      if (this.computerCounter % 4 === 0) {
        //loop back to start of up costumes if at the end or if have been animating in a different direction
        if (this.computerIndex >= 23 || this.computerIndex <= 16) {
          this.computerIndex = 16;
        }
        //move through up costumes
        this.computerIndex++;
      }
      this.y -= 2; //move up
    }

    //going left
    else if (this.computerState === 1) {
      //costume change every 4th frame
      if (this.computerCounter % 4 === 0) {
        //loop back to start of left costumes if at the end or if have been animating in a different direction
        if (this.computerIndex >= 7) {
          this.computerIndex = 0;
        }
        //move through left costumes
        this.computerIndex++;
      }
      this.x -= 2; //move left
    }

    //going down
    else if (this.computerState === 2) {
      //costume change every 4th frame
      if (this.computerCounter % 4 === 0) {
        //loop back to start of up costumes if at the end or if have been animating in a different direction
        if (this.computerIndex >= 31 || this.computerIndex <= 24) {
          this.computerIndex = 24;
        }
        //move through down costumes
        this.computerIndex++;
      }
      this.y += 2; //move down
    }

    //going right
    else if (this.computerState === 3) {
      //costume change every 4th frame
      if (this.computerCounter % 4 === 0) {
        //loop back to start of up costumes if at the end or if have been animating in a different direction
        if (this.computerIndex >= 15 || this.computerIndex <= 8) {
          this.computerIndex = 8;
        }
        //move through right costumes
        this.computerIndex++;
      }
      this.x += 2; //move right
    }
    this.computerCounter++; //for costume animation
  }

  //the same as pepsiMode for user controlled fox
  decideDirection() {
    //check if fox is about to leave screen and if yes, move back into play area. if not, move randomly
    if (this.x < 100) { //moving off left side
      this.computerState = 3;
    }
    else if (this.x > width - 100) { //moving off right side
      this.computerState = 1;
    }
    else if (this.y < 100) { //moving off top
      this.computerState = 2;
    }
    else if (this.y > height - 100) { //moving off bottom
      this.computerState = 0;
    }
    else { //move randomly
      if (this.computerCounter % 60 === 0) {
        this.computerState = int(random(4));
      }
    }
  }
}

