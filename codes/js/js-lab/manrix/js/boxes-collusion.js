window.onload = function()
{
  var canvas = document.getElementById("c");
  var ctx = canvas.getContext("2d");
  var audio = document.getElementById("boom");
  var W = window.innerWidth,
      H = window.innerHeight;
      
  canvas.width = W;
  canvas.height = H;
  
  /*--------------------------------------------
    // check vertical collusion
    b1.top < b2.bottom && b1.bottom > b2.top
    
    // horizantal
    b1.right > b2.left && b1.left < b2.right
  --------------------------------------------*/
  
  var boxes = [];
  for(var i =0; i < 200; i++)
    boxes.push( new Box(21+ Math.random()*W-21,21+ Math.random()*H-21,20,20,"red"));
 
  /* BOX CLASS */
  function Box(_x,_y,_w,_h,_color) 
  {
    this.x = _x;
    this.y = _y;
    
    this.width = _w;
    this.height = _h;
    
    this.alive = 1;
    
    this.xSpeed = -Math.random()*5 + Math.random()*5
    this.ySpeed = -Math.random()*5 + Math.random()*5
    
    this.color = _color;
    
    this.updateBorders = function updateBorders() {
      this.top    = this.y;
      this.bottom = this.y + this.height;
      this.left   = this.x;
      this.right  = this.x + this.width;
    }
    
    this.updateBorders();
    
    this.draw = function draw() {
      if(this.x < 0) {
        this.x = 0;
        this.xSpeed *= -1;
      }
      if(this.x > W - this.width) {
        this.x = W - this.width
        this.xSpeed *= -1;
      }
      if(this.y < 0) {
        this.y = 0
        this.ySpeed *= -1;
      }
      if(this.y > H - this.height) {
        this.y = H - this.height
        this.ySpeed *= -1;
      }

      this.updateBorders();
      
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      if(this.alive === 1) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
      }
      /* Draw the white points*/ /*
      ctx.fillStyle = "white";
      ctx.fillRect(this.x,this.top,1,1);    // top point
      ctx.fillRect(this.x,this.bottom,1,1); // bottom point
      ctx.fillRect(this.right,this.top,1,1);   // left point
      ctx.fillRect(this.right,this.bottom,1,1);  // right point */
    }
  }
  
  var explostions = [];
  function boom(_x,_y) {
    this.x = _x;
    this.y = _y;
    
    this.radius = 0;
    
    this.r = 255
    this.g = 255
    this.b = 0
    this.a = 1
    this.draw = function() {
      this.rgba = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"
    
      ctx.fillStyle = this.rgba
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,Math.PI*2,false);
      ctx.fill();
      
      this.radius += 0.50;
      this.a *= 0.95;
    }
  }
  
  function checkCollustion(b1,b2)
  {
    return (b1.right > b2.left && b1.left < b2.right) && (b1.top < b2.bottom && b1.bottom > b2.top)
  }
  
  // General draw
  function draw()
  {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,W,H);
    
    for(var b1=0; b1 < boxes.length; b1++) {
      var box1 = boxes[b1]
      
      for(var b2=0; b2 < boxes.length; b2++) {
        var box2 = boxes[b2];
        
        if((b1 != b2) && (box1.alive===1 && box2.alive===1)&& checkCollustion(box1,box2)==1 ) {
          explostions.push( new boom(box1.x + box1.width/2,box1.y + box1.height/2));
          explostions.push( new boom(box2.x + box2.width/2,box2.y + box2.height/2));
          boxes[b1].alive = 0;
          boxes[b2].alive = 0;
        }
      }
      box1.draw();
    }
    
    for(var ex=0; ex < explostions.length; ex++) {
      if(explostions[ex].a < 0.1) 
        explostions.splice(ex,1);
      
      explostions[ex].draw();
    }
  }
  
  setInterval(draw,30);
}