var x,y,xl,yl,xr,yr;
var sxr,sxl,sxr,syr;
var w=20;
var h=w/2;
var count;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x=w,y=w;
  xl=x-random(w/6,w/5);
  yl=y-random(w/6,w/5);
  xr=x+random(w/3.5,w/2.5);
  yr=y-random(w/3.5,w/2.5)*2;

  count=2;
  noFill();

}

function draw() {
stroke(random(150,200));
if(count<=5){
  checkmark();
}else{
  slash();
}
  if(x>width){
    x=w+random(-3,3);
    y+=w*1.5+random(-1,1);
    count=1;
  } 
  xl=x-random(w/6,w/5);
  yl=y-random(w/6,w/5);
  xr=x+random(w/3.5,w/2.5);
  yr=y-random(w/3.5,w/2.5)*2;
 
 if(y>height){
    noLoop();
  }
  count++;
  
}
function checkmark(){
  curve(x+random(-w,w), y+random(-w,w),x,y,xl,yl, xl+random(-w/2,w/2), yl+random(-w/2,w/2));
 // line(x,y,xr,yr);
   curve(x+random(-w,w), y+random(-w,w),x,y,xr,yr, xr+random(-w/2,w/2), yr+random(-w/2,w/2));
  x+=w/2;
  frameRate(random(1,5))
}
function slash(){
  curve(x+random(-w,w), y+random(-w,w),x+w/3,y-w/2,xl-w/2*4.5,yl, xl+random(-w/2,w/2), yl+random(-w/2,w/2));
  x+=w+random(-1,1);
  count=1;
  frameRate(random(1,5))
}