class Character{
    constructor(character, origin, font, boundary, group, home){
        
        this.character = character;
        this.origin = origin;
        this.font = font;
        this.boundary = boundary;
        this.group= group;
        this.home = home;
        this.colors = {first: '#FEA001', second: '#FEA001', third: '#00FFF3'}
        this.location = {x: origin.x, y: origin.y};
        if(home === false){
            this.velocity = {x:this.randomVelocity(4), y:this.randomVelocity(4)};
        }
        else{
            this.velocity = {x:0, y:0};
        }
    }

    randomVelocity(speed){
        let rand = 1
        if(Math.random() < 0.5){
            rand = -1;
        }
        rand *= Math.random();
        return rand*speed;
    }

    setHome(home){
        if(home === true){
            this.home = true;
        }
        else{
            this.velocity = {x:this.randomVelocity(4), y:this.randomVelocity(4)};
            this.home = false;
        }
    }

    returnHome(){
        let deceleration = 1.1;
        let snap = 25;
        if(this.group === 1){
            deceleration = 1.5;
            snap = 8;
        }
        if(this.group === 2){
            deceleration = 1.2;
            snap = 15;
        }
       

        this.velocity.x = this.velocity.x/deceleration;
        this.velocity.y = this.velocity.y/deceleration;

        let locDiffY = this.origin.y - this.location.y;
        let locDiffX = this.origin.x - this.location.x;

        this.location.x += locDiffX/snap;
        this.location.y += locDiffY/snap;

        if(this.velocity.x < 0.01){
            this.velocity.x = 0;
        }
        if(this.velocity.y < 0.01){
            this.velocity.y = 0;
        }
        if(this.velocity.x === 0){
            this.location.x += locDiffX/snap;
        } 
        if(this.velocity.y === 0){
            this.location.y += locDiffY/snap;
        }
        if(Math.abs(locDiffX) < 0.1 ){
            this.location.x = this.origin.x;
        }
        if(Math.abs(locDiffY) < 0.1 ){
            this.location.y = this.origin.y;
        }
    }
    
    setBoundary(boundary){
        this.boundary = boundary;
    }


    draw(c) {
        c.save();
        c.translate(this.location.x, this.location.y);
      
        c.font = this.font;
        const textWidth = c.measureText(this.character).width;
        
    
        const offsetX = -0.5 * textWidth;
        const offsetY = 0.5 * parseInt(c.font, 10); 
        c.fillStyle = this.colors.first;
        if(this.group === 2){
            c.fillStyle = this.colors.second;
        }
        else if(this.group === 3){
            c.fillStyle = this.colors.third;
        }
        
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
        let offset = c.measureText(this.character).width+1;
        if(this.location.x <= this.boundary.x1 + offset*4 || this.location.x >= this.boundary.x2 - offset) {
            this.velocity.x *= -1;
        }
        if(this.location.y <= this.boundary.y1 + 10 || this.location.y >= this.boundary.y2 - 30) {
            this.velocity.y *= -1;
        }
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    update(c){
        
        this.move();
        if(this.home){
            this.returnHome();
        }
        this.draw(c);
    }
}


