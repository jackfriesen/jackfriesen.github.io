// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//TO DO 
//
//set square size as a variable that can also be 
//included in the x for loop in makeSquares() so it only 
//prints squares that far
//
//why can mousePressed() call draw but not run any code?
//is it because draw is what changes the sketch?


let change = false;
let squareSize;

function setup() {
  createCanvas(windowWidth, windowHeight);

  squareSize = 50;

  noLoop();
}

//resize sketch when canvas resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draw squares for the first time and change square size
function draw() {
  makeSquares();
  sizeChange();

}

function sizeChange() {
  if (change) {
    //squares get smaller if they aren't too small already
    if (mouseButton === LEFT) {
      if(squareSize < 15) {
        squareSize = 15;
      }
      else {
        squareSize -= 5;
      }
    }
    //squares get bigger if they aren't too big already
    if (mouseButton === RIGHT) {
      if(squareSize > 100){
        squareSize = 100;
      }
      else {
        squareSize += 5;
      }
    }
  }
}

//refresh canvas if key is pressed
function keyPressed() {
  change = false;
  draw();
}

//change size when mouse pressed
function mousePressed() {
  change = true;
  draw();
}

//make the squares on the screen
function makeSquares() {
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      fill(int(random(255)), int(random(255)), int(random(255)));
      rect(x, y, squareSize, squareSize);
    }
  }
}
