//puzzle game

const NUM_ROWS = 4;
const NUM_COLS = 5;
let rectWidth, rectHeight;

let squareCross = true;

let currentRow, currentCol;

let gridData = [[0, 255, 0, 255, 0],
                [255, 0, 255, 0, 255],
                [0, 255, 0, 255, 0],
                [255, 0, 255, 0, 255]];

//create canvas and randomize grid board
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth = width / NUM_COLS;
  rectHeight = height / NUM_ROWS;
  randomize();
}

//loop through gridData array and randomly change every black/white value
//to something new or keep it the same
function randomize() {
  for (let y = 0; y < gridData.length; y++) {
    for (let x = 0; x < gridData.length + 1; x++) {
      let randomNum = int(random(2));
      if (randomNum === 0) {
        gridData[y][x] = 0;
      }
      else {
        gridData[y][x] = 255;
      }
    }
  }
}

//check for a win
function checkWin() {
  let blackWin = 0;
  let whiteWin = 0;
  for (let y = 0; y < gridData.length; y++) {
    for (let x = 0; x < gridData.length + 1; x++) {
      if (gridData[y][x] === 0) {
        blackWin++;
      }
      if (gridData[y][x] === 255) {
        whiteWin++;
      }
      //print(blackWin, whiteWin, "colors");
    }
  }

  if (blackWin === 20) {
    push();
    fill(255);
    rect(width / 2 - 100, height / 2 - 100, 200, 200);
    fill(0);
    textSize(20);
    text("You Win!", width / 2 - 40, height / 2);
    pop();
  }

  if (whiteWin === 20) {
    push();
    fill(0);
    rect(width / 2 - 100, height / 2 - 100, 200, 200);
    fill(255);
    textSize(20);
    text("You Win!", width / 2 - 40, height / 2);
    pop();
  }
}

function draw() {
  background(220);
  drawGrid();
  determineActiveSquare();
  checkWin();
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
function determineActiveSquare() {
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
  //print(currentCol, currentRow);

  //show cross formation of squares about to be impacted
  if (squareCross) {
    fill(139, 69, 19, 50);
    rect(rectWidth * currentCol, rectHeight * currentRow, rectWidth, rectHeight);
    fill(182, 251, 182, 50);
    rect(rectWidth * (currentCol - 1), rectHeight * currentRow, rectWidth, rectHeight);
    rect(rectWidth * (currentCol + 1), rectHeight * currentRow, rectWidth, rectHeight);
    rect(rectWidth * currentCol, rectHeight * (currentRow - 1), rectWidth, rectHeight);
    rect(rectWidth * currentCol, rectHeight * (currentRow + 1), rectWidth, rectHeight);
  }
  else { //same thing but square formation
    fill(139, 69, 19, 50);
    rect(rectWidth * currentCol, rectHeight * currentRow, rectWidth, rectHeight);
    fill(182, 251, 182, 50);
    rect(rectWidth * (currentCol - 1), rectHeight * currentRow, rectWidth, rectHeight);
    rect(rectWidth * currentCol, rectHeight * (currentRow - 1), rectWidth, rectHeight);
    rect(rectWidth * (currentCol - 1), rectHeight * (currentRow - 1), rectWidth, rectHeight);
  }

}

//change square color
function flip(col, row) {
  if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
    if (gridData[row][col] === 0) {
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
  if (squareCross) {
    if (mouseButton === LEFT) {
      flip(currentCol, currentRow);
      flip(currentCol - 1, currentRow);
      flip(currentCol + 1, currentRow);
      flip(currentCol, currentRow - 1);
      flip(currentCol, currentRow + 1);
    }
  }
  else {
    if (mouseButton === LEFT) {
      flip(currentCol, currentRow);
      flip(currentCol - 1, currentRow);
      flip(currentCol, currentRow - 1);
      flip(currentCol - 1, currentRow - 1);
    }
  } 

  if (mouseButton === CENTER) {
    flip(currentCol, currentRow);
  }


}

//flip between cross and square formation
function keyPressed() {
  if (key === " ") {
    squareCross = !squareCross;
    print(squareCross);
  }
}