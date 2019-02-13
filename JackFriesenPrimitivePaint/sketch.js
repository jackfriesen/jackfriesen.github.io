// Primitive Paint    
// Jack Friesen
// Tuesday, February 12
//
//program is designed to allow the user to draw shapes 
//of random color on a canvas  

let rectSize = 50;
let rectSpeed = 1;

//create canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(0);
  //write name
  textFont("Times New Roman");
  textSize(30);
  fill(255);
  text("Jack Friesen", windowWidth - 160, windowHeight - 10);

  //draw autonomous flashy shape
  fill(random(255), random(255), random(255));
  rect(windowWidth / 2, windowHeight / 2, rectSize, rectSize);
  if(rectSize > 100 || rectSize < 50) {
    rectSpeed *= -1;
  }
  
  rectSize += rectSpeed;

}

function prev() {
  fill(random(255), random(255), random(255));
  rect(mouseX, mouseY, 50, 40);
}


//draw shapes via user input
function keyTyped() {
  //draw rectangle
  if (key === "a") {
    prev();
    if(mouseIsPressed) {
      rect(mouseX, mouseY, 50, 40);
    }
  }
  //draw oval
  if (key === "s") {
    fill(random(255), random(255), random(255));
    ellipse(mouseX, mouseY, 50, 40);
  }
  //draw triangle
  if (key === "d") {
    fill(random(255), random(255), random(255));
    triangle(mouseX - 20, mouseY + 20, mouseX - 20, mouseY - 20, mouseX + 20, mouseY + 20);
  }
  if (key === " "){
    background(0);
  }
}