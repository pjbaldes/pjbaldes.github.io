let x, y;
let x2, y2;
let tx, ty;
let step = 10;
let sidetoside = true;
let updown = true;
let score1 = 0;
let score2 = 0;

// Natural snake colors
let snake1Color = [95, 158, 87]; // Greenish snake
let snake2Color = [162, 116, 73]; // Brownish snake
let grassColor = [40, 75, 35, 60]; // Subtle dark green with transparency for grass

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  
  tx = floor(random(0, (width - 100) / 10)) * 10;
  ty = floor(random(0, (height - 100) / 10)) * 10;
  x = floor(random(0, (width) / 10)) * 10;
  y = floor(random(0, (height) / 10)) * 10;
  x2 = floor(random(0, (width) / 10)) * 10;
  y2 = floor(random(0, (height) / 10)) * 10;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Draw subtle grass background
  background(grassColor);
  
  // Draw grass details - subtle blades of grass
  drawGrass();
  
  // Draw target (fruit/prey)
  drawTarget();
  
  // Draw and move snakes
  moveAndDrawSnakes();
  
  // Display scores in matching colors
  displayScores();
  
  // Check for collisions
  checkCollisions();
}

function drawGrass() {
  // Draw some subtle grass details
  noStroke();
  for (let i = 0; i < 100; i++) {
    let grassX = random(width);
    let grassY = random(height);
    let grassHeight = random(5, 15);
    let grassShade = random(35, 55);
    
    fill(grassShade, 85 + random(-10, 10), grassShade - 10, 20);
    rect(grassX, grassY, 2, grassHeight);
  }
}

function drawTarget() {
  // Draw target with a pulsing effect
  let pulsingSize = 10 + sin(frameCount * 0.1) * 2;
  fill(220, 70, 60); // Reddish target (like a berry or fruit)
  ellipse(tx + 5, ty + 5, pulsingSize, pulsingSize);
}

function moveAndDrawSnakes() {
  // Snake 1 movement (horizontal first priority)
  if (sidetoside) { 
    if (tx > x) {
      x += step;
    } else if (tx < x) {
      x -= step;
    } else if (tx == x) {
      sidetoside = false;
    }
  }
  
  if (sidetoside == false) {
    if (ty > y) {
      y += step;
    } else if (ty < y) {
      y -= step;
    }
  }
  
  // Snake 2 movement (vertical first priority)
  if (updown) {
    if (ty > y2) {
      y2 += step;
    } else if (ty < y2) {
      y2 -= step;
    } else if (ty == y2) {
      updown = false;
    }
  }
  
  if (updown == false) {
    if (tx > x2) {
      x2 += step;
    } else if (tx < x2) {
      x2 -= step;
    }
  }
  
  // Draw snakes with natural colors
  fill(snake1Color[0], snake1Color[1], snake1Color[2]);
  rect(x, y, 10, 10);
  
  fill(snake2Color[0], snake2Color[1], snake2Color[2]);
  rect(x2, y2, 10, 10);
  
  // Add subtle eyes to snakes for character
  fill(255);
  ellipse(x + 3, y + 3, 2, 2);
  ellipse(x + 7, y + 3, 2, 2);
  
  fill(255);
  ellipse(x2 + 3, y2 + 3, 2, 2);
  ellipse(x2 + 7, y2 + 3, 2, 2);
}

function displayScores() {
  textSize(32);
  // Display score 1 in snake 1's color
  fill(snake1Color[0], snake1Color[1], snake1Color[2]);
  text(score1, 20, 40);
  
  // Display score 2 in snake 2's color
  fill(snake2Color[0], snake2Color[1], snake2Color[2]);
  text(score2, width - 80, 40);
}

function checkCollisions() {
  // Check for collisions with target
  if (x == tx && y == ty) {
    score1++;
    resetTarget();
  }
  
  if (x2 == tx && y2 == ty) {
    score2++;
    resetTarget();
  }
}

function resetTarget() {
  tx = floor(random(0, (width) / 10)) * 10;
  ty = floor(random(0, (height) / 10)) * 10;
  sidetoside = true;
  updown = true;
}
