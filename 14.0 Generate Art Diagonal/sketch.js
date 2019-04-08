//Generative Art

const SPACING = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(0);
  strokeWeight(7);
  //stroke(255, 255, 0); //yellow
  stroke(255, 192, 203); //pink
  for( let x = SPACING /2; x < width - SPACING / 2; x += SPACING) {
    for(let y = SPACING /2; y < height - SPACING /2; y += SPACING) {
      if(int(random(2)) === 0) {
        diagonalDescending(x, y, SPACING);
      }
      else {
        diagonalAscending(x, y, SPACING);
      }
      
    }
  }
  
}

//draw ascending diagonal lines in 
//reference to center point
function diagonalAscending(x, y, s) {
  line(x - s / 2, y + s / 2, x + s / 2, y - s / 2);
}

function diagonalDescending(x, y, s) {
  line(x - s / 2, y - s / 2, x + s / 2, y + s / 2);
}
