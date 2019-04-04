//Chess Board

const SQUARE_SIZE = 75;
let white = true;

function setup() {
  createCanvas(600, 600);
}
function draw() {
  drawChessboard();
}

//draw a chessboard
function drawChessboard() {
  //moving left to right, loop and draw columns of 
  //alternating black and white squares
  for (let x = 0; x < width; x += SQUARE_SIZE) {
    for (let y = 0; y < height; y += SQUARE_SIZE) {
      if (white) {
        fill(255);
      }
      else {
        fill(0);
      }

      rect(x, y, SQUARE_SIZE, SQUARE_SIZE);

      white = !white;
    }
    white = !white;
  }
}