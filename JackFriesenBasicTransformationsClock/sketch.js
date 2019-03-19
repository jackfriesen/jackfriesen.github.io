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
  background(200, 0, 60);
  drawClock();
}

function drawClock() {
  push();

  translate(width / 2, height / 2);
  ellipseMode(CENTER);
  strokeWeight(3);
  ellipse(0, 0, 600, 600);


  //draw big ticks
  for (let i = 0; i < 360; i += 6) {
    push();

    rotate(radians(i));
    if (i % 30 === 0) {
      //thick line
      strokeWeight(5);
      line(230, 0, 290, 0);
    }
    else {
      //thin line
      strokeWeight(2);
      line(250, 0, 290, 0);
    }


    pop();
  }

  //make the hands
  //second hand
  push();
  rotate(radians(frameCount));
  strokeWeight(2);
  line(0, 0, 300, 0);
  pop();

  push();
  rotate(radians(frameCount/6));
  strokeWeight(4);
  line(0, 0, 0, -300);

  pop();

  push();
  rotate(radians(frameCount/12));
  strokeWeight(4);
  line(0, 0, -300, 0);

  pop();

  pop();
}