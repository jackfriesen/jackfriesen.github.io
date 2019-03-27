//Terrain Generator
//
//Generates random terrain using perlin noise;

let inc = 0.01;
let start = 0;
let rectWidth = 5;
let flagSpotX;
let flagSpotY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
}

function draw() {
  background(255);
  fill(0);
  generateTerrain();
  drawFlag();
}

function generateTerrain() {
  let xOff = start;
  flagSpotY = height;
  flagSpotX = 0;

  for (let x = 0; x < width; x++) {
    let y = noise(xOff) * height;

    let rectHeight = height - y; 

    rect(x, y, rectWidth, rectHeight);

    if (y < flagSpotY) {
      flagSpotY = y; 
      flagSpotX = x;
    }

    xOff += inc;
  }

  start += inc;
}

function keyPressed() {
  background(255);
  generateTerrain();
}

function drawFlag() {
  let rectX = flagSpotX;
  let rectY = flagSpotY - 20;
  fill(0);
  rect(rectX, rectY, 1, 20);
  triangle(rectX + 1, rectY + 1, rectX, rectY - 8, rectX + 12, rectY - 5 / 2);
}