// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let colors = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  colors.push(color(255, 0, 0));
  colors.push(color(255));
  colors.push(color(255, 0, 0));
  colors.push(color(255));
  colors.push(color(255, 0, 0));
}

function drawTargetWhile() {
  let diameter = 200;
  let counter = 0;
  while (counter < 5) {
    ellipse(width / 2, height / 2, diameter, diameter);
    diameter -= 40;
    counter++;
  }
}

function drawTargetFor() {

  for (let i = 5; i > 0; i--) {
    fill(colors[i - 1]);
    ellipse(x, y, i * 40, i * 40);
  }
}

function draw() {
  background(220, 150, 50);

  translate(width/2, height/2);
  //drawTargetWhile();
  drawTargetFor();
}
