//Terrain Generator
//
//Generates random terrain using perlin noise;




function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
  drawFlag();
}

function draw() {

}

function generateTerrain() {
  let yOff = 0;
  let x = 0;
  for (let i = 0; i <= width; i++) {
    let y = map(noise(yOff), 0, 1, 0, height);

    yOff += 0.001;

    fill(0);
    rect(x, y, 2, height - y);

    x += 1;
  }
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
  triangle(rectX + 1, rectY + 1, rectX, rectY - 5, rectX + 12, rectY - 5/2);
}