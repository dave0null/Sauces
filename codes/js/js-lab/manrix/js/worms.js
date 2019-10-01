window.onload = function()
{
    var canvas  = document.getElementById("c");
    var ctx     = canvas.getContext("2d");
    
    var W = window.innerWidth,
        H = window.innerHeight;

    canvas.width  = W;
    canvas.height = H;
    
    var mouse = {};
    
    function toRadian(_degree) {
        return (_degree * Math.PI) / 180;
    }
    
    function toDegree(_radian) {
        return (_radian * 180) / Math.PI;
    }
    
    function PVector(_x,_y)
    {
        this.x = _x;
        this.y = _y;
        
        this.add = function(vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
        
        this.sub = function(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        }
        
        this.mul = function(number) {
            this.x *= number;
            this.y *= number;
        }
        
        this.div = function(number) {
            this.x /= number;
            this.y /= number;
        }
        
        this.mag = function() {
            var x2 = this.x * this.x;
            var y2 = this.y * this.y;
            
            return Math.sqrt(x2 + y2);
        }
        
        this.normalize = function() {
            var m = this.mag();
            if(m != 0) this.div(m);
        }
    }
    
    function Ball(src)
    {
        this.location = new PVector(src.x, src.y);
        this.velocity = new PVector(1, 1);
        
        this.update = function(dist) {
            this.m = new PVector(dist.x, dist.y);
            this.m.sub(this.location);
            this.m.normalize();
            this.m.mul(2);
            
            this.velocity.add(this.m)
            this.location.add(this.velocity);
            this.velocity.mul(0.59)
            
            ctx.globalCompositeOperation = "lighter"
            ctx.strokeStyle = "rgba(255,255,255,0.5)";
            //ctx.strokeRect(this.location.x,this.location.y,10,10);
            
            this.newDist = {x: this.location.x + this.m.x, y:this.location.y + this.m.y} 
            ctx.beginPath();
            ctx.moveTo(this.location.x,this.location.y);
            ctx.lineTo(this.newDist.x,this.newDist.y);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }
    
    var boxes = [];
    for(y=0; y < (H/20); y++) {
            for(x=0; x < (W/20); x++) {
                boxes.push(new Ball({x:Math.random()*W,y:Math.random()*H}))
            }
        }
    
    function draw()
    {
        // Background
        ctx.globalCompositeOperation = "source-over"
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0,0,W,H);

        
        for(var i=0; i < boxes.length; i++) {
            
            
            if(i === 0)
                boxes[i].update({x:Math.random()*W,y:Math.random()*H});
            else if(i > 0)
                boxes[i].update({x:boxes[i-1].location.x,y:boxes[i-1].location.y});
        }
        
        update();
    }
    
    function update()
    {
    }
    
    addEventListener("mousemove",function(e){
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    },false);
    
    setInterval(draw,30);
}