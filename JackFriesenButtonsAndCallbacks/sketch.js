// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sliderR;
let sliderG;
let sliderB;

let radio;



function setup() {
  createCanvas(windowWidth, windowHeight);
  makeSliders();
  makeRadio();
}

function makeSliders() {
  //makes slider for red fill value
  sliderR = createSlider(0, 255, 255);
  sliderR.position(0 + 100, height - 150);

  //makes slider for green fill value
  sliderG = createSlider(0, 255, 142);
  sliderG.position(0 + 100, height - 100);

  //makes slider for blue fill value
  sliderB = createSlider(0, 255, 0);
  sliderB.position(0 + 100, height - 50);
}

function makeRadio() {
  //makes radio buttons for rectangle and ellipse
  radio = createRadio();
  radio.position(width/2 - 80, 10);
  radio.option("Rectangle");
  radio.option("Ellipse");
}

function draw() {
  sliders();
  drawShapes();
}

//create sliders and adjust numbers and background color
function sliders() {
  //update background color
  let r = sliderR.value();
  let g = sliderG.value();
  let b = sliderB.value();
  background(r, g, b);

  //show num for red value and indicate red
  textSize(50);
  text(sliderR.value(), 250, height - 125);
  text("R:", 30, height - 125);

  //show num for green value and indicate green
  textSize(50);
  text(sliderG.value(), 250, height - 75);
  text("G:", 30, height - 75);

  //show num for blue value and indicate blue
  textSize(50);
  text(sliderB.value(), 250, height - 25);
  text("B:", 30, height - 25);
}

//draws shapes based on radio button data
function drawShapes() {
  
}