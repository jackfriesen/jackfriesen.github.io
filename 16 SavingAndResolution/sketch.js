// Saving images with good resolution

function setup() {
  createCanvas(4500, 3000);
  background(0);
}

function draw() {
  fill(255);
  ellipse(width / 2, height / 2, 2000, 2000);
}

function keyPressed() {
  if(key === " ") {
    save();
  }
}