//Terrain Generator
//
//Generates random terrain using perlin noise;

//TO DO
//
//USE COMMENTED OUT SECTIONS TO ADJUST FLAG POSITION

let inc = 0.01;
let start = 0;
let rectWidth = 5;
//let flagSpot = 0;


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
  for (let x = 0; x < width; x++) {
    let y = noise(xOff) * height;
    rect(x, y, rectWidth, height - y);
    //  if( y > flagSpot) {
    //    flagSpot = abs(y); //do i need abs????
    //    print(flagSpot);
    //  }
    xOff += inc;
  }
  start += inc;
}

function keyPressed() {
  background(255);
  generateTerrain();
}

function drawFlag(x, y) {
  //  let rectX = flagSpot;
  //  let rectY = flagSpot + 20;
  let rectX = 20;
  let rectY = 20;
  fill(0);
  rect(rectX, rectY, 1, 20);
  triangle(rectX + 1, rectY + 1, rectX, rectY - 5, rectX + 12, rectY - 5 / 2);
}