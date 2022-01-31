//
//changed this.inc in object
let shps=[];
let j;
let r;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  for(i=0;i<50;i++){
    shps[i]=new Shapes();
  }
}

function draw() {
 
  background(shps[0].c);
 for(j=0;j<shps.length;j++){
   shps[j].display();
   if(shps[j].t<=0){
     shps[j]=new Shapes();
   }
 }
  r=random(1);
  if(r>.998){
    remake();
    print("remake");
  }
}

class Shapes{
  constructor(x,y,w,h,c,t,tt,r, inc, l, ls,rou, xoff, yoff){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.c=c;
    this.r=r;
    this.inc=inc;
    this.l=l;
    this.ls=ls;
    this.tt=tt;
    this.t=t;
    this.yoff=yoff;
    this.xoff=xoff;
    this.rou=rou;
    this.r=random(255);
    this.g=random(255);
    this.b=random(255);
    this.xs=random(-5,5);
    this.ys=random(-5,5);
    
    this.x=random(width);
    this.y=random(height);
    this.w=random(width/2);
    this.h=random(height/2);
    this.rou=random(this.w,this.h);
    this.tt=random(20,65);
    this.c=color(random(255), random(255), random(255), random(20,255));
    this.r=random(-.008,.008);
    this.inc=random(-.006, .006);
    this.l=random(200,1000);
    this.ls=random(.2);
    this.tt=random(20,70);
    this.t=random(20,70);//comment to zero for inc
    this.xoff=random(-this.w, this.w);
    this.yoff=random(-this.h, this.h);
  }
  display(){
   // fill(this.r, this.g, this.b, this.t);
    fill(this.c);
   // fill(this.c, this.t);
    push();
     
    translate(this.x,this.y);
     //this.x+=this.xs;
   // this.y=this.ys;
    rotate(this.r);
    rect(+this.xoff,+this.yoff,this.w, this.h,this.rou/5)
    this.r+=this.inc;
   
    pop();
  
    if(this.t>this.tt){
      this.t*=-1;
    }
  }
  
}
function mousePressed(){
  for(i=0;i<shps.length;i++){
    shps[i]=new Shapes();
  }
}
function remake(){
  let r=(int(random(shps.length)))
  shps[r]=new Shapes();
}