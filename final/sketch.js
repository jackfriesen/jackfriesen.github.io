// Final
//puzzle/platformer



//FIND TEMPORARY OBJECTS AND MAKE ART AFTER





//TODAY
//
//CREATE ENVIRONMENT LEVEL 1 WITH HIT BOXES


























let imgArray = [];
let platformImg = [];
let platforms = [];
let hit = false;

function preload() {
  platformImg.push(loadImage("assets/platform.png"));

  //load right states
  for (let i = 0; i < 4; i++) {
    imgArray.push(loadImage("assets/Bowser_right" + i + ".png"));
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  platforms.push(new Platform(width / 2, height / 2));
}

function draw() {
  background(0);
  //rect(mouseX, mouseY, 55, 58);
  image(imgArray[0], mouseX, mouseY);

  //rect(width / 2, height / 2, 180, 15);
  platforms[0].display();

  hit = collideRectRect(width / 2, height / 2, 180, 15, mouseX, mouseY, 55, 58);
  print(hit);

}




class Hero {

}

class Platform {
  //Constructor and Class Properties
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.w = platformImg[0].width;
    this.h = platformImg[0].height;
  }

  //Class Methods

  display() {
    image(platformImg[0], this.x, this.y);
  }
}


