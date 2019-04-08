//Flappy Bird

//TO DO:
//
//load extra images

let bird;
let birdImages = [];
let birdCounter = 0;
let pipeImages = [];


//load images
function preload() {
  //load birds
  for (let i = 1; i < 4; i++) {
    birdImages.push(loadImage("assets/Bird" + i + ".png"));
  }

  // //load pipes
  // for(let j = 1; j < 6; j++) {
  //   pipeImages.push(loadImage("assets/pipes" + j + ".png"));
  // }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird();
  pipeImages.push(new Pipe());
}

function draw() {
  background(220);
  bird.update();
  bird.display();

  if (frameCount % 40 === 0) {
    pipeImages.push(new Pipe());
  }

  for (let i = 0; i < pipeImages.length; i++) {
    pipeImages[i].show();
    pipeImages[i].update();
  }
}

//check if spacebar is pressed (32 = spacebar keycode) and lift
//bird and cycle through costumes
function keyPressed() {
  if (key === " ") {
    bird.up();

    birdCounter++;

    if (birdCounter === 3) {
      birdCounter = 0;
    }
  }
}












//make a bird
class Bird {
  //Constructor and Class Properties
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.6;
    this.velocity = 0;
    this.lift = -10;
  }

  //Class Methods
  display() {
    fill(255);
    imageMode(CENTER);
    image(birdImages[birdCounter], this.x, this.y);
  }

  update() {
    this.velocity += this.gravity;
  //   this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  up() {
    this.velocity += this.lift;
  }
}

class Pipe {
  //Constructor and Class Properties
  constructor() {
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    this.x = width;
    this.w = 20;
    this.speed = 5;
  }

  //Class Methods
  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
  }
}