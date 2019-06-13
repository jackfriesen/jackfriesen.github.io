// Illumination testing

const  NUM_COLS = 50;
const NUM_ROWS = 50;

let hiding = false;
let squares = [];
let tempSquares = []; 
let illuminationCollision;

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  for (let y = 0; y < NUM_ROWS; y++) {
    tempSquares = [];
    for (let x = 0; x < NUM_COLS; x ++) {
      tempSquares.push(new Square(x * width / NUM_COLS, y * height / NUM_ROWS, width / NUM_COLS, height / NUM_ROWS));
    }
    squares.push(tempSquares);
  }
  print(squares);
}

function draw() {
  background(255);


  for(let y = 0; y < squares.length; y ++) {
    for(let x = 0; x < NUM_COLS; x++) {
      illuminationCollision = collideRectRect(mouseX, mouseY, 10, 10, squares[y][x].getX(), squares[y][x].getY(), squares[y][x].getW(), squares[y][x].getH());
      if(illuminationCollision) {
        squares[y][x].hide();
        squares[y + 1][x].hide();
      }
      else {
        squares[y][x].unHide();
      }
    }
  }
  

  for(let y = 0; y < squares.length; y ++ ) {
    for(let x = 0; x < NUM_COLS; x ++) {
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
      strokeWeight(1);
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
    this.illuminate = 255;
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
