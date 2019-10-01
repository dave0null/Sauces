window.onload = function()
{
    var canvas  = document.getElementById("c");
    var ctx     = canvas.getContext("2d");
    
    var W = window.innerWidth,
        H = window.innerHeight;

    canvas.width  = W;
    canvas.height = H;
    
    var degree = 0;
    var mouse = {};
    
    function toRadian(_degree) {
        //return (_degree / 180) * Math.PI ;
        return (_degree * Math.PI) / 180;
    }
    
    function toDegree(_radian) {
        return (_radian * 180) / Math.PI
    }
    
    function draw()
    {
        var radian = toRadian(degree);
        
        // Background
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0,0,W,H);
    
        ctx.strokeStyle = "rgba(255,0,0,1)";
        
        // center  circle
        ctx.beginPath();
        ctx.arc(W/2,H/2,5,Math.PI*2,false);
        ctx.stroke()
        
        // big circle
        ctx.beginPath();
        ctx.arc(W/2,H/2,200,-radian,false);
        ctx.stroke()
        
        // line
        ctx.beginPath();
        ctx.moveTo(W/2,H/2)
        ctx.lineTo(W/2 + Math.cos(-radian)*210, H/2 + Math.sin(-radian)*210)
        ctx.stroke()
        // line2
        ctx.beginPath();
        ctx.moveTo(W/2,H/2)
        ctx.lineTo(W/2 + 210, H/2 )
        ctx.stroke()
        
        // Text
        ctx.font = "30px Helvetica Neue" 
        ctx.strokeText("Degree: " + degree , 10, H/2)
        ctx.strokeText("toRadian: " + radian , 10, H/2 + 50*1)
        
        update();
    }
    
    function update()
    {
        if(degree < 360) degree += 1;
    }
    
    addEventListener("mousemove",function(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    },false);
    
    setInterval(draw,30);
}