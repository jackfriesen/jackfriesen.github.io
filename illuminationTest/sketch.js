// Illumination testing

// const NUM_ROWS;
// const NUM_COLS;
let NUM_COLS = 10;
let NUM_ROWS = 10;

let hiding = false;
let squares = [];
let tempSquares = []; //okay hold up. how do i create like 1000 rows in this array? 
let collision;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x ++) {
      tempSquares.push(new Square(x * width / NUM_COLS, y * height / NUM_ROWS, width / NUM_COLS, height / NUM_ROWS));
      //print(y * height / NUM_ROWS);
      squares.push(tempSquares);
    }
  }
  //print(squares);
}

function draw() {
  background(255);

  fill(255, 0, 0);
  rect(width / 2 - 50, height / 2 - 50, 100, 100);

  push();
  noFill();
  rect(mouseX, mouseY, 10, 10);
  pop();

  for(let y = 0; y < squares.length; y ++) {
    for(let x = 0; x < squares.length; x++) {
      collision = collideRectRect(mouseX, mouseY, 10, 10, squares[y][x].getX(), squares[y][x].getY(), squares[y][x].getW(), squares[y][x].getH());
      if(collision) {
        print(collision);
        squares[y][x].hide();
      }
      else {
        squares[y][x].unHide();
      }
    }
  }
  

  for(let y = 0; y < squares.length; y ++ ) {
    for(let x = 0; x < squares.length; x ++) {
      squares[y][x].display();
    }
  }
}

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
      noStroke();
      this.illuminate = 255;
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
