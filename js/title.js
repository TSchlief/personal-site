var canvas = document.getElementById('canvas-title');
var c = canvas.getContext('2d');

const title = "Travis Schlief";
const description = "Junior Developer";
const quote = "Creating amazing things piece by piece.";
var origin = {x:60, y:130};
var chars = [];
var mouseCoords = {x:0,y:0};
var textWidth = 0; 
var textScale = 60;
const textScaleOriginal = 60;

function resizeCanvas() {
    console.log("resize")
    let element = document.getElementById("title");
    console.log(element);
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    if(element.offsetWidth < 675){
        textScale = textScaleOriginal/2;
    }
    else{
        textScale = textScaleOriginal
    }
    chars = []
    createCharacters();

}
resizeCanvas();

function handleMouseMove(e) {
  
    mouseCoords.x = e.clientX;
    mouseCoords.y = e.clientY;
}
function handleMouseOut(e) {
  
    mouseCoords.x = 10000;
    mouseCoords.y = 10000;
}


canvas.addEventListener('mousemove', handleMouseMove);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("mouseout", handleMouseOut);

function createCharacters() {
    textWidth = 0;
    for (let i = 0; i < title.length; i++) {
        textWidth += (textScale/10)*(c.measureText(title[i]).width) + 3;
    }
  
    let charX = origin.x;
    for (let i = 0; i < title.length; i++) {
      
      chars.push(new Character(title[i], { x: charX, y: origin.y },`${textScale}px Nunito`));
      let width = (textScale/10)*((c.measureText(title[i]).width/2) + (c.measureText(title[i+1]).width)/2) +2;
      charX += width;
    }


    charX = origin.x-5;
    for (let i = 0; i < description.length; i++) {
      
      chars.push(new Character(description[i], { x: charX, y: origin.y+textScale }, `${textScale/1.5}px Nunito`));
      let width = (textScale/18)*((c.measureText(description[i]).width/2) + (c.measureText(description[i+1]).width)/2) +2;
      charX += width;
    }
    
    charX = origin.x-5;
    for (let i = 0; i < quote.length; i++) {
      
      chars.push(new Character(quote[i], { x: charX, y: origin.y+textScale*1.8 }, `${textScale/2}px Nunito`));
      let width = (textScale/30)*((c.measureText(quote[i]).width/2) + (c.measureText(quote[i+1]).width)/2) +2;
      charX += width;
    }

 
  }
  
  createCharacters();


function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < chars.length; i++) {
    
        chars[i].update(c, mouseCoords);
    }
}
animate();