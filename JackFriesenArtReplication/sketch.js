//Replicate Generative Art by Michael Noll

//TO DO
//
//use sin function on a bezier

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(5);

  //links to curve end points
  point(250, 150);
  point(350, 150);

  //links to bezier end points
  point(200, 200);
  point(400, 200);

  strokeWeight(2);
  bezier(200, 200, 250, 150, 350, 150, 400, 200);
  curve(200, 200, 250, 150, 350, 150, 400, 200);

}

function makeWave() {

}
