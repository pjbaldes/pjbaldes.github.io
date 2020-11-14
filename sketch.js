let x;
let y;
let r;
let flowerCount;
let startFlower;
var stem; 
var flowerc; 
let i;
let s;
var petalCount;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);


  strokeWeight(2);
  colorMode(RGB, 255, 255, 255);
  stem = color(random(40), random(200), random(40));
  flowerc = color(random(200), random(200), random(200));
  locate();
  background(196, 233, 252);
}

function draw() {
  //background(220);
  if (startFlower==false) {
    grow();
    flowerCount++;
  } else {
    flower();
  }
  print(x, y);
}

function grow() {
  point(x, y);
  r=random(1);
  if (r<.4) {
    x=x+random(-.5, .5);
    y=y+random(-.5, -.5);
  } else if (r>.4 &&r<.998) {
    x=x+random(-.5, .5);
    y=y+random(-.5, .5);
  } else if (r>.998) {
     jitterr=random(100, 235);
     jitterg=random(100, 235);
     jitterb=random(100, 235);
    startFlower=true;
  }
}

function locate() {
  x = random(width);
  y = height;

  stem = color(random(40), random(200), random(40));
  flowerc = color(random(200), random(200), random(200));
  stroke(stem);

  startFlower=false;
  flowerCount=0;
  petalCount=0;
}

function flower() {

  flowerc = color(jitterr+random(-30, 20), jitterg+random(-30, 20), jitterb+random(-30, 20));
  s=random(flowerCount/20); 
  if (petalCount<flowerCount/20) {
    stroke(flowerc);
    fill(flowerc);
    push();
    translate(x+random(-s/2, s/2), y+random(-s/2, s/2));
    rotate(PI / random(4));
    ellipse(0,0, random(s/2), random(s/2));
    pop();
    petalCount++;
    
  } else {
    locate();
  }
}
function flower2() {
  var jitterr=random(100, 235);
  var jitterg=random(100, 235);
  var jitterb=random(100, 235);
  flowerc = color(jitterr+random(-20, 20), jitterg+random(-20, 20), jitterb+random(-20, 20));
  s=random(flowerCount/20); 
  for (i=0; i<flowerCount/10; i++) {
    var xf=random(x+random(-s, s));
    var yf=random(y+random(-s, s));
    var d=dist(x, y, xf, yf);
    if (d>flowerCount/20) {
      xf=random(x+random(-s, s));
      yf=random(y+random(-s, s));
    } else {
      stroke(flowerc);
      fill(flowerc);
      ellipse(x+random(-s, s), y+random(-s, s), random(s/2), random(s/2));
      flowerc = color(jitterr+random(-30, 20), jitterg+random(-30, 20), jitterb+random(-30, 20));
    }
  }

  locate();
}
