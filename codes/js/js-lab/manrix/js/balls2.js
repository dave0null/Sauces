window.onload = function()
{
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    
    // Set our variables to our window size
    var W = window.innerWidth,
        H = window.innerHeight;

    // Set the canvas to match our width/height
    canvas.width = W;
    canvas.height = H;

    // Max balls we wana make
    var MaxBalls = 50;

    // initialize empty balls array
    var balls = [];

    // curtime for the balls math
    var curtime = 0;
    
    // Track mouse movment
    var mouse = {x: 0,y: 0}                             // make variable to store our mouse x/y
    addEventListener("mousemove",trackMouse,false);
    function trackMouse(e)
    {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    }
    
    // Track keystrokes
    addEventListener("keydown",trackKeyboard,false);
    function trackKeyboard(e)
    {
        console.log(e.keyCode);
        
        if(e.keyCode == 32)
            spawnBalls();
    }
    
    function spawnBalls()
    {
        if(balls.length < MaxBalls)
        {
            balls.push(new ball())
        }
    }
    
    /* Ball Class */
    function ball()
    {
        // Radius size of the ball
        this.radius = 20;
        
        this.x = W / 2;
        this.y = H / 2;
        
        this.xVelocity = Math.cos(curtime)*5;
        this.yVelocity = Math.sin(curtime)*5;
        
        // Colors
        this.r = Math.round(Math.random()*1);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*1);
        
        this.rgba = "rgba("+this.r+","+this.g+","+this.b+",0.5)";
    }

    function update()
    {
        spawnBalls();
        curtime += 25;
        
        for(i=0; i < balls.length; i++)
        {
            var b = balls[i];
            
            // Bounce off walls
            if(b.x < b.radius || b.x + b.radius > W) {
                b.xVelocity *= -1;
            }
            
            if(b.y < b.radius || b.y + b.radius > H) {
                b.yVelocity *= -1;
            }
            
            b.x += b.xVelocity ;
            b.y += b.yVelocity ;
        }
    }

    function draw()
    {
        // Background
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0,0,W,H);

        // Draw balls
        ctx.globalCompositeOperation = "lighter";
        for(i=0; i < balls.length; i++)
        {
            var b = balls[i];
            
            // gradient colors
            b.grd = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.radius);
            b.grd.addColorStop(0.1,"rgba(255,255,255,1)");
            b.grd.addColorStop(0.4,b.rgba);
            b.grd.addColorStop(1.0,"rgba(0,0,0,1)");
        
            // Fill with gradient
            ctx.fillStyle = b.grd;
            
            /* draw circle */
            ctx.beginPath()
            ctx.arc(b.x,b.y,b.radius,0,Math.PI*2);
            ctx.fill();
            
            //ctx.fillRect(b.x,b.y,b.radius,b.radius);
        }
    }

    function main()
    {
        draw();
        update();
    }
    
    // The main loop
    setInterval(main,30);
}