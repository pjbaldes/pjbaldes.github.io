let nums=[];
let x=0;
let r=1;
let pivot=2;
let m;
let n;

function setup() {
  colorMode(HSB, 360,1,1,1);
 // createCanvas(100, 100);
  createCanvas(windowWidth ,windowHeight);
  for(let i = 0; i < width; i++) {
    nums.push(random(height-10));
}
  //   for(i=0;i<width;i++){
  //   line(i,height,i, height-nums[i]);
  // }
  strokeWeight(1);
}

function draw() {
  background(220);
  
  for(i=0;i<width;i++){
    m=map(nums[i],0,height-10, 180,0);
    n=map(nums[i],0,height-10,180,360);
    stroke(m,1,1,1);
    line(i,height,i, height-nums[i]);
    stroke(n,1,1,1);
    line(i,0,i,height-nums[i]);
  }
 // r=(int(random(1,width-1)));
for(k=0;k<100;k++){  
   pivot=nums[r];
  let templess=nums[r-1];
  let tempmore=nums[r+1];
  let templess2=nums[r-2];
  let tempmore2=nums[r+2];
  
  if(tempmore<pivot){
    nums[r]=tempmore;
    nums[r+1]=pivot;
  }
  print(frameCount%5);
 if(frameCount%5==0){
   r++;
 }else{
   r=(int(random(0,width-1)));
   
 }
  
  //r++;
  if(r>width-1){
    r=1;
  }
}
}