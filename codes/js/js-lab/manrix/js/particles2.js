window.onload = function()
{
    // get HTML element by ID
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");

    // Set our variables to our window size
    var W = window.innerWidth,
        H = window.innerHeight;

    // Set the canvas to match our width/height
    canvas.width = W;
    canvas.height = H;

    // Variable that holds the mouse coords
    var mouse = {x:50, y:50}
    
/*  MODES ============================================================ */
    // the boxes are following the mouse
    var startMoving = 0;
    // make the boxes sent back to thier original coord
    var goBack = 0;
    // make the balls move in circle
    var circle = 0;
    // make balls bounce off the screen
    var bounce = 0;
    // Random colors mode
    var randomColors = 0
/*  /MODES =========================================================== */
    
    // Status for the current mode
    var mode = "Idle";
    
    // Initialize empty boxes array
    var boxes = [];
    
    var gridSize = 30;

    // index that we choose so we move boxes 1 by 1
    var moveIndex = 0;
    
    // index for the random colors mode
    var randomColorsIndex = 0;
    
    /* 2d vector class */
    function pVector(_x,_y)
    {
        this.x = _x;
        this.y = _y;

        this.add = function(vector)
        {
            this.x += vector.x;
            this.y += vector.y;
        }
        
        this.sub = function(vector)
        {
            this.x -= vector.x;
            this.y -= vector.y;
        }

        this.mul = function(number)
        {
            this.x *= number;
            this.y *= number;
        }
        
        this.div = function(number)
        {
            this.x /= number;
            this.y /= number;
        }

        this.mag = function()
        {
            return Math.sqrt(this.x*this.x + this.y*this.y)
        }

        this.normalize = function()
        {
            var ma = this.mag();
            if(ma != 0)
                this.div(ma);
        }
    }

    // count distance
    function lineDistance( point1, point2 )
    {
      var xs = 0;
      var ys = 0;

      xs = point2.x - point1.x;
      xs = xs * xs;

      ys = point2.y - point1.y;
      ys = ys * ys;

      return Math.sqrt( xs + ys );
    }
    
    function getRandomIndex(max)
    {
        return Math.round(Math.random()*max)
    }
    
    /* Box class */
    function Box(_x,_y)
    {
        // save the x/y original value 
        this.xBase = _x;
        this.yBase = _y;

        // x/y to use as movment
        this.x = _x;
        this.y = _y;

        // width and height of our box
        this.width  = 30;
        this.height = 30;

        // the movment speed
        this.xVel = 0; 
        this.yVel = 0; 
        
		// the colors for the drawing
        this.r = 255//Math.round(Math.random()*255);
        this.g = 0//Math.round(Math.random()*255);
        this.b = 1//Math.round(Math.random()*255);
        this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";
        this.rgbaBase = this.rgba;  // save copy to use as default

        // just some variable that act as timer to use in trig
        this.curtime = 0;

        // var for the get colors mode
        this.infected = 0
        
        // use this function if we wana set 2d vector target
        this.setDist = function(vector)
        {
            this.xDist = vector.x;
            this.yDist = vector.y;
        }
        
        // set id function so we use in for loops
        this.setId = function(_id)
        {
            if(this.id == undefined)
                this.id = _id;
        }
        
        this.draw = function()
        {
            ctx.strokeStyle = this.rgba;
            ctx.strokeRect(this.x,this.y,this.width,this.height);

            //ctx.fillStyle = this.rgba
            //ctx.fillRect(this.x,this.y,this.width,this.height);            
        }

        this.update = function()
        {
            if(this.xVel > 20 || this.xVel < -20) {this.xVel *= .99 }
            if(this.yVel > 20 || this.yVel < -20) {this.yVel *= .99 }
            
            /* Follow the mouse Mode. */
            if(startMoving == 1)
            {
            
                this.rgba = "rgba(255,255,255,0.1)"
                var m = new pVector(mouse.x,mouse.y);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(1);

                this.xVel += m.x ;
                this.yVel += m.y ;
                
                this.xVel *= .99;
                this.yVel *= .99;
                
            /* Move all back to normal position at same time Mode */
            } else if(goBack == 1) {

                m = new pVector(this.xBase,this.yBase);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(0.5);

                if( lineDistance({x:this.x,y:this.y},{x:this.xBase,y:this.yBase}) < 1 )
                {
                    this.rgba = this.rgbaBase;
                    this.x = this.xBase
                    this.y = this.yBase
                    
                    m.x = 0;
                    m.y = 0;
                }
                
                this.xVel += m.x;
                this.yVel += m.y;
                
                this.xVel *= 0.94;
                this.yVel *= 0.94;
            
            // slowly move each box to its original position Mode
            } else if(goBack == 2) {
                
                if(this.id <= moveIndex)
                {
                    m = new pVector(this.xBase,this.yBase);
                    m.sub({x: this.x, y:this.y}); 
                    m.normalize();
                    m.mul(5);

                    if( lineDistance({x:this.x,y:this.y},{x:this.xBase,y:this.yBase}) < 1 )
                    {
                        this.rgba = this.rgbaBase;
                        this.x = this.xBase
                        this.y = this.yBase
                        
                        m.x = 0;
                        m.y = 0;
                    }
                    
                    this.xVel += m.x;
                    this.yVel += m.y;    
                    
                    this.xVel *= 0.5;
                    this.yVel *= 0.5;
                    
                    if(this.x == this.xBase && this.xVel <= 0 && this.yVel <= 0 && this.y == this.yBase)
                    {
                        this.rgba = this.rgbaBase
                        moveIndex++;
                    }
                    
                }  else {
                    
                    this.xVel *= .5
                    this.yVel *= .5
                    
                    this.rgba = "rgba(100,100,100,0.3)"
                }
                
            // trig movment Mode
            } else if(circle == 1) {
                
                this.curtime += (Math.PI*2)/boxes.length;
                
                if(this.id % 2 == 0)
                {
                
                    this.S = mouse.x + Math.sin((360/boxes.length)* this.id + this.curtime * 4)*300;
                    this.C = mouse.y + Math.cos((360/boxes.length)* this.id + this.curtime)*300;
                    
                    // Change color if the box near our mouse
                    if( lineDistance({x:this.xDist,y:this.yDist},{x:this.x,y:this.y}) < 1 )
                        this.rgba = "#79f7cf"
                        
                } else {
                    this.S = mouse.x + Math.cos((360/boxes.length)* this.id + this.curtime * 4)*300;
                    this.C = mouse.y + Math.sin((360/boxes.length)* this.id + this.curtime)*300;
                    
                    // Change color if the box near our mouse
                    if( lineDistance({x:this.xDist,y:this.yDist},{x:this.x,y:this.y}) < 1 )
                        this.rgba = "#F778A1"
                }
                
                this.setDist({x:this.S,y:this.C})
        
                m = new pVector(this.xDist,this.yDist);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(5);

                this.xVel += m.x;
                this.yVel += m.y;
                
                this.xVel *= 0.94;
                this.yVel *= 0.94;

            // Bouncing boxes Mode
            } else if(bounce == 1) {
                
                if(this.x < 0){
                    this.x = 0;
                    this.xVel *= -1
                }
                
                if(this.x > W - this.width){
                    this.x = W - this.width;
                    this.xVel *= -1
                }
                
                if(this.y < 0){
                    this.y = 0;
                    this.yVel *= -1
                }
                
                if(this.y > H - this.height){
                    
                    this.y = H - this.height;
                    this.yVel *= -1
                    
                    this.yVel *= .5;
                    this.xVel *= .5;
                } 
                
                this.yVel += .25;
                
            // Change random colors mode
            } else if(randomColors == 1) {
                
                for(var i=0; i < boxes.length; i++)
                {
                    randomColorsIndex  = getRandomIndex(boxes.length)
                    
                    var b2 = boxes[i];
                    if( this.id != i && i == randomColorsIndex )
                    {
                    
                        if(this.infected == 1 && b2.infected == 0)
                        {
                            ctx.fillStyle = "rgba(255,255,255,0.5)"
                            
                            ctx.fillRect(this.x  ,this.y,this.width,this.height)
                            ctx.fillRect(b2.x  ,b2.y,b2.width,b2.height)
                            
                            // lines
                            ctx.strokeStyle = "rgba(255,255,255,0.5)"
                            ctx.beginPath();
                            ctx.moveTo(b2.x   + (b2.width/2),b2.y+(b2.height/2))
                            ctx.lineTo(this.x + (this.width/2),this.y+(this.height/2))
                            ctx.stroke();
                        
                            b2.infected = 1
                            this.infected = 0;
                        }
                    }
                }
                
                if(this.x < 0){
                    this.x = 0;
                    this.xVel *= -1
                }
                
                if(this.x > W - this.width){
                    this.x = W - this.width;
                    this.xVel *= -1
                }
                
                if(this.y < 0){
                    this.y = 0;
                    this.yVel *= -1
                }
                
                if(this.y > H - this.height){
                    this.y = H - this.height;
                    this.yVel *= -1
                }
                
                this.xVel *= .5
                this.yVel *= .5
            }
            
            this.x += this.xVel;
            this.y += this.yVel;
        }
    }
    
    // Push our box object to our array
    for(var i=0; i < W/gridSize ; i++){
        for(var j=0; j < H/gridSize; j++) {
            boxes.push( new Box( i * gridSize, j * gridSize ) )
        }
    }
    
    for(var i=0; i < boxes.length; i++)
    {
        boxes[i].setId(i);
    }
    
    boxes[randomColorsIndex].infected = 1;
    
    // draw function to draw our stuff on screen
    function draw()
    {
        // Background
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,.5)";
        ctx.fillRect(0,0,W,H);
        
        // Draw the boxes
        ctx.globalCompositeOperation = "lighter";
        for(i=0; i < boxes.length; i++)
            boxes[i].draw();
        
        // Draw the text on bottom
        ctx.fillStyle = "white";
        ctx.font = "20px monospace";
        ctx.fillText("Keys: W,Q,E, Left mouse, Space bar and  1",10,H - 20);
        ctx.fillText("Mode: "+mode,10,H - 40);
        update();
    }

    // function to update our canvas logic
    function update()
    {   
        for(i=0; i < boxes.length; i++){
            boxes[i].update();
        }
    }

