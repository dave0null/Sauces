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
    // Mode 1, the boxes are following the mouse
    var startMoving = 0;
    // Mode 2, make the boxes sent back to thier original coord
    var goBack = 0;
    // Mode 3, make the balls move in circle
    var circle = 0;
/*  /MODES =========================================================== */
    
    // Status for the current mode
    var mode = "Idle";
    
    // Initialize empty boxes array
    var boxes = [];
    
    var gridSize = 30;

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
        this.r = 0      //Math.round(Math.random()*0);
        this.g = 245    //Math.round(Math.random()*255);
        this.b = 255    //Math.round(Math.random()*0);
        this.rgba = "rgba("+this.r+","+this.g+","+this.b+",0.5)";
        this.rgbaBase = this.rgba;  // save copy to use as default

        // just some variable that act as timer to use in trig
        this.curtime = 0;
        
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
            
            /* Mode 1, boxes following the mouse */
            if(startMoving == 1)
            {
                var m = new pVector(mouse.x,mouse.y);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(1+Math.random()*10);

                // Change color if the box near our mouse
                if( lineDistance({x:this.x,y:this.y},{x:mouse.x,y:mouse.y}) < 50 )
                {
                    this.r = Math.round(Math.random()*255);
                    this.g = Math.round(Math.random()*255);
                    this.b = Math.round(Math.random()*255);
                    this.rgba = "rgba("+this.r+","+this.g+","+this.b+",0.1)";
                }
                
                this.xVel += m.x;
                this.yVel += m.y;

                this.xVel *= 0.94;
                this.yVel *= 0.94;
                
            /* Mode 2, boxes back to normal position */
            } else if(goBack == 1) {

                m = new pVector(this.xBase,this.yBase);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(0.5);

                // Change color if the box near our mouse                
                if( lineDistance({x:this.x,y:this.y},{x:this.xBase,y:this.yBase}) < 10 )
                    this.rgba = this.rgbaBase;
                
                this.xVel += m.x;
                this.yVel += m.y;
                
                this.xVel *= 0.94;
                this.yVel *= 0.94;
            
            // Mode 3, move in ring
            } else if(circle == 1) {
                
                
                if(this.id % 2 == 0)
                {
                    this.S = mouse.x + Math.sin(this.curtime * 4 + this.id)*300,
                    this.C = mouse.y + Math.cos(this.curtime + this.id)*300;
                    
                    // Change color if the box near our mouse
                    if( lineDistance({x:this.xDist,y:this.yDist},{x:this.S,y:this.C}) < 500 )
                        this.rgba = "rgba(0,255,0,.5)"
                        
                } else {
                    this.S = mouse.x + Math.cos(this.curtime * 4 + this.id)*300,
                    this.C = mouse.y + Math.sin(this.curtime + this.id)*300;
                    
                    // Change color if the box near our mouse
                    if( lineDistance({x:this.xDist,y:this.yDist},{x:this.S,y:this.C}) < 500 )
                        this.rgba = "rgba(255,0,0,.5)"
                }
                
                this.setDist({x:this.S,y:this.C})
        
                m = new pVector(this.xDist,this.yDist);
                m.sub({x: this.x, y:this.y}); 
                m.normalize();
                m.mul(10);

                this.curtime += (Math.PI*2) / boxes.length;
                
                this.xVel += m.x;
                this.yVel += m.y;
                
                this.xVel *= 0.94;
                this.yVel *= 0.94;
                
            }
            
            this.x += this.xVel;
            this.y += this.yVel;
        }
    }

    // Push our box object to our array
    for(i=1; i < (W)/gridSize-2; i++){
        for(j=2; j < 20; j++) {
            boxes.push( new Box( i * gridSize, j * gridSize ) )
        }
    }
    
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
        ctx.fillText("Mode: "+mode,0,H-30);
        ctx.fillText("Keys: W,Space bar, Left mouse",0,H-10);
        update();
    }

    // function to update our canvas logic
    function update()
    {   
        for(i=0; i < boxes.length; i++)
        {
            boxes[i].setId(i);
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
        startMoving = 1;
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
            mode = "Idle"
        }
        
        // W = 87
        if(e.keyCode == 87)
        {
            startMoving = 0
            goBack = 0;
            circle = 1;
            mode = "Move in ring"
        }
    }
/*  /EVENTS ========================================*/

    // update our main function every 30 second
    setInterval(draw,30);
}