class Character{
    constructor(character, origin, font){
        this.character = character;
        this.origin = origin;
        this.font = font;
        this.location = {x: origin.x, y: origin.y};
        this.rotation = 0;

        this.velocity = {x:0, y:0};
    }

    react(mouseCoords){
        if(this.character === "T"){
        }
        let diffX = this.location.x - mouseCoords.x;
        let diffY = this.location.y - mouseCoords.y;
        let strength = Math.sqrt((diffX**2) + (diffY**2))



        if(Math.abs(diffX) < 100 && Math.abs(diffY) < 100){
            this.accelerate({y: diffY*2/(strength**1.5), x: diffX*2/(strength**1.5)})
        }
    }

    returnHome(){
        let diffX = this.origin.x - this.location.x;
        let diffY = this.origin.y - this.location.y;
     
        if(Math.abs(diffX) > 4){
            this.velocity.x += diffX/1000;
        }
        else{
            this.velocity.x = 0;
        }
        if(Math.abs(diffY) > 4){
            this.velocity.y += diffY/1000;
        }
        else{
            this.velocity.y = 0;
        }

        if(this.velocity.x === 0){
            this.location.x += (this.origin.x - this.location.x)/15;
        } if(this.velocity.y === 0){
            this.location.y += (this.origin.y - this.location.y)/15;
        }
    }

    draw(c) {
        c.save();
        c.translate(this.location.x, this.location.y);
      
        c.font = this.font;
        const textWidth = c.measureText(this.character).width;
        
    
        const offsetX = -0.5 * textWidth;
        const offsetY = 0.5 * parseInt(c.font, 10); 
      
        c.fillStyle = 'black';
        c.fillText(this.character, offsetX, offsetY);
        c.restore();
      }

    accelerate(acceleration){
        this.velocity.x += acceleration.x;
        this.velocity.y += acceleration.y;
    }

    move(){
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    update(c, mouseCoords){
        this.react(mouseCoords)
        this.move();
        this.returnHome();
        this.draw(c);
    }
}

let char = new Character();
while(char.rotateTo(1,1) ){
    console.log(char)
}
