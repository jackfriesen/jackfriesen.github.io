let ballObjects = [];
let count = 255;
let countSpeed = -5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  fill(random(255), random(255), random(255), count);
  for(let currentBall of ballObjects) {
    currentBall.mouseOver();
    currentBall.display();
    currentBall.move();
  }
  count += countSpeed;

  if(count < 0 || count > 280) {
    countSpeed *= -1;
  }
}

function mouseClicked() {
  for(let x = 0; x < 50; x ++) {
  ballObjects.push(new Ball(mouseX, mouseY));
  }
}

class Ball {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.size = 30;
    this.gravity = 0.1;
  }

  //Class Methods
  display() {
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += this.gravity;

    //check L/R balls
    if(this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if(this.y > height) {
      this.ySpeed *= -0.92;
      this.y = height;
    }
  }

  mouseOver() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if(d < this.size / 2) {
      if(mouseIsPressed && mouseButton === CENTER) {
        this.size += 20;
      }
      if(mouseIsPressed && mouseButton === RIGHT) {
        this.size -= 20;
      }
    }
  }
}
