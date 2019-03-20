// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let imgArray = [];


function preload() {
  for (let i = 0; i < 4; i++) {
    let img = loadImage("Bowser_right" + i + ".png");
    imgArray.push(img);
  }

  for (let j = 4; j < 8; j++) {
    let img1 = loadImage("Bowser_left" + j + ".png");
    imgArray.push(img1);
  }

  for (let k = 8; k < 12; k++) {
    let img2 = loadImage("Bowser_idle" + k + ".png");
    imgArray.push(img2);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
