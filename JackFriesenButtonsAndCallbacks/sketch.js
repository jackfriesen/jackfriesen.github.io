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

  //create the sliders
  makeSliders();

  //create radio buttons
  makeRadio();

  //set initial shape to be a rectangle
  radio.value("Rectangle");
}

//create sliders
function makeSliders() {
  //makes slider for red fill value
  sliderR = createSlider(0, 255, 255);
  sliderR.position(0 + 100, height - 150);

  //makes slider for green fill value
  sliderG = createSlider(0, 255, 128);
  sliderG.position(0 + 100, height - 100);

  //makes slider for blue fill value
  sliderB = createSlider(0, 255, 0);
  sliderB.position(0 + 100, height - 50);
}

//makes radio buttons for rectangle and ellipse
function makeRadio() {
  radio = createRadio();
  radio.position(width/2 - 80, 10);
  radio.option("Rectangle");
  radio.option("Ellipse");
}

function draw() {
  sliders();
  drawShapes();
}

//when slider used, adjust slider numbers and background color
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
  //draw rectangle if rectangle radio button pressed
  if(radio.value() === "Rectangle") {
    push();
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(width/2, height/2, 100, 100);
    pop();
  }

  //draw ellipse if ellipse radio button pressed
  if(radio.value() === "Ellipse") {
    push();
    ellipseMode(CENTER);
    fill(50, 50, 200);
    ellipse(width/2, height/2, 100, 100);
    pop();
  }
}

