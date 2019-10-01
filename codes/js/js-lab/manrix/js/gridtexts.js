window.onload = function()
{
  // make our canvas element and set its attributes
  var canvas = document.getElementById("c");
  
  // get our 2d context from our canvas and set its width and height
  var ctx = canvas.getContext('2d');
  
  var W = window.innerWidth, 
      H = window.innerHeight;
  canvas.setAttribute("width",W);
	canvas.setAttribute("height",H);    
  
  /* MODES */
  var attract = 0;
  
  var mouse = {x: 0,y:H/2}

  var boxes = [];
  var cellSize = 5;
  var angle = 0;
  var angleInc = 0;
  
  var word = ("Made by m00dy").toLowerCase();
  displayWord();
  
  function trackMouse(e) {
    mouse.x = e.pageX; mouse.y = e.pageY;
  }

  function trackKeyboard(e) {
    var c = e.keyCode;
    console.log(c);
    
    if(c === 87) {
      attract = 1;
    }
    
    if(c === 32) {
      word = prompt("Enter a text to display");
      displayWord();
    }
  }
  
  // our tiny boxes :)
  function Box(_x,_y)
  {
    this.x = _x;
    this.y = _y;

    this.xSpeed = 0;
    this.ySpeed = 0;
    
    this.id;
    
    this.exploded = 0;
    
    this.checkEdges = function() {
      if(this.x < 0 || this.x > W - cellSize) { this.xSpeed *= -1; }
      if(this.y < 0 || this.y > H - cellSize) { this.ySpeed *= -1; }
    }
    
    this.modeAttract = 0;
    this.funcAttract = function() {
      
      if(this.modeAttract === 0) {
        
        // increment by something to make them move
        var degreeInc = this.id*(360/boxes.length)
        this.targ = new PVector(
          W/2 + Math.cos( toRadian(degreeInc+angleInc) ) * W/2,
          H/2 + Math.sin( toRadian(degreeInc+angleInc) ) * H/2);
          
        this.tar = {x: this.targ.x, y: this.targ.y};
        this.location = {x:this.x, y:this.y};
        
        this.targ.sub(this.location);
        this.targ.normalize();
        this.targ.mul(10);
        
        this.mag = magnitude(this.tar,this.location);
        
        if(this.mag < 10) {
            this.x = this.tar.x;
            this.y = this.tar.y;
            
            this.targ.x = 0;
            this.targ.y = 0;
        } 

        this.xSpeed += this.targ.x;
        this.ySpeed += this.targ.y;
        
        this.xSpeed *= 0.50;
        this.ySpeed *= 0.50;
        
        angle += 0.25;
        angleInc += 0.005;
      }
    }
    
    this.draw = function() {

      if(attract===1) this.funcAttract();
      
      ctx.fillStyle = "red";
      ctx.fillRect(this.x,this.y,cellSize,cellSize);

      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }

  function drawLetter(_letter,_x,_y)
  {
    var posX = _x;
    var posY = _y;
    var letter = _letter.toLowerCase();

    var dict = getDict(); // get our huge dictenroy array from funcs.js

    if(dict[letter] === undefined) letter = '-1';

    for(var y=0; y < dict[letter].length; y++) 
    {
      for(var x=0; x < dict[letter][y].length; x++) 
      {
        if(dict[letter][y][x] === 1) 
        {
          boxes.push( new Box(posX + x * cellSize,posY + y * cellSize))                  
        }
      }
    }
  }
 
  function displayWord() {
    for(var i=0; i < word.length; i++) {
        drawLetter(word[i],mouse.x + i * (6*cellSize),mouse.y + 10);      
      }
  }
  
  /* GENERAL DRAWING */
  function draw()
  {
    console.log( boxes[0].mag );
    
    // background
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,W,H);

    for(var b=0; b < boxes.length; b++) {
      if(boxes[b].id === undefined) {
        boxes[b].id = b;
      }
      boxes[b].draw();
    } 
    
    ctx.fillStyle = "white";
    ctx.font = "30px monospace";
    ctx.fillText("Press space to write text on screen, and W to make it move.",10,H-30);
  }
  
  addEventListener("keyup",trackKeyboard,false);
  addEventListener("mousemove",trackMouse,false);
  setInterval(draw,30);
}
