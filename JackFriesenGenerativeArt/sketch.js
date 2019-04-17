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
let circlesArray = [];

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

function sumArray() {
  let sum = 0;
  for(let i = 0; i < circlesArray.length; i ++) {
    sum += circlesArray[i];
  }
  print(sum);
  return sum;
}

function drawCircles() {
  let i =0;
  for(let x = 40; x < width; x += circSize + 5) {
    for(let y = 20; y < height - circSize; y += circSize) {
      circlesArray.push(circSize);
      circSize = random(20, 60);
    }
    push();
    stroke(125);
    strokeWeight(3);
    line(x, 0, x, sumArray());
    pop();
    for(let y = 20; y < height - circlesArray[i]; y += circlesArray[i]) {
      fill(random(245), random(90), 45);
      ellipse(x, y, circlesArray[i], circlesArray[i]);
      i++;
    }
  }
}