<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
<script>
let x, y;
let x2, y2;
let tx, ty;
let step = 10;
let sidetoside = true;
let updown = true;
let score1 = 0;
let score2 = 0;
let canvas;

// Frame counters and speed control for each snake
let snake1FrameCounter = 0;
let snake2FrameCounter = 0;
let noiseOffset1 = 0;
let noiseOffset2 = 1000;
let noiseIncrement = 0.02;

// Random colors that will be generated
let snake1Color;
let snake2Color;
let grassColor;
let targetColor;

function generateRandomColor() {
  return [random(0, 255), random(0, 255), random(0, 255)];
}

function generateRandomColorWithAlpha() {
  return [random(0, 255), random(0, 255), random(0, 255), random(30, 80)];
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  
  // Generate random colors
  snake1Color = generateRandomColor();
  snake2Color = generateRandomColor();
  grassColor = generateRandomColorWithAlpha();
  targetColor = generateRandomColor();
  
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
  // Draw background with random grass color
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
  // Draw some subtle grass details with random variations
  noStroke();
  for (let i = 0; i < 100; i++) {
    let grassX = random(width);
    let grassY = random(height);
    let grassHeight = random(5, 15);
    
    // Create random grass blade colors based on the main grass color
    let randomGrassColor = [
      grassColor[0] + random(-20, 20),
      grassColor[1] + random(-20, 20),
      grassColor[2] + random(-20, 20),
      20
    ];
    
    fill(randomGrassColor[0], randomGrassColor[1], randomGrassColor[2], randomGrassColor[3]);
    rect(grassX, grassY, 2, grassHeight);
  }
}

function drawTarget() {
  // Draw target with a pulsing effect using random color
  let pulsingSize = 10 + sin(frameCount * 0.1) * 2;
  fill(targetColor[0], targetColor[1], targetColor[2]);
  ellipse(tx + 5, ty + 5, pulsingSize, pulsingSize);
}

function moveAndDrawSnakes() {
  // Calculate dynamic movement intervals using noise
  // Lower values = faster movement, higher values = slower movement
  // Range: 3-7 frames between moves (base 5 ± 2)
  let snake1Interval = 5 + round((noise(noiseOffset1) - 0.5) * 4);
  let snake2Interval = 5 + round((noise(noiseOffset2) - 0.5) * 4);
  
  // Increment noise offsets for continuous variation
  noiseOffset1 += noiseIncrement;
  noiseOffset2 += noiseIncrement;
  
  // Increment frame counters
  snake1FrameCounter++;
  snake2FrameCounter++;
  
  // Snake 1 movement (only move when frame counter reaches interval)
  if (snake1FrameCounter >= snake1Interval) {
    snake1FrameCounter = 0; // Reset counter
    
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
  }
  
  // Snake 2 movement (only move when frame counter reaches interval)
  if (snake2FrameCounter >= snake2Interval) {
    snake2FrameCounter = 0; // Reset counter
    
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
  }
  
  // Draw snakes with random colors
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
  // Display score 1 in snake 1's random color
  fill(snake1Color[0], snake1Color[1], snake1Color[2]);
  text(score1, 20, 40);
  
  // Display score 2 in snake 2's random color
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
  
  // Generate new random colors when target resets for variety
  targetColor = generateRandomColor();
}

// Optional: Press 'r' to regenerate all colors
function keyPressed() {
  if (key === 'r' || key === 'R') {
    snake1Color = generateRandomColor();
    snake2Color = generateRandomColor();
    grassColor = generateRandomColorWithAlpha();
    targetColor = generateRandomColor();
  }
}
</script>
</body>
</html>
