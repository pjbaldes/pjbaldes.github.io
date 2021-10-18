let t,b,r,l;
let s;
let mode;
let x,y;
function setup() {
  createCanvas(600, 400);
   createCanvas(windowWidth, windowHeight);
  s=20;
  t=0;
  b=height-s;
  r=width-s;
  l=0;
  x=l;
  y=t;
  xs=0;
  ys=0;
  mode=0;
 // frameRate(mouseX/10);
}

function draw() {
 // background(220);
  //frameRate(5);
  
  fill(random(255));
  rect(x,y,s,s);
  x+=xs;
  y+=ys;
  
  if(mode==0){
    xs=s;
    ys=0;
  }
  if(mode==1){
    xs=0;
    ys=s;
  }
  if(mode==2){
    ys=0;
    xs=-s;
  }
  if(mode==3){
    xs=0;
    ys=-s;
  }
  
  
  if(x>=r-s && mode==0){
    mode=1;
    t=t+s;
  }
  if(y>=b-s && mode==1){
    mode=2;
    r=r-s;
  }
  if(x<=l+s && mode==2){
    mode=3;
    b=b-s;
  }
  if(y<=t+s && mode==3){
    mode=0;
    l=l+s;
  }
  
  //thinking about a test to reset this asks if the bottom minus the top is less than the size???
  if(r-l<s && b-t<s){
    reset()
      
    }
  
  print(x,y);
}
function reset(){
   s=20;
  t=0;
  b=height-s;
  r=width-s;
  l=0;
  x=l;
  y=t;
  xs=0;
  ys=0;
  mode=0;
  background(random(255));
}
