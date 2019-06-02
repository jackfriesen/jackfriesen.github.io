// Final
//puzzle/platformer
//game is meant to be played on devices with a resolution of 1600 x 789 or higher

//new laptop resolution is 981x754

//horizontal platforms are 180x15
//vertical platforms are 15x150


//FOR COLLISIONS
//
//check if "platforms[i].getX" works, if not use platformsX array

//universal vars
let platforms = [];
let hit = false;
let platX, platY; 
//let platW, platH;

let count = 0;


function setup() {
  createCanvas(1600, 789);
  loadLevelOne();
}

function loadLevelOne() {
  //initialize hero location
  //x = ???
  //y = ???

  for(let i = 0; i < 20; i++) {
    platX = 0;
    platY = height - 15;

    platforms.push(new Platform(platX, platY, 180, 15));
    platX += 180;
  }
}

function draw() {
  background(150);
}







//CLASSES//
//**************************************************************************************************************************************************************************//

//playable hero character
class Hero {

}

// platform object for level building
class Platform {
  //Constructor and Class Properties
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
  }

  //Class Methods
  display() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}

//************************************************************************************************************************************************************************//