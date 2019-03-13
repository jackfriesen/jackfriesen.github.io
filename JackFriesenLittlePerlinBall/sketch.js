//Perlin Noise Ball
//
//Uncomment stuff to add noise to y values to create
//diagonal movement


let xOff = 0;
//let yOff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let x = map(noise(xOff), 0, 1, 0, width);

  //let y = map(noise(yOff), 0, 1, 0, height);

  xOff -= 0.01;

  //yOff -= 0.01;

  //ellipse(x, y, 24, 24);

  ellipse(x, height /2, 24, 24);


}
