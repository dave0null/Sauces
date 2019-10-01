window.onload = function() {

  // make our canvas element and set its attributes
  var canvas = document.getElementById("c");
  
  // get our 2d context from our canvas and set its width and height
  var ctx = canvas.getContext('2d');
  var W = window.innerWidth, 
      H = window.innerHeight;
  canvas.setAttribute("width",W);
  canvas.setAttribute("height",H);

  var degree = 0;
  var xOffset = 20;
  var yOffset = 0;
  
  var circle = new Circle(ctx,W/2,H/2);
  var graph = new Graph(ctx,xOffset,H/2);
  
  function Graph(ctx,_x,_y) 
  {
    this.x = _x;
    this.y = _y;

    this.width  = W/2 - circle.radius-xOffset;
    this.height = 100;

    this.dots = [];
    this.maxDots = W/2;
    this.degree = 0;

    // dot class
    this.Dot = function(_dx,_dy) 
    {
      this.x = _dx;
      this.y = _dy;
      
      this.draw = function(_degree) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x,this.y + Math.sin(-toRadian(_degree))*100,1,Math.PI*2,false);
        ctx.fill();
      }
    }  
    
    // put the dots in a straight line from the left paragraph
    // to its end to the right so we can move them
    for(var i=0; i < this.maxDots; i++)
    {
      var distance = ((this.width) / this.maxDots);
      this.dots.push( new this.Dot(this.x + (i * distance), this.y));
    }
    
    this.draw = function(_degree) 
    {
      // draw our border box
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        this.x     ,this.y - this.height,
        this.width ,this.height *2);

      // draw the line in the middle
      ctx.beginPath();
      ctx.moveTo(this.x           ,this.y);
      ctx.lineTo(this.x+this.width,this.y);
      ctx.stroke();

      // create dots on the graph to show the sine
      for(var j=0; j < this.dots.length; j++) {
        this.dots[j].draw(this.degree + (j));
      }
      this.degree = _degree;
    }
  }
  
  function Circle(ctx,_x,_y)
  {
    this.color = "red";

    this.x = _x;
    this.y = _y;

    this.radius = 100;
    this.degree = 0;

    this.draw = function(_degree) 
    {
      this.lineX = this.x + Math.cos(toRadian(-this.degree)) * this.radius;
      this.lineY = this.y + Math.sin(toRadian(-this.degree)) * this.radius;

      // Draw the outer circle
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,Math.PI*2,false);
      ctx.stroke();

      // draw lines from center to our border
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(this.lineX,this.lineY);
      ctx.stroke();

      this.degree = _degree;
    }
  }

  function draw()
  {
    // draw the background
	  ctx.fillStyle = "black";
	  ctx.fillRect(0,0,W,H);
	  
	  // our main drawings
	  // draw the graph
    graph.draw(degree);
    // draw the circle
	  circle.draw(degree);
    
    // Lines between the circle and graph
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
      xOffset, H/2 + Math.sin(-toRadian(degree))*100
    )
    ctx.lineTo(circle.lineX,circle.lineY);
    ctx.stroke()
    
    // The tiny circle on the right circle
    ctx.strokeStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.arc(circle.lineX,circle.lineY,5,Math.PI*2,false);
    ctx.stroke()
    
    // The tiny circle on the graph
    ctx.strokeStyle = "rgba(255,0,0,1)";
    ctx.beginPath();
    ctx.arc(xOffset, H/2 + Math.sin(-toRadian(degree))*100,5,Math.PI*2,false);
    ctx.stroke()
    
    degree += 1;
  }
  
  addEventListener("keydown",function(e){
    
    // up arrow
    if(e.keyCode === 38) {
      degree += 5
    } else if(e.keyCode === 40) {
      degree -= 5
    }
  },false);
  
  setInterval(draw,30); 
}
