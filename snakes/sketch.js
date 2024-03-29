let x, y;
let x2, y2;
let tx, ty;
let step = 10;
let sidetoside = true;
let updown = true;
let score1=0;
let score2=0;

function setup() {
 // createCanvas(1280,800);
 // createCanvas(displayWidth, displayHeight);
canvas = createCanvas(window.innerWidth, window.innerHeight);
 
  tx = floor(random(0, (width - 100) / 10)) * 10;
  ty = floor(random(0, (height - 100) / 10)) * 10;
   x = floor(random(0, (width) / 10)) * 10;
    y = floor(random(0, (height) / 10)) * 10;
   x2 = floor(random(0, (width) / 10)) * 10;
    y2 = floor(random(0, (height) / 10)) * 10;
}
// function windowResized() {
//   resizeCanvas(window.innerWidth, window.innerHeight);
// }

function draw() {
  //the amount of transparency in background controls trails
  textSize(32);
  background(0, 5);
  fill(240,0,0);
  rect(x, y, 10, 10);
  text(score1,20,40);
  fill(0,0,240);
  rect(x2, y2, 10, 10);
  text(score2,width-80,40);
  fill(random(255),random(255),random(255));
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


  if (x == tx && y == ty){
    score1++;
    tx = floor(random(0, (width) / 10)) * 10;
    ty = floor(random(0, (height) / 10)) * 10;
    sidetoside = true;
    updown = true;

  }
  if (x2 == tx && y2 == ty){
    score2++;
    tx = floor(random(0, (width) / 10)) * 10;
    ty = floor(random(0, (height) / 10)) * 10;
    sidetoside = true;
    updown = true;

  }

}

