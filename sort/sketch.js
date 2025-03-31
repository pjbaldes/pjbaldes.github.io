// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    
    // Also shuffle the line widths to match
    [lineWidths[i], lineWidths[j]] = [lineWidths[j], lineWidths[i]];
  }
}// Function to check if the array is properly sorted
function isArraySorted() {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      return false;
    }
  }
  return true;
}let nums = [];
let x = 0;
let r = 1;
let pivot = 2;
let m;
let n;
let needsRegeneration = false;
let sortCompleted = false;
let lastCompletionTime = 0;
let waitTime = 20000; // 20 seconds in milliseconds
let lineWidths = []; // Array to store random line widths

function setup() {
  colorMode(HSB, 360, 1, 1, 1);
  createCanvas(windowWidth, windowHeight);
  generateRandomValues();
  // Don't set strokeWeight here since we'll set it individually for each line
}

function generateRandomValues() {
  nums = []; // Reset the array
  lineWidths = []; // Reset line widths
  sortCompleted = false; // Reset completion status
  r = 1; // Reset the sort position
  
  console.log("Generating new values. First completion:", !lastCompletionTime);
  
  for (let i = 0; i < width; i++) {
    nums.push(random(height - 10));
    
    // First round is always 1 pixel wide
    if (!lastCompletionTime) {
      lineWidths.push(1); // First time through - all lines are 1px wide
    } else {
      lineWidths.push(random(1, 10)); // Random width between 1 and 10 pixels after first run
    }
  }
  
  // Shuffle the array to ensure it's not already sorted
  shuffleArray(nums);
}

function draw() {
  background(220);
  
  // If window was resized and we need to regenerate values
  if (needsRegeneration) {
    generateRandomValues();
    needsRegeneration = false;
  }
  
  // Draw all the lines
  for (let i = 0; i < min(width, nums.length); i++) {
    m = map(nums[i], 0, height - 10, 180, 0);
    n = map(nums[i], 0, height - 10, 180, 360);
    
    // Set random line width for each position
    strokeWeight(lineWidths[i]);
    
    stroke(m, 1, 1, 1);
    line(i, height, i, height - nums[i]);
    stroke(n, 1, 1, 1);
    line(i, 0, i, height - nums[i]);
  }

  // Perform sorting iterations
  if (!sortCompleted) {
    let swapCount = 0;
    let inspectionCount = 0;
    
    for (let k = 0; k < 100; k++) {
      if (r >= 1 && r < nums.length - 1) {
        pivot = nums[r];
        let tempmore = nums[r + 1];
        inspectionCount++;
        
        // Simple comparison sort
        if (tempmore < pivot) {
          nums[r] = tempmore;
          nums[r + 1] = pivot;
          
          // Also swap the line widths to keep them with their bars
          let tempWidth = lineWidths[r];
          lineWidths[r] = lineWidths[r + 1];
          lineWidths[r + 1] = tempWidth;
          
          swapCount++;
        }
      }
      
      // Update the position for the next iteration
      if (frameCount % 5 == 0) {
        r++;
      } else {
        r = int(random(1, min(width, nums.length) - 1));
      }
      
      // Reset r when it reaches the end
      if (r >= min(width, nums.length) - 1) {
        r = 1;
        
        // More robust completion check - check if the array is sorted
        if (isArraySorted() && frameCount > 100) {
          console.log("Sort completed at frame " + frameCount + "!");
          sortCompleted = true;
          lastCompletionTime = millis();
          break;
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  needsRegeneration = true; // Flag to regenerate values on next frame
}

function mousePressed() {
  generateRandomValues(); // Generate new random values on mouse click
  return false; // Prevent default
}
