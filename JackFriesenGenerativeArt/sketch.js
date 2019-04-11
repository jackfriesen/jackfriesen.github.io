//Generative Art

//save();
//
//4500 x 3000 max dimensions
//
//zoom out of browser window if you can't see full image
//bc canvas is too big


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function keyPressed() {
  if(keyCode === " ") {
    save();
  }
}
