//3d primitives and fractal

let angle = 5;
let angleSpeed = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
}

function draw() {
  //fill(random(255), random(255), random(255));
  //angle = map(mouseX, 0, width, -120, 120);
  angle += angleSpeed;
  if(angle < -40 || angle > 40) {
    angleSpeed *= -1;
  }
  background(220);
  push();
  rotateY(radians(frameCount));
  // rotateY(radians(frameCount));
  // rotateX(radians(frameCount * -1));
  // torus(100);
  for (let i = 0; i < 360; i += 45) {
    push();
    rotateY(radians(i));
    boxes(60);
    pop();
  }
  pop();

}

function boxes(size) {
  fill(random(255), random(255), random(255));
  if (size > 5) {
    rotateZ(radians(angle));

    // //cool block explosion
    //rotateZ(angle);

    translate(1.5 * size, 0);
    box(size);

    boxes(size * 0.8);
  }
}
