//cannon testing zone




//for collision checker 
//
//check collision between cannonBalls and platforms
//if collision is true, cannonBalls[i].splice








let cannons = [];
let cannonBalls = [];
let count = 0;
let collision;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  cannons.push(new Cannon(100, 100));
}

function draw() {
  background(220);
  noFill();
  rect(mouseX, mouseY, 40, 40);

  //animate cannon and cannonball shooting
  for (let i = 0; i < cannons.length; i++) {
    if (count % 120 === 0) { 
      cannons[i].reload(); //add another cannonball to array
    }
    cannons[i].shoot(); //animate the cannonball and have it move across screen
    cannons[i].display(); //show the cannon
  }

  //check collision
  for (let i = 0; i < cannonBalls.length; i++) {
    collision = collideRectCircle(mouseX, mouseY, 40, 40, cannonBalls[i].getX(), cannonBalls[i].getY(), cannonBalls[i].getRadius());
    if(collision) {
      print(collision);
      if(collision) {
        push();
        fill(0, 255, 0);
        rect(width - 200, height - 200, 100, 100);
        pop();
      }
    }
  }
  
  count++;
}

class Cannon {
  //Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = 40;
    this.h = 40;
  }

  //Class Methods

  display() {
    push();
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    rect(this.x + this.w, this.y + this.h / 6, this.w / 4, this.h / 1.5);
    pop();
  }

  reload() {
    cannonBalls.push(new CannonBall(this.x + this.w / 2, this.y + this.h / 2, this.h / 1.5));
  }

  shoot() {
    for (let i = 0; i < cannonBalls.length; i++) {
      cannonBalls[i].move();
      cannonBalls[i].display();
    }
  }
}

class CannonBall {
  //Class Properties
  constructor(x_, y_, r_) {
    this.x = x_;
    this.y = y_;
    this.radius = r_;
  }

  //Class Methods

  display() {
    push();
    fill(255);
    ellipse(this.x, this.y, this.radius, this.radius);
    pop();

    //gets rid of cannonball if it goes off screen
    if(this.x > width + this.radius) {
      cannonBalls.shift();
    }
  }

  move() {
    this.x += 2;
  }

  getRadius() {
    return this.radius;
  }

  getX(){
    return this.x;
  }

  getY() {
    return this.y;
  }
}