//Color Solutions Demo

let rectWidth = 10;
let rectHeight = 50;
let colors = ["#BAD48B", "#988893", "#8A6E85", "#3E2C38", "#231D1F"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  drawRowRGB(height * 0.2);
  drawRowHSB(height * 0.4);
  drawRowCustom(height * 0.6);
}

function draw() {

}

//RGB Color Method
function drawRowRGB(yPos) {
  colorMode(RGB);
  for (let x = 0; x < width; x += rectWidth) {
    fill(random(255), random(255), random(255));
    rect(x, yPos, rectWidth, rectHeight);
  }
}

//HSB Color Method
function drawRowHSB(yPos) {
  colorMode(HSB, 360);
  for (let x = 0; x < width; x += rectWidth) {
    //fill (HUE, SATURATION, BRIGHTNESS)
    fill(x / 3 % 360, 280, 330);
    rect(x, yPos, rectWidth, rectHeight);
  }
}

function drawRowCustom(yPos) {
  colorMode(RGB);
  let counter = 0;
  for (let x = 0; x < width; x += rectWidth) {
    //fill(colors[counter%5]);
    fill(colors[int(random(colors.length))]);
    rect(x, yPos, rectWidth, rectHeight);
    counter ++;
  }
}