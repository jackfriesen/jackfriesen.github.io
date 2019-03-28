//make white squares and 
//change to black if mouse is over them

function setup() { 
  createCanvas(480, 270); 
}

function draw() {
  background(255); 
  stroke(0); 
  makeSquares();
}

//make squares and check mouse position to adjust color
function makeSquares() {
  line(240, 0, 240, 270); 
  line(0, 135, 480, 135);
  noStroke(); 
  fill(0);
  if (mouseX < 240 && mouseY < 135) { 
    rect(0, 0, 240, 135); 
  }
  else if (mouseX > 240 && mouseY < 135) { 
    rect(240, 0, 240, 135); 
  }
  else if (mouseX < 240 && mouseY > 135) { 
    rect(0, 135, 240, 135); 
  }
  else if (mouseX > 240 && mouseY > 135) { 
    rect(240, 135, 240, 135); 
  }
}