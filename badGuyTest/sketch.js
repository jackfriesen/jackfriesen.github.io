// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let badguy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  badguy = new RectBadGuy(100, 100, 400, 20, 20, 255, 0, 0);
}

function draw() {
  background(220);
  badguy.move();
  badguy.display();
}


//makes a basic bad guy
class RectBadGuy {
  //Constructor and Class Properties
  constructor(xR1_, y_, xR2_, w_, h_, r_, g_, b_) {
    this.xRangeLeft = xR1_; //must be leftmost x value in range
    this.xRangeRight = xR2_; //must be rightmost x value in range
    this.x = xR2_ - xR1_; //bad guy's variable x position 
    this.xVelocity = 3;
    this.y = y_; //most be lower y value
    this.w = w_;
    this.h = h_;
    this.r = r_;
    this.g = g_;
    this.b = b_;
  }

  //Class Methods

  display() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
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
}