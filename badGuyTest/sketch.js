//bad guy related testing zone


// let hit = false;
// let poly = [];
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   collideDebug(true);
//   poly[0] = createVector(323, 431);     // set X/Y position
//   poly[1] = createVector(210, 311);
//   poly[2] = createVector(220, 223);
//   poly[3] = createVector(590, 233);
// }

// function draw() {
//   background(255);
//   push();
//   beginShape();
//   //draw the polygon from the created Vectors above.
//   for (let i = 0; i < poly.length; i++) {
//     vertex(poly[i].x, poly[i].y);
//   }
//   endShape(CLOSE);

//   rect(mouseX, mouseY, 45, 100);

//   hit = collideRectPoly(mouseX, mouseY, 45, 100, poly);
//   //enable the hit detection if the circle is wholly inside the polygon
//   // hit = collideRectPoly(mouseX,mouseY,45,100,poly,true);

//   print("colliding? " + hit);
// }



let badguy;
let hit;
let poly;

function setup() {
  createCanvas(windowWidth, windowHeight);
  badguy = new HexBadGuy(100, 100, 400, 45, 32, 160, 0, 60);
}

function draw() {
  background(220);
  
  badguy.move();
  badguy.display();

  noFill();
  rect(mouseX, mouseY, 45, 45);

  hit = collideRectPoly(mouseX, mouseY, 45, 45, poly);

  print(hit);
}


//makes a basic bad guy
class HexBadGuy {
  //Constructor and Class Properties
  constructor(xR1_, y_, xR2_, w_, h_, r_, g_, b_) {
    this.xRangeLeft = xR1_; //must be leftmost x value in movement range
    this.xRangeRight = xR2_; //must be rightmost x value in movement range
    this.x = xR1_ + 10; //bad guy's variable x position
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
    poly = [];

    poly.push(createVector(badguy.getHVX1(), badguy.getHVY1()));
    poly.push(createVector(badguy.getHVX2(), badguy.getHVY2()));
    poly.push(createVector(badguy.getHVX3(), badguy.getHVY3()));
    poly.push(createVector(badguy.getHVX4(), badguy.getHVY4()));
    poly.push(createVector(badguy.getHVX5(), badguy.getHVY5()));
    poly.push(createVector(badguy.getHVX6(), badguy.getHVY6()));

    fill(this.r, this.g, this.b);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + this.w, this.y);
    vertex(this.x + this.w + 10, this.y + this.h / 2);
    vertex(this.x + this.w, this.y + this.h);
    vertex(this.x, this.y + this.h);
    vertex(this.x - 10, this.y + this.h / 2);
    endShape();

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