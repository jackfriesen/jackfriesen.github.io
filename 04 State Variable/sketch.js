// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = 0; //0 = top, 1 = right, 2 = bottom, 3 = left
const rectSize = 30;
let x = 0;
let y = 0;

let count = 0;
let countSpeed = -1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  if(count === 0){
    fill(255, 0, 0);
    countSpeed *= -1;
  }
  if(count === 180) {
    fill(0, 255, 0);
    countSpeed *= -1;
  }

  count += countSpeed;

  if(state === 0) { //on top, going right
    x += 5;
    if(x >= windowWidth - rectSize){
      state = 1;
    } 
  }else if (state === 1) { //on right going down
    y += 5;
    if(y >= windowHeight - rectSize){
      state = 2;
    } 
  }else if(state ===2){ //on bottom going left
    x -= 5;
    if(x <= 0) {
      state = 3;
    } 
  }else if (state === 3){
    y -= 5;
    if(y <= 0){
      state = 0;
    }
  }

  rect(x, y, rectSize, rectSize);
}
