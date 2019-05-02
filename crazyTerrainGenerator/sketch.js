//Terrain Generator
//
//Generates random terrain using perlin noise;

let inc = 0.01;
let start = 0;
let rectWidth = 5;
let flagSpotX;
let flagSpotY;
let count = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  //noLoop();
  colorMode(HSB, 360);
}

function draw() {
  background(255);
  
  generateTerrain();
  drawFlag();
}

function generateTerrain() {
  let xOff = start;
  flagSpotY = height;
  flagSpotX = 0;

  for (let x = 0; x < width; x++) {
    fill(count % 360, 360, 360);
    stroke(count % 360, 360, 360);
    let y = noise(xOff) * height;

    let rectHeight = height - y; 

    rect(x, y, rectWidth, rectHeight);

    if (y < flagSpotY) {
      flagSpotY = y; 
      flagSpotX = x;
    }

    xOff += inc;
    count++;
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