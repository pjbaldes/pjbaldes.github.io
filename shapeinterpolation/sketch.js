// Configuration for two different shapes
var corners1 = 4;  // First shape vertex count
var corners2 = 6;  // Second shape vertex count
var v1 = [];       // First shape vertices
var t1 = [];       // First shape targets
var d1 = [];       // First shape distances
var h1 = 30;       // First shape starting hue
var v2 = [];       // Second shape vertices
var t2 = [];       // Second shape targets
var d2 = [];       // Second shape distances
var h2 = 200;      // Second shape starting hue (different color range)
var col1, col2, huedist1, huedist2;
var canvasWidth, canvasHeight;
var bgHue = 120;   // Background hue
var lerpSpeeds1 = []; // First shape lerp speeds
var lerpSpeeds2 = []; // Second shape lerp speeds
var baseSpeed1 = 0.015; // Base speed for first shape
var baseSpeed2 = 0.005; // Base speed for second shape (slower)

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 360, 1, 1, 1);
  frameRate(30);
  initializeVertices();
  col1 = color(h1, 0.9, 1, 0.7);  
  col2 = color(h2, 0.9, 1, 0.6);
  noStroke();
}

function initializeVertices() {
  // Initialize first shape
  v1 = [];
  t1 = [];
  d1 = [];
  lerpSpeeds1 = [];
  let buffer = height * 0.2;
  for (let i = 0; i < corners1; i++) {
    v1[i] = createVector(random(width), random(height));
    t1[i] = createVector(
      random(-buffer, width + buffer),
      random(-buffer, height + buffer)
    );
    d1[i] = 0;
    lerpSpeeds1[i] = random(TWO_PI); // Random phase offset
  }
  
  // Initialize second shape
  v2 = [];
  t2 = [];
  d2 = [];
  lerpSpeeds2 = [];
  for (let i = 0; i < corners2; i++) {
    v2[i] = createVector(random(width), random(height));
    t2[i] = createVector(
      random(-buffer, width + buffer),
      random(-buffer, height + buffer)
    );
    d2[i] = 0;
    lerpSpeeds2[i] = random(TWO_PI); // Random phase offset
  }
}

function draw() {
  // Dynamic background with slow color fade
  var bgColor = color((bgHue + 180) % 360, 0.3, 0.2, 0.03);
  background(bgColor);
  
  // Slowly change background hue
  bgHue = (bgHue + 0.3) % 360;
  
  // Draw first shape
  col1 = color(h1, 0.9, 1, 0.7);
  fill(col1);
  beginShape();
  for (let i = 0; i < v1.length; i++) {
    vertex(v1[i].x, v1[i].y);
    // Varying lerp speed with unique phase offset for each vertex
    let lerpSpeed1 = baseSpeed1 * map(sin(frameCount * 0.008 + lerpSpeeds1[i]), -1, 1, 0.2, 2.5);
    v1[i] = p5.Vector.lerp(v1[i], t1[i], lerpSpeed1);
    d1[i] = dist(v1[i].x, v1[i].y, t1[i].x, t1[i].y);
    if (d1[i] < 1) {
      let buffer = height * 0.2;
      t1[i] = createVector(
        random(-buffer, width + buffer),
        random(-buffer, height + buffer)
      );
      h1 = (h1 + 5) % 360;  // Cycle through hues
    }
  }
  endShape(CLOSE);
  
  // Draw second shape
  col2 = color(h2, 0.9, 1, 0.6);
  fill(col2);
  beginShape();
  for (let i = 0; i < v2.length; i++) {
    vertex(v2[i].x, v2[i].y);
    // Varying lerp speed with unique phase offset for each vertex - slower than first shape
    let lerpSpeed2 = baseSpeed2 * map(sin(frameCount * 0.003 + lerpSpeeds2[i]), -1, 1, 0.1, 2.0);
    v2[i] = p5.Vector.lerp(v2[i], t2[i], lerpSpeed2);
    d2[i] = dist(v2[i].x, v2[i].y, t2[i].x, t2[i].y);
    if (d2[i] < 1) {
      let buffer = height * 0.2;
      t2[i] = createVector(
        random(-buffer, width + buffer),
        random(-buffer, height + buffer)
      );
      h2 = (h2 + 3) % 360;  // Cycle through hues more slowly
    }
  }
  endShape(CLOSE);
}

function windowResized() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  resizeCanvas(canvasWidth, canvasHeight);
}