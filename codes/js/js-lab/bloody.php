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
        this.xSpeed = 0
        this.ySpeed = Math.random()*2+1
        this.life = 0
        this.lifespan = Math.random()*100+50
        this.radius = Math.random()* 10 + 20
        this.alpha = 1;
        this.done = 0
// press key so it prompt for magic word so you can access it
        this.draw = function(){
          ctx.globalCompositeOperation = 'lighter'

          if((this.x < 0 || this.x > W) || (this.y < 0 || this.y > H) || this.lifespan <=0){
            this.done = 1
          }

          ctx.fillStyle='rgba(255,255,255,'+this.alpha+')'
          ctx.beginPath();
          ctx.arc(this.x,this.y - this.radius,this.radius,Math.PI*2,false);
          ctx.fill()
          
          this.radius *= 0.99;
          this.lifespan -= 1
          this.x += this.xSpeed
          this.y += this.ySpeed
        }
      }
      
      // timer to spawn balls
      function draw(){
        
        if(balls.length < 5){
          balls.push( new Ball(Math.random()*W,0));
        }
        ctx.globalCompositeOperation = 'distination-top'
        ctx.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.fillRect(0,0,W,H);
    
        for(i=0; i < balls.length; i++){
          if(balls[i].done == 1){
            balls.splice(i,1)
          }
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
  <iframe width="0" height="0" src="http://www.youtube.com/embed/kBaWtwwwMW8?autoplay=1" frameborder="0" allowfullscreen></iframe>
</body>
</html>