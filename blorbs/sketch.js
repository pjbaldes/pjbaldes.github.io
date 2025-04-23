
// P5.js setup
let width, height;
let pixels = [];
let mouseX = 0, mouseY = 0;
let blobs = [];
let numBlobs = 7; // Number of metaballs
let isFullscreen = false;
let pixelSkip = 2; // Higher = faster performance, lower = better quality

// Helper functions for p5.js equivalents
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function constrain(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function color(val) {
  return {
    r: val,
    g: val,
    b: val,
    a: 255
  };
}

function red(c) {
  return c.r;
}

class Blob {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = randomRange(100, 400);  // Much larger radius
    this.xSpeed = randomRange(-1, 1);
    this.ySpeed = randomRange(-1, 1);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Add slight randomness to movement
    this.xSpeed += randomRange(-0.05, 0.05);
    this.ySpeed += randomRange(-0.05, 0.05);
    
    // Limit speed
    this.xSpeed = constrain(this.xSpeed, -2, 2);
    this.ySpeed = constrain(this.ySpeed, -2, 2);
    
    // Bounce off edges
    if (this.x > width || this.x < 0) {
      this.xSpeed *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed *= -1;
    }
  }
}

function createCanvas(w, h) {
  width = w;
  height = h;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
}

function pixelDensity(val) {
  // This would set pixel density in p5.js
  // Not needed for basic implementation
}

function createButton(text) {
  const button = document.createElement('button');
  button.textContent = text;
  document.body.appendChild(button);
  
  return {
    position: function(x, y) {
      button.style.position = 'absolute';
      button.style.left = x + 'px';
      button.style.top = y + 'px';
    },
    mousePressed: function(callback) {
      button.addEventListener('click', callback);
    },
    style: function(property, value) {
      button.style[property] = value;
    },
    mouseOver: function(callback) {
      button.addEventListener('mouseover', callback);
    },
    mouseOut: function(callback) {
      button.addEventListener('mouseout', callback);
    }
  };
}

function background(val) {
  ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
  ctx.fillRect(0, 0, width, height);
}

function loadPixels() {
  // Get the pixel data from the canvas
  imageData = ctx.getImageData(0, 0, width, height);
  pixels = imageData.data;
}

function updatePixels() {
  // Put the modified pixels back on the canvas
  ctx.putImageData(imageData, 0, 0);
}

function fullscreen(val) {
  if (val) {
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    return true;
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    return false;
  }
}

function resizeCanvas(w, h) {
  width = w;
  height = h;
  const canvas = ctx.canvas;
  canvas.width = width;
  canvas.height = height;
}

function noCursor() {
  document.body.style.cursor = 'none';
}

function cursor() {
  document.body.style.cursor = 'default';
}

// Keep track of mouse position
document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Handle keypresses
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && isFullscreen) {
    toggleFullscreen();
  }
});

// Handle clicks
document.addEventListener('click', function(event) {
  mousePressed();
});

// Handle window resize
window.addEventListener('resize', function() {
  windowResized();
});

let ctx;
let imageData;

function setup() {
  ctx = createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(1); // Important for performance
  
  // Create fewer, larger blobs at random positions
  numBlobs = 5;  // Fewer blobs for better visibility
  for (let i = 0; i < numBlobs; i++) {
    blobs.push(new Blob(randomRange(0, width), randomRange(0, height)));
  }
  
  // Create fullscreen button
  let fullscreenButton = createButton('Toggle Fullscreen');
  fullscreenButton.position(10, 10);
  fullscreenButton.mousePressed(toggleFullscreen);
  fullscreenButton.style('z-index', '100');
  
  // Hide cursor after a few seconds of inactivity
  setTimeout(() => {
    fullscreenButton.style('opacity', '0.2');
  }, 3000);
  
  fullscreenButton.mouseOver(() => {
    fullscreenButton.style('opacity', '1');
  });
  
  fullscreenButton.mouseOut(() => {
    fullscreenButton.style('opacity', '0.2');
  });
}

function draw() {
  background(20); // Dark gray background
  
  // Update blob positions
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }
  
  // Render metaballs with pixel manipulation
  loadPixels();
  
  // Skip pixels for performance (adjust pixelSkip for quality vs speed)
  for (let x = 0; x < width; x += pixelSkip) {
    for (let y = 0; y < height; y += pixelSkip) {
      let sum = 0;
      
      // Calculate metaball field value at this point
      for (let i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        // Using sqrt is expensive - we can use distance squared for better performance
        let d = Math.sqrt((xdif * xdif) + (ydif * ydif));
        sum += 40 * blobs[i].r / d;  // Increased field strength for more interaction
      }
      
      // Constrain values to avoid extremely bright spots
      sum = constrain(sum, 0, 255);
      
      // Convert to grayscale and set each block of pixels
      let c = color(sum);
      
      // Fill block of pixels for the skipped resolution
      for (let px = 0; px < pixelSkip; px++) {
        for (let py = 0; py < pixelSkip; py++) {
          if (x + px < width && y + py < height) {
            let idx = 4 * ((y + py) * width + (x + px));
            pixels[idx] = red(c);
            pixels[idx + 1] = red(c);
            pixels[idx + 2] = red(c);
            pixels[idx + 3] = 255;
          }
        }
      }
    }
  }
  
  updatePixels();
}

// Toggle fullscreen mode
function toggleFullscreen() {
  isFullscreen = !isFullscreen;
  
  if (isFullscreen) {
    let fs = fullscreen(true);
    resizeCanvas(window.innerWidth, window.innerHeight);
    noCursor();
  } else {
    fullscreen(false);
    resizeCanvas(window.innerWidth, window.innerHeight);
    cursor();
  }
}

// Handle window resize
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// Add blobs on mouse click
function mousePressed() {
  if (mouseY < height - 50) { // Avoid adding blobs when clicking on UI elements
    blobs.push(new Blob(mouseX, mouseY));
    if (blobs.length > 8) { // Limit total blobs for better interaction and performance
      blobs.shift();
    }
  }
}

// Initialize and start the animation
setup();
setInterval(draw, 1000 / 60); // 60 FPS