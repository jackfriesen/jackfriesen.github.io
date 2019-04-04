// Vectors Demo

// let position;
// let velocity;
// let gravity;
let m;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // position = createVector(width / 2, height / 2);
  // velocity = createVector(random(-5, 5), random(-5, -1));
  // gravity = createVector(0, 0.08);
  m = new Mover(width / 2, height / 2);
}

function draw() {
  //background(0);
  //other();

  m.move();
  m.display();
  



}

function other() {
  // velocity.add(gravity);
  // position.add(velocity);
  // ellipse(position.x, position.y, 40, 40);

  // push();
  // stroke(255);
  // strokeWeight(4);
  // translate(width / 2, height / 2);
  // let mouse = createVector(mouseX, mouseY);
  // let center = createVector(width / 2, height / 2);

  // let towardsMouse = mouse.sub(center);
  // //towardsMouse.limit(100);
  // towardsMouse.normalize();
  // towardsMouse.mult(200);
  // line(0, 0, towardsMouse.x, towardsMouse.y);


  // let m = towardsMouse.mag();
  // textSize(30);
  // //text(m, 0, 50);

  // pop();
}

class Mover {
  //Constructor and Properties
  constructor(x_, y_) {
    this.size = 1;
    this.position = createVector(x_, y_);
    this.velocity = createVector(0, 0);
    this.acceleration = (0, 0);
  }

  //Class Methods

  display() {
    ellipseMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  move() {
    // eslint-disable-next-line no-undef
    this.acceleration = p5.Vector.random2D().mult(2);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(5);
    this.edges();
  }

  edges() {
    if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.x > width) {
      this.position.x = 0;
    }

    if (this.position.y < 0) {
      this.position.y = height;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    }
  }

}