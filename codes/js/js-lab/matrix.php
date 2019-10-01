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
      var maxBalls = W;
      
      function Ball(_x,_y){
        this.x = _x;
        this.y = _y;
        this.char = Math.round(Math.random()*9)
        this.xSpeed = 0
        this.ySpeed = Math.random()*2+1
        this.charTimer = 0
        this.radius = Math.random()* 10 + 20
        this.alpha = 1;
        this.done = 0
// press key so it prompt for magic word so you can access it
        this.draw = function(){
          //ctx.globalCompositeOperation = 'lighter'

          if(this.y > H){
            this.y = 0
          }
          
          ctx.font = "20px Arial"
          ctx.fillStyle='rgba(0,255,0,0.2)'
          ctx.fillText(this.char,this.x,this.y);
         
 
          this.y += this.ySpeed

          if(this.charTimer > 10){
            this.char = Math.round(Math.random()*9)
            this.charTimer = 0
          }

          this.charTimer += 1
        }
      }
      
      var degree = Math.round((W / maxBalls)+10) 
      for(i = 0; i < W; i++)
      {
        balls.push( 
            new Ball( degree * i ,-Math.random()*H)
          );
      }
      
      // timer to spawn balls
      function draw(){
        // paint the backgrond
        ctx.fillStyle = 'rgba(0,0,0,.1)'
        ctx.fillRect(0,0,W,H);
    
        for(i=0; i < balls.length; i++){
          balls[i].draw();
        }
        ctx.font = "30px monospace bold"
        ctx.fillStyle = "white"
        ctx.fillText("Hacked by m00dy, Shouts to Z+",10,H-30)
      }

      setInterval(draw,30);
    }
  </script>
</head>
<body>
  <canvas id='c'></canvas>
  <iframe width="0" height="0" src="htttp://www.youtube.com/embed/kBaWtwwwMW8?autoplay=1" frameborder="0" allowfullscreen></iframe>
</body>
</html>