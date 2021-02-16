let x, y;
let x2, y2;
let tx, ty;
let step = 10;
let sidetoside = true;
let updown = true;

function setup() {
 // createCanvas(1280,800);
 // createCanvas(displayWidth, displayHeight);
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  x = width / 2+random(-100,100);
  y = height / 2+random(-100,100);
  x2 = width / 2+random(-100,100);
  y2 = height / 2+random(-100,100);
  tx = floor(random(0, (width - 100) / 10)) * 10;
  ty = floor(random(0, (height - 100) / 10)) * 10;
}
// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// }

function draw() {
  //the amount of transparency in background controls trails
  background(0, 25);
  fill(255);
  rect(x, y, 10, 10);
  rect(x2, y2, 10, 10);
  fill(255, 0, 0);
  rect(tx, ty, 10, 10);
  if(sidetoside){ 
   if(tx>x){
     x+=step;
   }else if(tx<x){
     x-=step;
   }else if(tx==x){
     sidetoside=false;
   }
  }
   if(sidetoside==false){
      if(ty>y){
     y+=step;
   }else if(ty<y){
     y-=step;
   }
   }

  if (updown) {
    if (ty > y2) {
      y2 += step;
    } else if (ty < y2) {
      y2 -= step;
    } else if (ty == y2) {
      updown = false;
    }
  }
  if (updown == false) {
    if (tx > x2) {
      x2 += step;
    } else if (tx < x2) {
      x2 -= step;
    }
  }


  if (x == tx && y == ty || x2 == tx && y2 == ty) {
    tx = floor(random(0, (width) / 10)) * 10;
    ty = floor(random(0, (height) / 10)) * 10;
    sidetoside = true;
    updown = true;

  }
}
