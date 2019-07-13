//Clarenz bday program

let radio;

function setup() {
  createCanvas(windowWidth, windowHeight);

  makeRadio();

  //set initial shape to be a rectangle
  radio.value("Rectangle");
}

//makes radio buttons for rectangle and ellipse
function makeRadio() {
  radio = createRadio();
  radio.position(width/2 - 80, 10);
  radio.option("Rectangle");
  radio.option("Ellipse");  
}

function draw() {
  background(255);
}

function menu() {
  if(radio.value === "Rectangle") {
    rect(width / 2, height / 2, 50, 50);
  }
  else if (radio.value === "Ellipse") {
    ellipse(width / 2, he)
  }
}
