// unsolved (for now) circle project


//TO DO 
//
//NOTE CONVERSION BELOW
///USE CONVERSION TO DO MATH W REGULAR POLYGON

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  ellipse(0, 0, 500, 500);
  ellipse(0, -150, 200, 200);
  ellipse(-150, 0, 200, 200);
}




  // // Convert polar to cartesian
  // let x = r * cos(theta);
  // let y = r * sin(theta);

  // // Draw the ellipse at the cartesian coordinate
  // ellipseMode(CENTER);
  // noStroke();
  // fill(200);
  // ellipse(x, y, 32, 32);


