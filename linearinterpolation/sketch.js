
let a;
let b;
let c;
let t;
let f;
let mid;
let offset=0.01;

function setup() {
canvas = createCanvas(window.innerWidth, window.innerHeight);
 a=new ColorMaker();
 b=new ColorMaker();
 c=new ColorMaker();
}


function draw() {
a.cycle();
b.cycle();
c.cycle();
//println(a.col);
mid=noise(offset)*width;
  lerper(0,0,mid,height,a.col,b.col);
  lerper(mid,0,width-mid,height,b.col,c.col);
 
  offset+=0.01;
}
function lerper(x,  y,  w,  h,  f,  t){
  let tempf=color(f);
  let tempt=color(t);
  for(let i=x;i<x+w;i++){
    let m=map(i,x,x+w,0,1);
    let inter=lerpColor(f,t,m);
    stroke(inter);
    
    line(i,y,i,y+h);
  }
}

class ColorMaker{
  constructor(){
    //this.range=const(255);
    this.h=random(255);
    this.s=random(255);
    this.b=random(255);
    this.hs=random(-5,5);
    this.ss=random(-5,5);
    this.bs=random(-5,5);
    //this.col=color(h,s,b);
  }
cycle(){
    //colorMode(HSB, range, range, range);
    this.h+=this.hs;
    this.s+=this.ss;
    this.b+=this.bs;
    this.col=color(this.h,this.s,this.b);
    if(this.h>255||this.h<0){
      this.hs*=-1;
    }
    if(this.s>255||this.s<0){
      this.ss*=-1;
    }
    if(this.b>255||this.b<0){
      this.bs*=-1;
    }
  }
}