class Character{
    constructor(character, origin, font, boundary){
        this.character = character;
        this.origin = origin;
        this.font = font;
        this.boundary = boundary;
        this.location = {x: origin.x, y: origin.y};
        this.rotation = 0;
        this.velocity = {x:Math.random()*5, y:Math.random()*5};
        this.maxVelocity = 8;
        this.home = false;
    }

    react(mouseCoords){
        if(this.character === "T"){
        }
        let diffX = this.location.x - mouseCoords.x;
        let diffY = this.location.y - mouseCoords.y;
        let strength = Math.sqrt((diffX**2) + (diffY**2))



       
            this.accelerate({y: -1*diffY/(strength**1.6), x: -1*diffX/(strength**1.6)})
       
    }

    setHome(){
        if(this.home){
            this.home = false;
            this.velocity = {x:Math.random()*5, y:Math.random()*5};
        }
        else{
            this.home = true;
        }
    }

    returnHome(){
        let diffX = this.origin.x - this.location.x;
        let diffY = this.origin.y - this.location.y;
     
        if(Math.abs(diffX) > 2){
            this.velocity.x += diffX/1000;
        }
        else{
            this.velocity.x = 0;
        }
        if(Math.abs(diffY) > 2){
            this.velocity.y += diffY/1000;
        }
        else{
            this.velocity.y = 0;
        }

        this.location.y += (this.origin.y - this.location.y)/20;
        this.location.x += (this.origin.x - this.location.x)/20;
        if(this.velocity.x === 0){
        } if(this.velocity.y === 0){
            this.location.y += (this.origin.y - this.location.y)/15;
        }
    }
    
    setBoundary(boundary){
        this.boundary = boundary;
    }


    draw(c) {
        if(this.character==="T"){
            console.log(this.location, this.velocity)
        }
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
        if(this.velocity.x > this.maxVelocity){
            this.velocity.x = this.maxVelocity;
        }
        if(this.velocity.x < -this.maxVelocity){
            this.velocity.x = -this.maxVelocity;
        }
        if(this.velocity.y > this.maxVelocity){
            this.velocity.y = this.maxVelocity;
        }
        if(this.velocity.y < -this.maxVelocity){
            this.velocity.y = -this.maxVelocity;
        }
    }

    move(){
        if(this.location.x <= this.boundary.x1 || this.location.x >= this.boundary.x2) {
            this.velocity.x *= -1;
        }
        if(this.location.y <= this.boundary.y1 || this.location.y >= this.boundary.y2) {
            this.velocity.y *= -1;
        }
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    update(c, mouseCoords){
        
        this.move();
        if(this.home){
            this.returnHome();
        }
        else{
            
        }
        this.draw(c);
    }
}

let char = new Character();
while(char.rotateTo(1,1) ){
    console.log(char)
}
