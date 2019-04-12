//Replicate Generative Art by Michael Noll































//TO DO
//
//find random range for xPos, yPos, and control point values
//(find good values for bezier three first!!)

































































const NUM_LINES = 59;

let b1X1, b1Y1, b1X2, b1Y2, b1ControlX1, b1ControlY1, b1ControlX2, b1ControlY2;
let b2X1, b2Y1, b2X2, b2Y2, b2ControlX1, b2ControlY1, b2ControlX2, b2ControlY2;
let b3X1, b3Y1, b3X2, b3Y2, b3ControlX1, b3ControlY1, b3ControlX2, b3ControlY2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  setFirstBezier();
  setSecondBezier();
  setThirdBezier();

  makeWaves();
}

function setFirstBezier() {
  //set end points for bezier
  b1X1 = width / 2 - 375;
  b1Y1 = height / 2 - 300;
  b1X2 = width / 2 - 150;
  b1Y2 = height / 2 - 300;

  //set control magnets for bezier
  b1ControlX1 = b1X1 + 40;
  b1ControlY1 = sin(120);
  b1ControlX2 = b1X2 - 100;
  b1ControlY2 = b1Y2 + 100;
}

function setSecondBezier () {
  //set end points for bezier
  b2X1 = b1X2;
  b2Y1 = b1Y2;
  b2X2 = width / 2 + 50;
  b2Y2 = height / 2 - 350;

  //set control magnets for bezier
  b2ControlX1 = 350;
  b2ControlY1 = sin(120) * 60;
  b2ControlX2 = 450;
  b2ControlY2 = sin(120) * 60;
}

function setThirdBezier () {
  //set end points for bezier
  b3X1 = b2X2;
  b3Y1 = b2Y2;
  b3X2 = width -40;
  b3Y2 = height / 2 - 350;

  //set control magnets for bezier
  b3ControlX1 = 480;
  b3ControlY1 = sin(120) * 20;
  b3ControlX2 = 450;
  b3ControlY2 = sin(120) * 60;
}

function makeWaves() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(10);

  // point(b1X1, b1Y1);
  // point(b1ControlX1, b1ControlY1);
  // point(b1ControlX2, b1ControlY2);
  // point(b1X2, b1Y2);

  // point(b3X1, b3Y1);
  // point(b3ControlX1, b3ControlY1);
  // point(b3ControlX2, b3ControlY2);
  // point(b3X2, b3Y2);

  strokeWeight(2);

  //make first bezier
  for (let i = 0; i < NUM_LINES; i++) {
    bezier(b1X1, b1Y1, b1ControlX1, b1ControlY1, b1ControlX2, b1ControlY2, b1X2, b1Y2);
    b1Y1 += 10;
    b1Y2 += 10;
    b1ControlY1 += 10;
    b1ControlY2 += 10;
  }

  //make second bezier
  for (let i = 0; i < NUM_LINES; i++) {
    bezier(b2X1, b2Y1, b2ControlX1, b2ControlY1, b2ControlX2, b2ControlY2, b2X2, b2Y2);
    b2Y1 += 10;
    b2Y2 += 10;
    b2ControlY1 += 10;
    b2ControlY2 += 10;
  }

  //make third bezier
  for (let i = 0; i < NUM_LINES; i++) {
    bezier(b3X1, b3Y1, b3ControlX1, b3ControlY1, b3ControlX2, b3ControlY2, b3X2, b3Y2);
    b3Y1 += 10;
    b3Y2 += 10;
    b3ControlY1 += 10;
    b3ControlY2 += 10;
  }
}


