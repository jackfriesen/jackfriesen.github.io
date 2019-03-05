// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 255, 120);
  slider.position(10, 10);
  slider.style("width", "80px");
}

function draw() {
  background(255);
  //print(slider.value());
  textSize(80);
  text(slider.value(), 20, 100);

}
