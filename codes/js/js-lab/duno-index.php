<html>
<head>
  <title>Dungeon Keeper by m00dy</title>
  <style>
    canvas{
      display:block;
    }
    *{
      margin:0px;
      padding:0px;
    }
    body{
      background: white;
      color: red;
    }
  </style>
  <script>
    window.onload=function(){
      var canvas = document.getElementById('c');
      var ctx = canvas.getContext('2d');
      
      var W = window.innerWidth, H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;

      var balls = []

      function Ball(_x,_y){
        this.x = _x;
        this.y = _y;
        this.xSpeed = -Math.random()*5 + Math.random()*5
        this.ySpeed = -Math.random()*5 + Math.random()*5
        this.life = 0
        this.lifespan = Math.random()*100+50
        this.radius = Math.random()* 5 + 20
        this.alpha = 1;
        this.done = 0

        this.r = Math.round(Math.random()*255)
        this.g = Math.round(Math.random()*255)
        this.b = Math.round(Math.random()*255)
// press key so it prompt for magic word so you can access it
        this.draw = function(){
          if((this.x < 0 || this.x > W) || (this.y < 0 || this.y > H) || this.lifespan <=0){
            this.done = 1
          }

          ctx.fillStyle='rgba('+this.r+','+this.g+','+this.b+','+this.alpha+')'
          ctx.beginPath();
          ctx.arc(this.x,this.y,this.radius,Math.PI*2,false);
          ctx.fill()
          
          this.radius *= 0.99;
          this.alpha *= 0.99;
          this.lifespan -= 1
          this.x += this.xSpeed
          this.y += this.ySpeed
        }
      }
      
      
      // timer to spawn balls
      function draw(){
        balls.push( new Ball(W/2,H/2));
  
        
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0,0,W,H);
    
        for(i=0; i < balls.length; i++){
          if(balls[i].done == 1){
            balls.splice(i,1)
          }
          balls[i].draw();
        }
      
      }

      setInterval(draw,30);
    }
  </script>
</head>
<body>
  <canvas id='c'></canvas>
</body>
</html>