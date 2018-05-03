var oldX;
var oldY;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw(){

noStroke();
fill(0);
if(mouseIsPressed){
console.log("PRESS WORK");
stroke(255,0,0);
strokeWeight(1);
line(oldX, oldY, mouseX, mouseY);
}
oldX = mouseX;
oldY = mouseY;

}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
