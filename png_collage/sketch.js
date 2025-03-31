let myImageArray = new Array(144);
let imageCount = 0;
let totalImages = 144;
let lastImageTime = 0;
let imageInterval = 10000; // 10 seconds in milliseconds

function preload() {
  // First batch of images to load for quick start
  for (let i = 0; i < 20; i++) {
    myImageArray[i] = loadImage('images/' + (i + 1) + '.png');
    imageCount++;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Fullscreen canvas with WEBGL
  background(10, 10, 10);
  imageMode(CENTER);
  
  // Continue loading the rest of the images after setup
  loadRemainingImages();
}

function loadRemainingImages() {
  // Load images in batches to prevent browser from getting overwhelmed
  let currentBatch = 20;
  let batchSize = 20;
  
  function loadBatch() {
    let endIndex = min(currentBatch + batchSize, totalImages);
    
    for (let i = currentBatch; i < endIndex; i++) {
      myImageArray[i] = loadImage('images/' + (i + 1) + '.png', 
        // Success callback
        function() {
          imageCount++;
        },
        // Error callback
        function(err) {
          console.error('Failed to load image ' + (i + 1) + '.png');
        }
      );
    }
    
    currentBatch = endIndex;
    
    // If there are more images to load, schedule the next batch
    if (currentBatch < totalImages) {
      setTimeout(loadBatch, 1000); // Wait a second before loading the next batch
    }
  }
  
  loadBatch();
}

function draw() {
  // Check if it's time to add a new image automatically
  let currentTime = millis();
  if (currentTime - lastImageTime > imageInterval) {
    addRandomImages();
    lastImageTime = currentTime;
  }
}

function addRandomImages() {
  // Only use loaded images
  let availableImages = min(imageCount, totalImages);
  if (availableImages === 0) return;
  
  imageMode(CENTER);
  
  // In WEBGL mode, the coordinate system is centered
  // Left image (1/4 of the way from the left)
  push();
  scale(random(0.5, 1.5));
  image(myImageArray[Math.floor(random(availableImages))], -width/4, 0);
  pop();
  
  // Right image (1/4 of the way from the right)
  push();
  scale(random(0.5, 1.5));
  image(myImageArray[Math.floor(random(availableImages))], width/4, 0);
  pop();
}

function mousePressed() {
  // Only use loaded images
  let availableImages = min(imageCount, totalImages);
  if (availableImages === 0) return;
  
  push();
  scale(random(0.5, 1.5));
  // In WEBGL mode, the coordinate system has (0,0) at the center
  // Adjust the mouse coordinates to be relative to the center
  let adjustedX = mouseX - width/2;
  let adjustedY = mouseY - height/2;
  
  // Use all available images, not just first 30 as in the original
  image(myImageArray[Math.floor(random(availableImages))], adjustedX, adjustedY);
  pop();
  
  // Reset the timer so we don't immediately get an automatic image after a click
  lastImageTime = millis();
  
  return false; // Prevent default behavior
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize to fit the window
  background(10, 10, 10); // Redraw background to clear any artifacts
}