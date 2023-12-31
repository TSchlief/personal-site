var canvas = document.getElementById('canvas-title');
var c = canvas.getContext('2d');

const title = "Travis Schlief";
const description = "Junior Developer";
const quote = "Creating amazing things.";
var origin = {x:61, y:130};
var originOffset= -95;
var chars = [];
var textWidth = 0; 
var textScale = 60;
const textScaleOriginal = 60;
var boundary = {x1: 0, x2: 0, y1: 0, y2: 0};
var isTextHome = false;

function resizeCanvas() {
    console.log("resize")
    let element = document.getElementById("title");
    let update = false;
    if(canvas.width !== element.offsetWidth){
        update = true;
    }

    console.log(canvas.width, origin);
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;
    boundary.x2 = element.offsetWidth;
    boundary.y2 = element.offsetHeight;
    originOffset = 0;
    if(element.offsetWidth < 400){
        textScale = textScaleOriginal/2;
    }
    else if(element.offsetWidth >= 400 && element.offsetWidth < 675){
        textScale = textScaleOriginal/1.4;
    }
    else{
        originOffset = -95;
        textScale = textScaleOriginal
    }

    if(element.offsetWidth > 992){
        originOffset = -200;
    }
    if(update){
        chars = []
        createCharacters();
    }

}
resizeCanvas();

function handleScroll(e) {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log(scrollTop)
    let home = true;

    if (scrollTop === 0 ) {
       home = false;
    }

    if(home !== isTextHome){

        isTextHome = home;
        for (let i = 0; i < chars.length; i++) {
            chars[i].setHome(home)
        }

    }
}



window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", handleScroll);

function createCharacters() {
    textWidth = 0;
    for (let i = 0; i < title.length; i++) {
        textWidth += (textScale/10)*(c.measureText(title[i]).width) -0.3;
    }
    
    origin.y = canvas.height/1.5;
    if(canvas.width >= 675){
    
        origin.x = (canvas.width/2) - (textWidth/2) + originOffset;
    }
    
    
    let charX = origin.x;
    for (let i = 0; i < title.length; i++) {
      
      chars.push(new Character(title[i], { x: charX, y: origin.y },`${textScale}px Nunito`, boundary, 1, isTextHome));
      let width = (textScale/10)*((c.measureText(title[i]).width/2) + (c.measureText(title[i+1]).width)/2) +2;
      charX += width;
    }


    charX = origin.x-4;
    for (let i = 0; i < description.length; i++) {
      
      chars.push(new Character(description[i], { x: charX, y: origin.y+textScale }, `${textScale/1.8}px Nunito`, boundary, 2, isTextHome));
      let width = (textScale/20)*((c.measureText(description[i]).width/2) + (c.measureText(description[i+1]).width)/2) +2;
      charX += width;
    }
    
    charX = origin.x-4;
    for (let i = 0; i < quote.length; i++) {
      
      chars.push(new Character(quote[i], { x: charX, y: origin.y+textScale*1.8 }, `${textScale/3}px Nunito`, boundary, 3, isTextHome));
      let width = (textScale/35)*((c.measureText(quote[i]).width/2) + (c.measureText(quote[i+1]).width)/2) +2;
      charX += width;
    }

 
  }

 
 


function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < chars.length; i++) {
    
        chars[i].update(c);
    }
}
animate();