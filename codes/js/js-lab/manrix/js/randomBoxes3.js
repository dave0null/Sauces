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
    var MaxBalls = 100;

    var balls = [];

    function ball()
    {
        this.size = 20;

        this.x = W / 2;
        this.y = 0;

        this.xSpeed  = Math.cos(curtime)*10;
        this.ySpeed  = 0;

        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*255);

        this.rgba = "rgba("+this.r+","+this.g+","+this.b+",1)";
    }

    var curtime = 0;
    function update()
    {
        curtime += 0.045;
        for(i=0; i < balls.length; i++)
        {
            var b = balls[i];
            
            if(b.x < 0){ b.xSpeed *= -1; }
            if(b.x + b.size > W){ b.xSpeed *= -1; }
            if(b.y < 0){ b.ySpeed *= -1; }
            if(b.y + b.size > H){ 
                b.y = H - b.size;
                
                b.xSpeed *= .5;
                b.ySpeed *= .5;
                
                b.ySpeed *= -1; 
            }
            
            b.ySpeed += 0.25;
            
            b.x += b.xSpeed;
            b.y += b.ySpeed;
        }
    }
    
    function draw()
    {
        // Background
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0,W,H);
        
        //ctx.globalCompositeOperation = "lighter";
        for(i=0; i < balls.length; i++)
        {
            var b = balls[i];

            ctx.strokeStyle = b.rgba;

            //Circles
            /*
            ctx.beginPath();
            ctx.arc(b.x,b.y,b.size,0,Math.PI*2,false);
            ctx.fill();
            */
            // Box
            ctx.strokeRect(b.x,b.y,b.size,b.size);
        }
    }

    function main()
    {
        draw();
        update();
    }
    
    setInterval(function(){
        if(balls.length < MaxBalls)
            balls.push(new ball())
    },100);
    setInterval(main,30);
}