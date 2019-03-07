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

//draw squares for the first time
function draw() {
  makeSquares();
  if (change) {
    //squares get smaller
    if (mouseButton === LEFT) {
      squareSize -= 5;
    }
    //squares get bigger
    if (mouseButton === RIGHT) {
      //squares get bigger
      squareSize += 5;
    }
  }

}

//refresh canvas if key is pressed
function keyPressed() {
  change = false;
  draw();
}

function mousePressed() {
  change = true;
  draw();
}

//make the squares on the screen
function makeSquares() {
  for (let x = 0; x <= width - squareSize; x += squareSize) {
    for (let y = 0; y <= height - squareSize; y += squareSize) {
      fill(int(random(200, 255)), 0, int(random(100, 150)));
      rect(x, y, squareSize, squareSize);
    }
  }
}
