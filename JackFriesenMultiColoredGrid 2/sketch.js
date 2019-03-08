// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//TO DO 
//
//j is supposed to be halfway through the size array and squareSize uses j to
//browse the size array values and change square size based on that



let squareSize = sizeArray.indexOf(j);



let sizeArray = [];
let j = sizeArray.length / 2;

function setup() {
  createCanvas(1000, 800);

  getSizes();

  noLoop();
}

function getSizes() {
  //if height is greater than width, count to height
  if (height > width) {
    for (let i = 0; i <= height; i++) {
      if (height % i === 0 && width % i === 0) {
        sizeArray.push(i);
        print(sizeArray);
      }
    }
  }

  //if width is greater than height, count to width
  if (height < width) {
    for (let i = 0; i <= width; i++) {
      if (height % i === 0 && width % i === 0) {
        sizeArray.push(i);
        print(sizeArray);
      }
    }
  }
}


//resize sketch when canvas resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draw squares for the first time and change square size
function draw() {
  makeSquares();
}


//refresh canvas if key is pressed
function keyPressed() {
  makeSquares();
}

//change size when mouse pressed
function mousePressed() {
  //squares get smaller if they aren't too small already
  if (mouseButton === LEFT) {
    j -= 1;
    if (squareSize < 15) {
      squareSize = 15;
    }
    else {
      squareSize -= 5;
    }
  }
  //squares get bigger if they aren't too big already
  if (mouseButton === RIGHT) {
    j += 1;
    if (squareSize > 800) {
      squareSize = 800;
    }
    else {
      squareSize += 5;
    }
  }
  makeSquares();
}

//make the squares on the screen
function makeSquares() {
  for (let x = 0; x < width; x += squareSize) {
    for (let y = 0; y < height; y += squareSize) {
      fill(int(random(200, 255)), 0, int(random(100, 150)));
      rect(x, y, squareSize, squareSize);
    }
  }
}
