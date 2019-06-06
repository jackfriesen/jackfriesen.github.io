// Illumination testing

// const NUM_ROWS;
// const NUM_COLS;
const NUM_COLS = height / 1000;
const NUM_ROWS = width / 1000;

let squares = [];
let tempSquares = []; //okay hold up. how do i create like 1000 rows in this array? 
let lame;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(150);
  squares = [];
  for(let y = 0; y < NUM_COLS; y ++ ) {
    for(let x = 0; x < NUM_ROWS; x ++) {
      tempSquares = [];
      tempSquares.push(new Square(x, y, NUM_ROWS, NUM_COLS));
      squares.push(tempSquares);
    }
  }

  for(let y = 0; y < NUM_COLS; y ++ ) {
    for(let x = 0; x < NUM_ROWS; x ++) {
      squares[y][x].display();
    }
  }

  print(squares);
}

class Square {
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
  }

  display() {
    push();
    fill(0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
