// Basic Transformations Sandbox


let originalSpacing = 20;
let x = 100;
let xSpeed = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //background option 1
  //background(255);

  //background option 2
  fill(255, 20);
  rect(0, 0, width, height);

  drawBasicGrid(220);



  //transformation one: TRANSLATION
  // push();
  // translate(100, 20);
  // rectangleRed(0, 0);
  // pop();

  // push();
  // translate(mouseX, mouseY);
  // drawBasicGrid(75);
  // rectangleBlue(0, 0);
  // pop();





  //transformation two: SCALE
  // rectangleRed(20, 20);
  
  // push();
  // rectMode(CENTER);
  // translate(100, 100);
  // scale(mouseX / 100);

  // drawBasicGrid(50);
  // rectangleBlue(0, 0);
  // pop();




  //transformation three: ROTATION
  //reminder: rotations are measured in radians, not degrees!
  // Functions can help with the conversion...
  push();
  translate(x, 60);
  rotate(radians(frameCount));
  scale(mouseX /width * 2);
  face(0, 0);
  pop();

  x += xSpeed;
  if(x < 40 || x > width - 40) {
    xSpeed *= -1;
  }



  //Combinations of Transformations



}


function face(x, y) {
  //draw a face at x,y
  push();
  translate(x, y);
  ellipseMode(CENTER);
  fill(200, 200, 0);
  //fill(random(200, 255), random(100, 250), random(75));
  stroke(0);
  ellipse(0, 0, 80, 80);
  fill(90, 140, 30, 220);
  triangle(-20, 20, 20, 20, 0, 30);
  fill(0);
  ellipse(-25, 0, 10, 10);
  ellipse(25, 0, 10, 10);
  strokeWeight(5);
  line(-30, -10, 30, -10);
  strokeWeight(1);
  pop();

}

function rectangleRed(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) -
  // to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(255, 0, 0, 150);
  rect(x, y, 50, 50);

}

function rectangleBlue(x, y) {
  //draw a red rectangle at x,y (sized 50 pixels square) - 
  //to visualize what happens to the coordinate system
  //when different basic transformations are applied.
  noStroke();
  fill(0, 0, 255, 150);
  rect(x, y, 50, 50);

}

function drawBasicGrid(shade) {
  //draw the normal cartesian Coordinate Grid, in a light color. 
  //Spaced at 20 px by default
  stroke(shade);
  for (let x = 0; x < width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 20) {
    line(0, y, width, y);
  }
}