/*  EVENTS =========================================*/
    
    // Mouse movment
    addEventListener("mousemove",trackMouse,false);
    function trackMouse(e)
    {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    
    // Mouse click
    addEventListener("mouseup",start,false);
    function start()
    {
        startMoving = 1
        goBack = 0;
        circle = 0
        bounce = 0
        randomColors = 0
        mode = "Following the mouse"
    }
    
    // keyboard press
    addEventListener("keyup",trackKeyboard,false);
    function trackKeyboard(e)
    {
        console.log(e.keyCode);
        
        // space = 32
        if(e.keyCode == 32)
        {
            startMoving = 0
            goBack = 1;
            circle = 0
            bounce = 0
            randomColors = 0
            mode = "Idle"
        }
        
        // W = 87
        if(e.keyCode == 87)
        {
            startMoving = 0
            goBack = 0;
            circle = 1;
            bounce = 0
            randomColors = 0
            mode = "Move in ring"
        }
        
        // Q = 81
        if(e.keyCode == 81)
        {
            startMoving = 0
            goBack = 0;
            circle = 0;
            bounce = 1
            randomColors = 0
            mode = "EXPLODE!"
        }
        
        // E = 69
        if(e.keyCode == 69)
        {
            moveIndex = 0;
            
            startMoving = 0
            goBack = 2;
            circle = 0;
            bounce = 0;
            randomColors = 0
            mode = "Go back 1 by 1"
        }
        
        // color 1 = 49
        if(e.keyCode == 49)
        {
            moveIndex = 0;
            
            startMoving = 0
            goBack = 0;
            circle = 0;
            bounce = 0;
            randomColors = 1
            
            mode = "Electric"
        }
        
    }
/*  /EVENTS ========================================*/

    // update our main function every 30 second
    setInterval(draw,30);
    // http://natureofcode.com/book/chapter-1-vectors/ vector subtraction
}