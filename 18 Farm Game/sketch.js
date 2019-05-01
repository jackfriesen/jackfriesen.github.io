// Farm Game

const TILE_SIZE = 100;
const COLS = 5;
const ROWS = 5;
let playerX = 3;
let playerY = 4;

let tiles = [];
//0 - blank
//1 - chicken
//2 - cow

let level =
  [[0, 1, 0, 1, 0],
  [1, 1, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [1, 0, 0, 1, 1],
  [0, 0, 1, 2, 1]];

function preload() {
  for (let i = 0; i < 3; i++) {
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE);
}

function draw() {
  renderGame();
}

function renderGame() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let index = level[y][x];
      image(tiles[index], x * TILE_SIZE, y * TILE_SIZE);
    }
  }
}

//simple manipulation of gameboard state
//switch to adjacent space
function swap(x1, y1, x2, y2) {
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (playerX > 1) { // check if on very left side
      if (level[playerY][playerX - 1] === 0) { // empty beside us
        swap(playerX, playerY, playerX - 1, playerY);
      }
      else if (level[playerY][playerX - 1] === 1) { //chicken to the left
        if (level[playerY][playerX - 2] === 0) { //if space to the left of chicken is empty
          swap(playerX - 1, playerY, playerX - 2, playerY);
          swap(playerX, playerY, playerX - 1, playerY);
        }
      }
    }
    playerX--;
  }
}

// function keyPressed() {
//   if(keyCode === LEFT_ARROW) {
//     swap(playerX, playerY,  playerX - 1, playerY)
//     playerX--;
//   }

//   if(keyCode === RIGHT_ARROW) {
//     swap(playerX, playerY,  playerX + 1, playerY)
//     playerX++;
//   }

//   if(keyCode === UP_ARROW) {
//     swap(playerX, playerY,  playerX, playerY - 1)
//     playerY--;
//   }

//   if(keyCode === DOWN_ARROW) {
//     swap(playerX, playerY,  playerX, playerY + 1)
//     playerY++;
//   }
// }