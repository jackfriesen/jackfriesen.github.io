//puzzle demo and 2D arrays

const NUM_ROWS = 4;
const NUM_COLS = 5;
let rectWidth, rectHeight;

let currentRow, currentCol;

let gridData = [[0, 255, 0, 255, 0],
                [255, 0, 255, 0, 255],
                [0, 255, 0, 255, 0],
                [255, 0, 255, 0, 255]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectWidth = width / NUM_COLS;
  rectHeight = height / NUM_ROWS;
}

function draw() {
  background(220);
  drawGrid();
  determineActiveSquare();
}

//render a grid of squares
//fill color set according to data stored in 2d array
function drawGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      fill(gridData[y][x]);
      rect(rectWidth * x, rectHeight * y, rectWidth, rectHeight);
    }
  }
}

//an expression to run each frame and to determine where the mouse is
function determineActiveSquare () {
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
  print(currentCol, currentRow);
}

//change square color
function flip(col, row) {
  if(col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
    if(gridData[row][col] === 0) {
      gridData[row][col] = 255;
    }
    else {
      gridData[row][col] = 0;
    }
  }
}

//press left to change squares
//press middle for cheater cheater (single square change)
function mousePressed() {
  if(mouseButton === LEFT) {
    flip(currentCol, currentRow);
    flip(currentCol - 1, currentRow);
    flip(currentCol + 1, currentRow);
    flip(currentCol, currentRow - 1);
    flip(currentCol, currentRow + 1);
  }

  if(mouseButton === CENTER) {
    flip(currentCol, currentRow);
  }
}