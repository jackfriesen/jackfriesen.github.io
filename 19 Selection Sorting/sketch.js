//Selection Sorting

const ARR_SIZE = 100;
let values = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  populateArray();
}

function populateArray() {
  for(let i = 0; i < ARR_SIZE; i ++) {
    values.push(int(random(1000)));
  }
}

function binarySearch(n) {
  while(values.length > 1) {
    let index = int(values.length / 2);
    if(values[index] === n) {
      return true;
    }
    else {
      if(values[index] > n) {
        //get rid of larger numbers
        values.splice[n];
      }
      else {
        //get rid of smaller numbers
        values.splice[0, int(values.length / 2)];
      }
    }
  }
  return false;
}

function graph() {
  for(let i = 0; i < values.length; i ++) {
    point(values[i] * 2, values[i] * 2);
  }
}

function draw() {
  // background(0);
  // strokeWeight(5);
  // stroke(255);
  // graph();
  print(values);
  selectionSort();
  print(values);
  print(binarySearch(52));
}

//one character at a time, find the minimum value and swap
function selectionSort() {
  for(let index = 0; index < values.length - 1; index ++) {
    let minimum = values[index];
    let minimumLocation = index;
    
    for(let checkIndex = index + 1; checkIndex < values.length; checkIndex ++) {
      let cur = values[checkIndex];
      if(cur < minimum) {
        minimum  = cur;
        minimumLocation = checkIndex;
      }
    }
    //swap item at index with the item at the minimum location
    let temp = values[index];
    values[index] = values[minimumLocation];
    values[minimumLocation] = temp;
  }
}