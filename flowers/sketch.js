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
let n;
let nOff=0;
let m;

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);


  strokeWeight(2);
  colorMode(RGB, 255, 255, 255);
  stem = color(random(40,60), random(255), random(40,60));
  flowerc = color(random(200), random(200), random(200));
  locate();
  background(196, 233, 252);
  x=random(width);
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
  
  n=noise(nOff);
  m=map(n,0,1,-.3,.3);
  nOff=nOff+.01;
  point(x, y);
  r=random(1);
  if (r<.4) {
    //x=x+random(-.5, .5);
    x=x+m;
    y=y+random(-.5, -.1);
  } else if (r>.4 &&r<.998) {
    //x=x+random(-.5, .5);
    x=x+m/2;
    y=y+random(-.5, .2);
  } else if (r>.9985) {
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
    rotate(PI/random(3));
    ellipse(0,0, random(s/2), random(s/2));
    pop();
    petalCount++;
    
  } else {
    locate();
  }
}