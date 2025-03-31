let cols, rows;
let baseSpacing = 20; // Base spacing value
let spacing; // Dynamic spacing that will change
let angle = 0;
let colorAngle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateGridDimensions();
}

function updateGridDimensions() {
  // Recalculate columns and rows based on current spacing
  spacing = baseSpacing + sin(angle * 0.2) * 5; // Spacing oscillates between 15-25
  cols = Math.ceil(width / spacing) * 2; // Double the columns to ensure coverage
  rows = Math.ceil(height / spacing) * 2; // Double the rows to ensure coverage
}

function draw() {
  // Slowly cycle background through RGB space (very slow)
  let bgR = 15 + 10 * sin(colorAngle * 0.05);
  let bgG = 15 + 10 * sin(colorAngle * 0.06 + PI/2);
  let bgB = 15 + 15 * sin(colorAngle * 0.04 + PI);
  background(bgR, bgG, bgB);
  noFill();
  
  // Update the current spacing value based on sine wave
  spacing = baseSpacing + sin(angle * 0.2) * 5;
  
  // Calculate center offset for true center origin
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Calculate the starting positions to center the grid
  let startX = centerX - (cols * spacing) / 2;
  let startY = centerY - (rows * spacing) / 2;
  
  // Update the stroke weight based on sine wave (oscillates between 0.5 and 2.5)
  let currentStrokeWeight = 1 + sin(angle * 0.3) * 1;
  strokeWeight(currentStrokeWeight);
  
  // Draw vertical lines
  for (let i = 0; i < cols; i++) {
    beginShape();
    
    // Create shimmering color effect with minimum brightness and slower speeds
    let r = 100 + 155 * sin(colorAngle * 0.3 + i * 0.08);
    let g = 100 + 155 * sin(colorAngle * 0.4 + i * 0.06);
    let b = 100 + 155 * sin(colorAngle * 0.25 + i * 0.09);
    stroke(r, g, b, 220);
    
    for (let j = 0; j < rows; j++) {
      let x = startX + i * spacing;
      let y = startY + j * spacing;
      
      // More irregular wave effect with multiple sine waves
      if ((i + j) % 2 == 0) {
        // Combine multiple sine waves at different frequencies and amplitudes
        y += sin(angle + (i + j) * 0.3) * 12; 
        y += sin(angle * 0.7 + (i * j) * 0.04) * 8;
        y += cos(angle * 1.3 + i * 0.2 + j * 0.1) * 5;
      }
      
      vertex(x, y);
    }
    endShape();
  }
  
  // Draw horizontal lines
  for (let j = 0; j < rows; j++) {
    beginShape();
    
    // Create shimmering color effect with different phase, minimum brightness and slower speeds
    let r = 100 + 155 * sin(colorAngle * 0.35 + j * 0.07);
    let g = 100 + 155 * sin(colorAngle * 0.45 + j * 0.05);
    let b = 100 + 155 * sin(colorAngle * 0.28 + j * 0.08);
    stroke(r, g, b, 220);
    
    for (let i = 0; i < cols; i++) {
      let x = startX + i * spacing;
      let y = startY + j * spacing;
      
      if ((i + j) % 2 == 0) {
        // Apply the same irregular wave effect to horizontal lines
        y += sin(angle + (i + j) * 0.3) * 12; 
        y += sin(angle * 0.7 + (i * j) * 0.04) * 8;
        y += cos(angle * 1.3 + i * 0.2 + j * 0.1) * 5;
      }
      
      vertex(x, y);
    }
    endShape();
  }
  
  angle += 0.03; // Slightly slower main animation
  colorAngle += 0.008; // Slow color cycling for a subtle effect
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateGridDimensions();
}