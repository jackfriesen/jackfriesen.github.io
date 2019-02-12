// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//create canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

//write name
function draw() {
  textFont("Times New Roman");
  textSize(30);
  fill(255);
  text("Jack Friesen", windowWidth-160, windowHeight-10);
}

//draw shapes via user input
function keyTyped() {
  if(key==="a") {
    fill(random(255), random(255), random(255));
    rect(mouseX, mouseY, 50, 40); 
  }
  if(key==="s") {
    fill(random(255), random(255), random(255));
    ellipse(mouseX, mouseY, 50, 40);
  }
  if(key==="d") {
    fill(random(255), random(255), random(255));
    triangle(mouseX-20, mouseY+20, mouseX-20, mouseY-20, mouseX+20, mouseY+20);
  }
}