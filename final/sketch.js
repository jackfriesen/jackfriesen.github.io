// Final
//puzzle/platformer

//MAKE 8 BIT ART HERE
// https://make8bitart.com/

//floors hex is 664C4C & 4C3333

let floor = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  floor.push(loadImage("assets/floor.png"));
}

function draw() {
  background(0);
  image(floor[0], width /2, height /2);
}


class Hero {

}


//PUZZLE IDEAS

//Block Puzzle
//-push blocks around to reach heights you cannot jump to or to stay 
//on switches so you can go through a door

//skylanders flip puzzle

