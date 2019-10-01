window.onload = function()
{
    var canvas = 
        document.getElementById("c");
    var ctx =
        canvas.getContext("2d");
    
    var W = window.innerWidth,
        H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;
    
    // Make listener and store the c,y for our mouse
    var mouse = {x: 0,y: 0};
    addEventListener("mousemove",function(e) {
        mouse.x = Math.floor(e.pageX/50)*50;
        mouse.y = Math.floor(e.pageY/50)*50;
    },false);

    // Track mouse 
    function trackMouse()
    {
        ctx.strokeStyle = "white";
        ctx.strokeRect(mouse.x,mouse.y,gridSize,gridSize);
    }

    // Calculate stuff for grid
    var gridSize = 50;
    var cols = Math.round(W / gridSize); // so its 16 cols
    var rows = Math.round(H / gridSize);

    // Initialize empty 2d array to make grid
    var grid = new Array(cols);
    for(i=0; i < cols; i++)
    {
        grid[i] = i;
        grid[i] = new Array(rows);
        for(j=0; j < rows; j++)
        {
            grid[i][j] = j;
        }
    }
    
    // Draw grids : )
    function drawGrid()
    {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        for(i=0; i < grid.length; i++)
        {
            for(j=0; j < grid[i].length; j++)
            {
                ctx.strokeRect(i * gridSize, j * gridSize,gridSize,gridSize);
            }
        }
    }
    
    
    // hold coords for our red shit
    var walls = [
        //[0,0],
    ]

    function box(_x,_y)
    {
        if(_x == undefined)
            this.x = Math.round(Math.random()*5);
        if(_y == undefined)
            this.y = Math.round(Math.random()*rows-1);
        
        if(_x != undefined) 
            this.x = _x / gridSize;
        if(_y != undefined) 
            this.y = _y / gridSize;
        
        this.xSpeed = 1;
        this.ySpeed = 0;
    
        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*255);
        this.rgb = "rgb("+this.r+","+this.g+ "," +this.b+ ")";
    };

    // initialize empty boxes array to save our boxes ;3
    var boxes = [];
    for(b=0; b < 20; b++)
    {
        boxes.push(new box());
    }
    
    addEventListener("keyup",
    function(e)
    {
        if(e.keyCode==32) {
            boxes.push(new box(mouse.x,mouse.y));
        }
    }
    ,false)

    function update()
    {
        for(b=0; b < boxes.length; b++)
        {
            var box = boxes[b];
             
            // Loop through all boxes
            for(b2=0; b2 < boxes.length; b2++)
            {
                if(b != b2) 
                {
                    var box2 = boxes[b2];
                    if(
                        (box2.xSpeed == 0) &&
                        (box.x == box2.x) && 
                        (box.y == box2.y)
                        
                    ){
                        box.x -= 1;
                        box.xSpeed = 0;
                    }
                }
            }
    
            // loop through all walls to avoid or stop at
            for(w=0; w < walls.length; w++)
            {
                var wall = walls[w];
                if(box.x == wall[0] && box.y == wall[1]) 
                {
                    box.x -= 1;
                    box.y += 1;
                }
            }
            
            box.x += box.xSpeed;
            if(box.x * gridSize >= (cols) * gridSize) {
                box.x -= 1;
                box.xSpeed = 0;
            }

        }
    }
    
    function draw()
    {
        // Background
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0,W,H);
        
        // Draw the grids
        drawGrid();

        // Draw walls 
        ctx.fillStyle = "red";
        for(w=0;w < walls.length; w++)
        {
            var wall = walls[w];
            ctx.fillRect(wall[0] * gridSize,wall[1] * gridSize,gridSize,gridSize);
        }

        for(b=0; b < boxes.length; b++)
        {
            var box = boxes[b];
            ctx.fillStyle = box.rgb;
            ctx.fillRect(box.x * gridSize, box.y * gridSize, gridSize,gridSize);
        }
    }
    function main()
    {   
        draw();
        trackMouse();
        update();
    }
    setInterval(main,50);
}