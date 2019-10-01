window.onload = function() {

  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');
 
  var canvas_div = document.getElementById('canvas'); 
  var W = canvas_div.offsetWidth,
      H = canvas_div.offsetHeight;

  canvas.width = W;
  canvas.height = H;

  var count = 0;
  var something = document.getElementById('something');
  something.onclick = function greet(object) {
    
    $(document).ready(function(){
      count++;
      
      $.post('meh.php',{post: count}).done(function(data){
        $('#result').html(data);
      });
    });
  }
  
  function Ball(_x,_y)
  {
    // settings
    this.x = _x;
    this.y = _y;
    this.xSpeed = 10;
    this.ySpeed = 10;
    
    this.radius;
    this.color = 'red';
    
    
    this.draw = function(){
    
      this.radius = 10 + (count + 1);
      
      if(this.x - this.radius < 0 || this.x + this.radius > W) this.xSpeed *= -1;
      if(this.y - this.radius < 0 || this.y + this.radius > H) this.ySpeed *= -1;
      
      
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      ctx.fillStyle = this.color;
      ctx.beginPath()
      ctx.arc(this.x,this.y,this.radius,Math.PI*2,0);
      ctx.fill();
    }
  }
  
  var b = new Ball(100,100);
  
  function main() {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,W,H);

    ctx.font = "30px Arial"
    ctx.fillStyle = "#f00";
    ctx.fillText("Size: " + count,10,40);
    
    b.draw()
  }
  
  window.setInterval(main,30);
}
