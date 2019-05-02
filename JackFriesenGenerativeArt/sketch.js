//Generative Art

//save();
//
//4500 x 3000 max dimensions
//
//zoom out of browser window if you can't see full image
//bc canvas is too big

let circSize;

function setup() {
  createCanvas(4500, 3000);
  ellipseMode(CENTER);
  noLoop();
  circSize = random(80, 120);
  strokeWeight(25);
}

function draw() {
  background(0);
  drawCircles();
}

function keyPressed() {
  if(key === " ") {
    save();
  }
}

function drawCircles() {
  let y1; //needs to be first circ size
  let y2 = 0; //needs to be second circ size
  for (let x = 30; x < width; x += circSize + random(45, 55)) {
    y1 = 20;
    for (let y = 20; y < height - circSize; y += circSize + 15) {
      circSize = random(80, 120);
      y2 = y1 + circSize + 20;
      fill(random(255), random(100), 55);
      if(y2 < height - 40) {
        push();
        stroke(125);
        strokeWeight(10);
        line(x, y1, x, y2);
        print(y2, "y1");
        pop();
        ellipse(x, y1, circSize, circSize);
        y1 = y2;
      }
    }
    circSize = random(80, 120);
    fill(random(245), random(90), 45);
    ellipse(x, y1, circSize, circSize);
  } 
}