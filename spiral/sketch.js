let t, b, r, l; // top, bottom, right, left boundaries
let s; // square size
let mode; // direction mode (0-3)
let x, y; // current position
let xs, ys; // x and y step values
let colorValue; // color value for the current square
let isComplete; // flag to check if pattern is complete
let squareSizes = [5, 10, 15, 20, 25, 30, 40]; // different possible square sizes
let currentSizeIndex;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(); // Remove stroke
  
  // Set a random starting square size
  currentSizeIndex = floor(random(squareSizes.length));
  initializeSizeAndGrid();
  
  // Set initial color
  colorValue = random(255);
  
  console.log("Available square sizes:", squareSizes);
  console.log("Starting with size:", s);
}

function initializeSizeAndGrid() {
  // Choose a square size from our options
  s = squareSizes[currentSizeIndex]; // Directly use the next size
  
  console.log("New square size: " + s); // Debug log to verify size changes
  
  t = 0; // top boundary
  b = height; // bottom boundary
  r = width; // right boundary
  l = 0; // left boundary
  
  x = l; // start at left
  y = t; // start at top
  xs = s; // initial x step (moving right)
  ys = 0; // initial y step (not moving vertically)
  mode = 0; // start in mode 0 (moving right)
  isComplete = false;
  
  // Fill with a base color
  background(random(255));
}

function draw() {
  // If we've completed the spiral, start a new one
  if (isComplete) {
    // Force the size to change by directly manipulating the index
    currentSizeIndex = (currentSizeIndex + 1) % squareSizes.length;
    initializeSizeAndGrid();
    isComplete = false;
  }
  
  // Draw multiple squares per frame for better performance
  for (let i = 0; i < 10; i++) {
    if (!drawNextSquare()) {
      isComplete = true;
      break;
    }
  }
}

function drawNextSquare() {
  // Draw square at current position
  fill(colorValue);
  rect(x, y, s, s);
  
  // Adjust color slightly for next square
  colorValue = (colorValue + 0.5) % 255;
  
  // Move to next position
  x += xs;
  y += ys;
  
  // Set direction based on current mode
  if (mode == 0) { xs = s; ys = 0; } // right
  if (mode == 1) { xs = 0; ys = s; } // down
  if (mode == 2) { xs = -s; ys = 0; } // left
  if (mode == 3) { xs = 0; ys = -s; } // up
  
  // Check for direction changes
  if (x >= r - s && mode == 0) {
    mode = 1; // change to moving down
    t = t + s; // shrink top boundary
  }
  if (y >= b - s && mode == 1) {
    mode = 2; // change to moving left
    r = r - s; // shrink right boundary
  }
  if (x <= l && mode == 2) {
    mode = 3; // change to moving up
    b = b - s; // shrink bottom boundary
  }
  if (y <= t && mode == 3) {
    mode = 0; // change to moving right
    l = l + s; // shrink left boundary
  }
  
  // Check if the spiral is complete
  if (r - l < s*2 || b - t < s*2) {
    console.log("Spiral complete. Next size will be: " + squareSizes[(currentSizeIndex + 1) % squareSizes.length]);
    return false;
  }
  
  return true;
}

function mousePressed() {
  // Start a new pattern with a different size when mouse is clicked
  currentSizeIndex = (currentSizeIndex + 2) % squareSizes.length; // Skip one size to make change more noticeable
  initializeSizeAndGrid();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSizeAndGrid();
}
