let x,y;
let tx=[];
let ty=[];
let targx=0;
let targy=0;
let xs,ys;
let ts, cs;
function setup() {
 // createCanvas(400, 400);
   createCanvas(windowWidth, windowHeight);
  for(i=0;i<100;i++){
  tx[i]=random(width);
  ty[i]=random(height);
  }
  x=random(width);
  y=random(height);
  strokeWeight(60);
  xs=0;
  ys=0;
  smooth();
   cs=color(random(255), random(255),random(255), random(255));
   r=random(tx);
  targx=random(tx);
  targy=random(ty);
  print(r)
  pick();
  }


function draw() {
 // background(220);
  stroke(cs);
  point(x,y);
 // stroke(200,0,0);
  noStroke();
  point(targx,targy);
 
  x=x+xs;
  y=y+ys;
  
  if(x<targx){
    xs=1;
  }else if(x>targx){
    xs=-1;
  }
   if(y<targy){
    ys=1;
  }else if(y>targy){
    ys=-1;
  }
  
  d=dist(x,y,targx,targy);
  
  if(d<=1){
    pick();
   
  }
       }

function pick(){
  r=(int(random(10)));
  targx=random(tx[r]);
  targy=random(ty[r]);
  cs=color(random(255), random(255),random(255), random(60,80));
}
  