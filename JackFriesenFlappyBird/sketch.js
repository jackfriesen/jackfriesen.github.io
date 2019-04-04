//Flappy Bird

let bird;
let down = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bird = new Bird();
}

function draw() {
  background(220);
  bird.update();
  bird.display();
}

//make a bird
class Bird {
  //Constructor and Properties
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 1;
    this.velocity = 0;
  }

  //Class Methods
  display() {
    fill(255);
    ellipse(this.x, this.y, 25, 25);
  }

  update() {
    if (down) {
      this.velocity += this.gravity;
      this.y += this.velocity;
    }
  }
}
