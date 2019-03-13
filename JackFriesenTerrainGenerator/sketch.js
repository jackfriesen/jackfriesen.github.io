//Terrain Generator
//
//Generates random terrain using perlin noise;





function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
}

function draw() {

}

function generateTerrain() {
  let yOff = 0;
  let x = 0;
  for (let i = 0; i <= width; i++) {
    let y = map(noise(yOff), 0, 1, 0, height);

    yOff -= 0.01;

    fill(0);
    //fill(0);
    rect(x, y, 2, height - y);

    x += 1;
  }
}

function keyPressed() {
  background(255);
  generateTerrain();
}

function drawFlag(x, y) {
  
}