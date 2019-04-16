//Generative Art

//save();
//
//4500 x 3000 max dimensions
//
//zoom out of browser window if you can't see full image
//bc canvas is too big

//TO DO
//
//CHOOSE A FILL
//
//fix line y2
//
//fix save() function

let circSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  circSize = random(60, 80);
}

function draw() {
  background(0);
  drawCircles();
}

function keyPressed() {
  if (keyCode === " ") {
    save();
  }
}

function drawCircles() {
  for(let x = 40; x < width; x += circSize + 10) {
    push();
    stroke(150);
    strokeWeight(3);
    line(x, 0, x, height - circSize);
    pop();
    for(let y = 20; y < height - circSize; y += circSize) {
      fill(random(255), random(100), 55);
      fill(random(245), random(90), 45);
      //fill(random(245), random(80), 35);
      ellipse(x, y, circSize, circSize);
      circSize = random(20, 60);
    }
  }
}