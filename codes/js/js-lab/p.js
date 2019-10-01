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

    // Initialize empty boxes array
    var boxes = [];
    var gridSize = 32;
    // width and height of our box
    var width  = 32
    var height = 32;

    /* Box class */
    function Box(_x,_y,_w,_h)
    {
        // x/y to use as movment
        this.x = _x;
        this.y = _y;
        this.width = _w
        this.height = _h

        // the movment speed
        this.xVel = 0; 
        this.yVel = 2; 
        
        this.rgba = "rgba(0,255,255,.1)"
        
        // set id function so we use in for loops
        this.setId = function(_id)
        {
            if(this.id == undefined)
                this.id = _id;
        }
        
        this.draw = function()
        {
            ctx.fillStyle = this.rgba
            ctx.fillRect(this.x,this.y,this.width,this.height);            
            
            ctx.strokeStyle = "rgba(0,0,255,1)"
            ctx.strokeRect(this.x,this.y,this.width,this.height);            
        }

        this.update = function()
        {
            if(this.y > H){
                this.y = H - this.height
                this.yVel *= -1
            } 
            
            this.yVel += 0.25
            
            this.y += this.yVel;
        }
    }
    
    // Push our box object to our array
    for(var i=0; i < W/gridSize ; i++)
    {
        for(var j=0; j < H/gridSize; j++) 
        {
            boxes.push(new Box( i * width, j * height ,width, height))
        }
    }
    
    for(var i=0; i < boxes.length; i++)
    {
        boxes[i].setId(i);
    }
    
    // draw function to draw our stuff on screen
    function draw()
    {
        // Background
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0,0,W,H);
        
        // Draw the boxes
        //ctx.globalCompositeOperation = "lighter";
        for(i=0; i < boxes.length; i++)
            boxes[i].draw();
        
        // Draw the text on bottom
        update();
    }

    // function to update our canvas logic
    function update()
    {   
        for(i=0; i < boxes.length; i++)
        {
            boxes[i].update();
        }
    }

    // update our main function every 30 second
    setInterval(draw,30);
    // http://natureofcode.com/book/chapter-1-vectors/ vector subtraction
}