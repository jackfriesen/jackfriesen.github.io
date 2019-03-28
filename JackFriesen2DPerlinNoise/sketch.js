//make 2d perlin noise


let inc = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let yOff = 0;

  loadPixels();
  for (let y = 0; y < height; y++) {
    let xOff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + (y * width)) * 4;
      let r = noise(xOff, yOff) * 255;
      let g = noise(xOff, yOff) * 255 - 125;
      let b = noise(xOff, yOff) * 255 - 200;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;
      xOff += inc;
    }
    yOff += inc;
  }
  updatePixels();
  noLoop();
}