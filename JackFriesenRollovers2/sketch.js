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
//set values for rgb variables for quadrants































let quadrant = 1; //top left=1 top right=2 bottom left=3 bottom right=4

let r1 = 255; //rgb values for quad 1
let g1 =0;
let b1 = 0;


let r2, g2, b2; //rgb values for quad 2
let r3, g3, b3; //rgb values for quad 3
let r4, g4, b4; //rgb values for quad 4




function setup() {
  createCanvas(windowWidth, windowHeight);

}


function draw() {
  drawSquares();
}

//draw squares and do fade colors
function drawSquares() {
  //quad 1
  fill(r1, g1, b1);
  rect(0, 0, width / 2, height / 2); //quad 1
 
  //quad 2
  fill(r2, g2 b2);
  rect(width / 2, 0, width / 2, height / 2); //quad 2
  
  //quad 3
  fill(r3, g3, b3);
  rect(0, height / 2, width / 2, height / 2); //quad 3
  
  //quad 4
  fill(r4, g4, b4);
  rect(width / 2, height / 2, width / 2, height / 2); //quad 4
}

//check for rollovers and fade
function rollOvers() {

}
