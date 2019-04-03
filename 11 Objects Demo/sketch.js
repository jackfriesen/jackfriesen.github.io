// Making Classes and Objects

let walkers = [];
let pause = true;
const NUM_WALKERS = 400;
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < NUM_WALKERS; i++) {
    walkers.push(new Walker(random(width), random(height)));
  }

  myWalker = new Walker(width / 2, height / 2);

  noStroke();
}

function draw() {
  //background(0);
  // if(pause) {
  //   for (let i = 0; i < NUM_WALKERS; i++) {
  //     walkers[i].move();
  //     walkers[i].display();
  //   } 
  // }

  myWalker.move();
  myWalker.display();

}



function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    pause = !pause;
  }
}

class Walker {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    // this.speed = random(1, 10);
    // this.size = this.speed + 1;
    this.speed = 10;
    this.size = 5;
    this.c = color(50, 220, 50);
    this.xOff = random(200);
    this.yOff = random(200);
  }

  //Class Methods

  display() {
    rectMode(CENTER);
    fill(this.c);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    let myChoice = Math.floor(random(4));
    if (myChoice === 0) { //right
      this.x += this.speed;
    }
    else if (myChoice === 1) { //left
      this.x -= this.speed;
    }
    else if (myChoice === 2) { //up
      this.y -= this.speed;
    }
    else if (myChoice === 3) { //down
      this.y += this.speed;
    }
  }

  movePerlin() {
    this.x += map(noise(this.xOff), 0, 1, -this.speed, this.speed);
    this.y += map(noise(this.yOff), 0, 1, -this.speed, this.speed);
    this.xOff += 0.02;
    this.yOff += 0.02;
  }
}