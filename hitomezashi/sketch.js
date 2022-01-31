let ver = [];
let hor = [];
let step = 10;
let count = 0;
let count2 = 0;
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let click = 1;
stroke(250);

function setup() {
  createCanvas(windowWidth, windowHeight);
  fillver();
  fillhor();
  background(55,87,145);
  stroke(250);
}

function draw() {
   drawver();
  drawhor();
}
function drawver() {
  for (y = ver[count]; y < width*2; y += step * 2) {
    line(x, y, x, y + step);
  }

  count++;
  y = 0;
  x += step;
}
function drawhor() {
  for (x2 = hor[count2]; x2 < width*2; x2 += step * 2) {
    line(x2, y2, x2 + step, y2);
  }

  count2++;
  x2 = 0;
  y2 += step;
}

function fillver() {
  for (let i = 0; i < width / step; i++) {
    var r = random(1);
    if (r < 0.5) {
      ver[i] = 0;
    } else {
      ver[i] = step;
    }
  }
}
function fillhor() {
  for (let i = 0; i < height / step; i++) {
    var r = random(1);
    if (r < 0.5) {
      hor[i] = 0;
    } else {
      hor[i] = step;
    }
  }
}
function mousePressed() {
 fillhor();
  fillver();
  step=(random(6,30));
count = 0;
count2 = 0;
 x = 0;
 y = 0;
x2 = 0;
y2 = 0;
  background(55, 87, 145);
}
