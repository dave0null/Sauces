window.onload = function() {
    var canvas = document.getElementById("c");
    var c = canvas.getContext("2d");
    
    var W = window.innerWidth,
        H = window.innerHeight
        canvas.width = W;
        canvas.height = H;
    
    var boxesDrawn = 0;
    var boxes = new Array();
    var index = 0;
    
    function init()
    {
        for(i=0; i< (W/45); i++) {   
            for(j=0; j < (H/45); j++) {
                boxes[index] = {x: i,y: j, done: 0};         
                index++;           
            }
        }
    }
    
    c.fillStyle = "black";
    c.fillRect(0,0,W,H);
    function main()
    {
        
        // After we finish everything
        if(boxesDrawn == boxes.length)    
        {
            font = "100px monospace";
            
            c.fillStyle = "rgba(0,255,0,10)";
            c.fillText("DONE!",200,canvas.height-20);    
    
            return;        
        }
        
        // Generate random number and use it to spawn boxes
        var rand = Math.round(Math.random()*index);
        
        // Random Colors
        var red = Math.round(Math.random()*255);
        var green = Math.round(Math.random()*255);
        var blue = Math.round(Math.random()*255);
            
        // Rectangle        
        if(boxes[rand]["done"] == 0)
        {
            
            boxes[rand]["done"] = 1;
            
            // Draw the rectangle
            c.fillStyle = "rgba("+red+","+green+","+blue+",0.5)";
            c.fillRect(boxes[rand]["x"] * 50,boxes[rand]["y"] * 50,45,45);
            
            // Borders
            c.strokeStyle = "rgba(50,50,100,0.5)";
            c.strokeRect(boxes[rand]["x"] * 50,boxes[rand]["y"] * 50,45,45);
            
            
            // Write the numbers on the box
            c.fillStyle = "rgba(0,0,255,0.1)";
            c.fillText(
                // Text
                boxes[rand]["x"] + "-" + boxes[rand]["y"], 
                // Coords
                (boxes[rand]["x"] * 50)+5,(boxes[rand]["y"] * 50)+20);
    
            boxesDrawn++;
        }
    }
    
    init();
    setInterval(main,30);
}

