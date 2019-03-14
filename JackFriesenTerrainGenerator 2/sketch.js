//Terrain Generator
//
//Generates random terrain using perlin noise;

let inc = 0.01;
let start = 0;
let rectWidth = 5;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
}

function draw() {
  background(255);
  fill(0);
  generateTerrain();
}

function generateTerrain() {
  let xOff = start;
  for (let x = 0; x < width; x++) {
    let y = noise(xOff) * height;
    rect(x, y, rectWidth, height - y);
    xOff += inc;
  }
  start += inc;
}

function keyPressed() {
  background(255);
  generateTerrain();
}

function drawFlag(x, y) {
  let rectX = 20;
  let rectY = 20;
  fill(0);
  rect(rectX, rectY, 1, 20);
  triangle(rectX + 1, rectY + 1, rectX, rectY - 5, rectX + 12, rectY - 5 / 2);
}