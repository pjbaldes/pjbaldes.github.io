// P5.js code for scrolling stripes with variable thickness and spacing
// Can toggle between horizontal and vertical stripes
// Buttons fade out after 5 seconds of inactivity

let yOffset = 0; // Tracks the vertical offset for scrolling
let xOffset = 0; // Tracks the horizontal offset for scrolling
let isFullscreen = false;
let noiseOffsetThickness = 0; // Noise offset for thickness variation
let noiseOffsetSpacing = 1000; // Different starting offset for spacing variation
let seedValue; // Seed for the noise function
let isHorizontal; // Direction flag - will be randomly chosen in setup
let lastMouseMoveTime; // To track when the mouse was last moved
let buttonOpacity = 255; // Controls the visibility of buttons

// UI elements
let fsButton;
let directionButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  
  // Randomly choose orientation (horizontal or vertical)
  isHorizontal = random() > 0.5;
  
  // Generate random seed value for the noise function
  seedValue = random(100000);
  randomSeed(seedValue); // Set the random seed
  noiseSeed(seedValue); // Set the noise seed with the same value
  console.log("Pattern seed:", seedValue); // Log the seed for reference
  console.log("Random orientation:", isHorizontal ? "Horizontal" : "Vertical"); // Log the chosen orientation
  
  // Create UI buttons
  fsButton = createButton('Fullscreen');
  fsButton.position(10, 10);
  fsButton.mousePressed(toggleFullscreen);
  fsButton.style('opacity', '1');
  fsButton.style('transition', 'opacity 0.5s ease-in-out');
  
  directionButton = createButton(isHorizontal ? 'Switch to Vertical' : 'Switch to Horizontal');
  directionButton.position(100, 10);
  directionButton.mousePressed(toggleDirection);
  directionButton.style('opacity', '1');
  directionButton.style('transition', 'opacity 0.5s ease-in-out');
  
  // Initialize the mouse move timer
  lastMouseMoveTime = millis();
}

function draw() {
  background(0); // Black background
  
  // Set color for the stripes
  fill(255);
  noStroke();
  
  // Slowly advance noise position for organic movement
  noiseOffsetThickness += 0.005;
  noiseOffsetSpacing += 0.003;
  
  if (isHorizontal) {
    drawHorizontalStripes();
  } else {
    drawVerticalStripes();
  }
  
  // Handle button fade
  handleButtonFade();
  
  // Update the offsets for the next frame
  yOffset += isHorizontal ? 0.5 : 0; // Only update y offset if horizontal
  xOffset += isHorizontal ? 0 : 0.5; // Only update x offset if vertical
  
  // Reset offsets when they get too large to prevent floating point issues
  if (yOffset > 1000) yOffset = 0;
  if (xOffset > 1000) xOffset = 0;
}

function drawHorizontalStripes() {
  let currentY = 0; // Start at the top of the canvas
  let stripeIndex = 0;
  
  // Continue drawing stripes until we've filled the canvas
  while (currentY < height + 150) { // Extra padding to ensure no gaps
    // Use noise to vary the stripe thickness (between -75 to 75 pixels)
    let noiseValueThickness = noise(stripeIndex * 0.1, noiseOffsetThickness);
    let stripeHeight = map(noiseValueThickness, 0, 1, -75, 75);
    
    // Use different noise coordinates for spacing variation (between -75 to 75 pixels)
    let noiseValueSpacing = noise(stripeIndex * 0.2, noiseOffsetSpacing);
    let stripeSpacing = map(noiseValueSpacing, 0, 1, -75, 75);
    
    // Only draw stripes with positive height (negative height would be invisible)
    if (stripeHeight > 0) {
      // Calculate y-position with scroll offset
      let yPos = (currentY + yOffset) % (height + 300) - 150;
      
      // Draw the stripe
      rect(0, yPos, width, stripeHeight);
    }
    
    // For spacing, we still need to advance the position, even with negative values
    // But ensure a minimum spacing to prevent overlap problems
    let effectiveSpacing = Math.max(stripeSpacing, -stripeHeight + 1);
    
    // Move to the next stripe position
    currentY += stripeHeight + effectiveSpacing;
    stripeIndex++;
  }
}

function drawVerticalStripes() {
  let currentX = 0; // Start at the left of the canvas
  let stripeIndex = 0;
  
  // Continue drawing stripes until we've filled the canvas
  while (currentX < width + 150) { // Extra padding to ensure no gaps
    // Use noise to vary the stripe width (between -75 to 75 pixels)
    let noiseValueThickness = noise(stripeIndex * 0.1, noiseOffsetThickness);
    let stripeWidth = map(noiseValueThickness, 0, 1, -75, 75);
    
    // Use different noise coordinates for spacing variation (between -75 to 75 pixels)
    let noiseValueSpacing = noise(stripeIndex * 0.2, noiseOffsetSpacing);
    let stripeSpacing = map(noiseValueSpacing, 0, 1, -75, 75);
    
    // Only draw stripes with positive width (negative width would be invisible)
    if (stripeWidth > 0) {
      // Calculate x-position with scroll offset
      let xPos = (currentX + xOffset) % (width + 300) - 150;
      
      // Draw the stripe
      rect(xPos, 0, stripeWidth, height);
    }
    
    // For spacing, we still need to advance the position, even with negative values
    // But ensure a minimum spacing to prevent overlap problems
    let effectiveSpacing = Math.max(stripeSpacing, -stripeWidth + 1);
    
    // Move to the next stripe position
    currentX += stripeWidth + effectiveSpacing;
    stripeIndex++;
  }
}

// Handle button fade based on mouse inactivity
function handleButtonFade() {
  const inactivityTime = millis() - lastMouseMoveTime;
  
  if (inactivityTime > 5000) { // 5 seconds of inactivity
    // Calculate opacity based on time (fade out over 1 second)
    buttonOpacity = max(0, 255 - (inactivityTime - 5000) / 4);
    
    // Apply opacity to buttons
    fsButton.style('opacity', buttonOpacity / 255);
    directionButton.style('opacity', buttonOpacity / 255);
  } else {
    // Make buttons fully visible
    fsButton.style('opacity', '1');
    directionButton.style('opacity', '1');
  }
}

// Toggle between horizontal and vertical stripes
function toggleDirection() {
  isHorizontal = !isHorizontal;
  
  // Update button text
  if (isHorizontal) {
    directionButton.html('Switch to Vertical');
  } else {
    directionButton.html('Switch to Horizontal');
  }
  
  // Reset mouse move time to prevent instant fade after clicking
  lastMouseMoveTime = millis();
}

// Detect mouse movement to reset the inactivity timer
function mouseMoved() {
  lastMouseMoveTime = millis();
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Toggle fullscreen mode
function toggleFullscreen() {
  if (!isFullscreen) {
    fullscreen(true);
    isFullscreen = true;
  } else {
    fullscreen(false);
    isFullscreen = false;
  }
  
  // Reset mouse move time to prevent instant fade after clicking
  lastMouseMoveTime = millis();
}

// Handle exiting fullscreen with Escape key
function keyPressed() {
  if (keyCode === ESCAPE) {
    isFullscreen = false;
  }
}

// Generate a new pattern with a different seed
function generateNewPattern() {
  noiseSeed = random(100000);
  noiseSeed(noiseSeed);
  console.log("New noise seed:", noiseSeed);
  
  // Reset offsets for a fresh start
  noiseOffsetThickness = 0;
  noiseOffsetSpacing = 1000;
}
