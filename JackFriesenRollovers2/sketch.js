// Rollovers
// Jack Friesen
// Tuesday, February 26th
//
//top left is quad one
//top right is 2
//bottom left is 3
// bottom right is 4

//NOTES
//
//extra for experts:
//-for changing color, use three vars like rectShade 
// and add/subtract to them everytime or use fixed values









//TO DO
//
//create fade 
//mouse over variable??





















//declare variables for quadrant locations and size
let quad1X, quad1Y, quad1SizeX, quad1SizeY; 
let quad2X, quad2Y, quad2SizeX, quad2SizeY;
let quad3X, quad3Y, quad3SizeX, quad3SizeY;
let quad4X, quad4Y, quad4SizeX, quad4SizeY;



function setup() {
  createCanvas(windowWidth, windowHeight);

  //set values for quadrant one
  quad1X = 0;
  quad1Y = 0;
  quad1SizeX = width / 2;
  quad1SizeY = height / 2;

  //set values for quadrant two
  quad2X = width / 2;
  quad2Y = 0;
  quad2SizeX = width / 2;
  quad2SizeY = height / 2;

  //set values for quadrant three 
  quad3X = 0;
  quad3Y = height / 2;
  quad3SizeX = width / 2;
  quad3SizeY = height / 2;

  //set values for quadrant four
  quad4X = width / 2;
  quad4Y = height / 2;
  quad4SizeX = width / 2;
  quad4SizeY = height / 2;
}

function draw() {
  
  //draw quadrant 1 and check for rollover
  if (mouseX <= width / 2 && mouseY <= height / 2) {
    fill(0);
    rect(quad1X, quad1Y, quad1SizeX, quad1SizeY);
    //set mouseOver var to true
  }
  //reset to white
  else {
    fill(255);
    rect(quad1X, quad1Y, quad1SizeX, quad1SizeY);
  }

  //draw quadrant 2 and check for rollovers
  if(mouseX >= width/2 && mouseY <= height/2){
    fill(0);
    rect(quad2X, quad2Y, quad2SizeX, quad2SizeY);
  }
  //reset to white
  else {
    fill(255);
    rect(quad2X, quad2Y, quad2SizeX, quad2SizeY);
  }

  //draw quadrant 3 and check for rollovers
  if(mouseX <= width/2 && mouseY >= height/2) {
    fill(0);
    rect(quad3X, quad3Y, quad3SizeX, quad3SizeY);
  }
  //reset to white
  else {
    fill(255);
    rect(quad3X, quad3Y, quad3SizeX, quad3SizeY);
  }

  //draw quadrant 4 and check for rollovers
  if(mouseX >= width/2 && mouseY >= height/2) {
    fill(0);
    rect(quad4X, quad4Y, quad4SizeX, quad4SizeY);
  } 
  //reset to white
  else {
    fill(255);
    rect(quad4X, quad4Y, quad4SizeX, quad4SizeY);
  }  
}
