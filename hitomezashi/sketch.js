let ver = [];
let hor = [];
let step = 10;
let drawComplete = false;
let backgroundColor = [55, 87, 145];
let lastInteractionTime;
let initialIdleTime = 20000; // 20 seconds until first auto-refresh
let refreshInterval = 5000;  // 5 seconds between subsequent refreshes
let autoRefreshEnabled = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(250);
  initializePattern();
  lastInteractionTime = millis(); // Record the starting time
}

function draw() {
  // Only redraw if the pattern isn't complete
  if (!drawComplete) {
    background(backgroundColor);
    drawPattern();
  }
  
  // Check for auto-refresh
  if (autoRefreshEnabled) {
    let currentTime = millis();
    let elapsedTime = currentTime - lastInteractionTime;
    
    // First refresh after initialIdleTime, then every refreshInterval
    if ((elapsedTime > initialIdleTime && elapsedTime < initialIdleTime + refreshInterval) || 
        (elapsedTime > initialIdleTime && (elapsedTime - initialIdleTime) % refreshInterval < 20)) {
      // The small threshold (20ms) prevents multiple refreshes in the same frame
      generateNewPattern();
    }
  }
}

function drawPattern() {
  // Draw vertical lines
  for (let x = 0; x < width; x += step) {
    let index = floor(x / step);
    if (index < ver.length) {
      for (let y = ver[index]; y < height; y += step * 2) {
        line(x, y, x, y + step);
      }
    }
  }
  
  // Draw horizontal lines
  for (let y = 0; y < height; y += step) {
    let index = floor(y / step);
    if (index < hor.length) {
      for (let x = hor[index]; x < width; x += step * 2) {
        line(x, y, x + step, y);
      }
    }
  }
  
  // Mark drawing as complete
  drawComplete = true;
}

function initializePattern() {
  // Reset pattern state
  ver = [];
  hor = [];
  drawComplete = false;
  
  // Generate vertical line pattern
  for (let i = 0; i < ceil(width / step); i++) {
    ver[i] = random() < 0.5 ? 0 : step;
  }
  
  // Generate horizontal line pattern
  for (let i = 0; i < ceil(height / step); i++) {
    hor[i] = random() < 0.5 ? 0 : step;
  }
}

function generateNewPattern() {
  // Change step size
  step = random(6, 30);
  // Round step to whole number for cleaner lines
  step = floor(step);
  
  // Generate new pattern
  initializePattern();
  
  // Optional: change background color slightly for visual feedback
  backgroundColor = [
    55 + random(-10, 10),
    87 + random(-10, 10),
    145 + random(-10, 10)
  ];
}

function mousePressed() {
  generateNewPattern();
  lastInteractionTime = millis(); // Reset the idle timer on mouse click
  return false; // Prevent default behavior
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializePattern();
  lastInteractionTime = millis(); // Reset the idle timer on window resize
}

// Toggle auto-refresh with keyboard
function keyPressed() {
  if (key === 'a' || key === 'A') {
    autoRefreshEnabled = !autoRefreshEnabled;
    console.log("Auto-refresh " + (autoRefreshEnabled ? "enabled" : "disabled"));
  }
}
