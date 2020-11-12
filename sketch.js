let x;
let y;
let r;
let flowerCount;
let startFlower;
var stem; 
var flowerc; 
let i;
let s;

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
}

function flower() {
  var jitterr=random(100, 235);
  var jitterg=random(100, 235);
  var jitterb=random(100, 235);
  flowerc = color(jitterr+random(-20, 20), jitterg+random(-20, 20), jitterb+random(-20, 20));
  s=random(flowerCount/20); 
  for (i=0; i<50; i++) {
    stroke(flowerc);
    fill(flowerc);
    ellipse(x+random(-s, s), y+random(-s, s), random(s/2), random(s/2));
    flowerc = color(jitterr+random(-30, 20), jitterg+random(-30, 20), jitterb+random(-30, 20));
  }



  locate();
}
