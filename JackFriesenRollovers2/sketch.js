// Rollovers
// Jack Friesen
// Tuesday, February 26th
//
//top left is quad one
//top right is 2
//bottom left is 3
// bottom right is 4

//NOTES
//
//extra for experts:
//-for changing color, use three vars like rectShade 
// and add/subtract to them everytime or use fixed values





//TO DO
//
//mousePressed function created and given appropriate tasks
//
//while quadrant = 1 have black squares then initialize fade
//use while loop to fade back to red










let quadrant = 1; //top left=1 top right=2 bottom left=3 bottom right=4

let r1 = 255; //rgb values for quad 1
let g1 = 0;
let b1 = 0;

let r2 = 255; //rgb values for quad 2
let g2 = 0;
let b2 = 0;

let r3 = 255; //rgb values for quad 3
let g3 = 0;
let b3 = 0;

let r4 = 255; //rgb values for quad 4
let g4 = 0;
let b4 = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);

}


function draw() {
  drawSquares();
  rollOvers();
  fade();
}

function mousePressed() {
  while (quadrant === 1) {

  }
}

function fade() {
  //fade quad 1
  if (quadrant === 1) {
    g1 = 255;
  }
  else {
    if (g1 > 0) {
      g1 -= 10;
    }
  }

  //fade quad 2
  if (quadrant === 2) {
    g2 = 255;
  }
  else {
    if (g2 > 0) {
      g2 -= 10;
    }
  }

  //fade quad 3
  if (quadrant === 3) {
    g3 = 255;
  }
  else {
    if (g3 > 0) {
      g3 -= 10;
    }
  }

  //fade quad 4
  if (quadrant === 4) {
    g4 = 255;
  }
  else {
    if (g4 > 0) {
      g4 -= 10;
    }
  }
}

//check for rollovers and change quadrant state
function rollOvers() {
  if (mouseX < width / 2) {
    if (mouseY < height / 2) {
      quadrant = 1; // top left
    }
    else {
      quadrant = 3; //bottom left
    }
  }

  if (mouseX > width / 2) {
    if (mouseY < height / 2) {
      quadrant = 2; //top right
    }
    else {
      quadrant = 4; //bottom right 
    }
  }
}

//draw squares and do starting colors
function drawSquares() {
  //quad 1
  fill(r1, g1, b1);
  rect(0, 0, width / 2, height / 2); //quad 1

  //quad 2
  fill(r2, g2, b2);
  rect(width / 2, 0, width / 2, height / 2); //quad 2

  //quad 3
  fill(r3, g3, b3);
  rect(0, height / 2, width / 2, height / 2); //quad 3

  //quad 4
  fill(r4, g4, b4);
  rect(width / 2, height / 2, width / 2, height / 2); //quad 4
}


