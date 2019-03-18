function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // let angle = atan2(mouseY - 300, mouseX - 300);

  // background(255);
  // push();
  // translate(300, 300);
  // rotate(angle);
  // fill(0);
  // rect(0, 0, 50, 10);
  // pop();

  drawClock();
}

function drawClock() {
  translate(width / 2, height / 2);
  ellipseMode(CENTER);
  ellipse(0, 0, 600, 600);

  push();
  rectMode(CENTER);
  //draw big ticks
  for (let i = 0; i < 6; i++) {
    rect(0, -200, 10, 40);
  }
  pop();
}