// Multi-Colored Grid
// Jack Friesen
// Date
//
//Create a grid of multi-colored squares that change 
//size when mouse is pressed and change color when any key is pressed


//TO DO 
//
//j is supposed to be halfway through the size array and squareSize uses j 
//to browse the size array values and change square size based on that
//
//GET RID OF HARDCODE VALUE ADJUSTMENTS 
//IN MOUSEPRESSED() AFTER J IS SOLVED


//TABLE OF CONTENTS
//
// Setup()
// * getSizes()
//   -get the common factors between width and height as square sizes
// 
// windowResized()
// -resize canvas if the window is resized
//
// Draw()
// * makeSquares
//   - print colored squares to the screen
//
// keyPressed()
// - change square colors on screen
// * makeSquares()
//   - print colored squares to screen
//
// mousePressed()
// - alter square size based on mouse button pressed
// * makeSquares()
//   - print colored squares to screen




let squareSize;
let sizeArray = [];
let j;

function setup() {
  createCanvas(1000, 800);

  getSizes();

  if (sizeArray.length % 2 === 0) {
    j = sizeArray.length / 2;
  }
  else {
    j = (sizeArray.length + 1) / 2;
  }

  squareSize = j;

  noLoop();
}

//get the appropriate square size values by finding all common factors
//between the width and the height
function getSizes() {

  //if height is greater than width, count to height
  if (height > width) {
    for (let i = 0; i <= height; i++) {
      if (height % i === 0 && width % i === 0) {
        sizeArray.push(i);
      }
    }
  }

  //if width is greater than height, count to width
  if (height < width) {
    for (let i = 0; i <= width; i++) {
      if (height % i === 0 && width % i === 0) {
        sizeArray.push(i);
      }
    }
  }
  print(sizeArray);
}


//resize sketch when canvas resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draw squares for the first time and change square size
function draw() {
  makeSquares();
  print(j);
}


//refresh canvas if key is pressed
function keyPressed() {
  makeSquares();
}

//adjust square size when mouse pressed and 
//then print the newly sized squares
function mousePressed() {

  //squares get smaller if they aren't too small already
  if (mouseButton === LEFT) {
    //theoretically moves j to the next array value to adjust squareSize
    j -= 1;

    // //THIS CAN GO WHEN YOU HAVE FIGURED OUT J
    // if (squareSize < 15) {
    //   squareSize = 15;
    // }
    // else {
    //   squareSize -= 5;
    // }
  }

  //squares get bigger if they aren't too big already
  if (mouseButton === RIGHT) {
    //theoretically moves j to the next array value to adjust squareSize
    j += 1;

    // //THIS CAN GO WHEN YOU HAVE FIGURED OUT J
    // if (squareSize > 800) {
    //   squareSize = 800;
    // }
    // else {
    //   squareSize += 5;
    // }
  }

  makeSquares();
}

//make the squares on the screen
function makeSquares() {
  //squareSize = sizeArray[j];
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      fill(int(random(200, 255)), 0, int(random(100, 150)));
      rect(x, y, squareSize, squareSize);
    }
  }
}
