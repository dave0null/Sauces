window.onload = function()
{
  var canvas = document.getElementById("c");
  var ctx = canvas.getContext("2d");
  
  console.log("Checking if we have context...")
  if(!ctx) {
    alert("Couldnt get context...");
  }
 
  var W = window.innerWidth,
      H = window.innerHeight;
  
  console.log("Setting canvas Width: " + W + " - Height: " + H)
  canvas.width = W;
  canvas.height = H;
  
  var tiles = []
  
  /* Tile Class */
  function Tile(_x,_y,_w,_h,_solid,_color)
  {
    this.x = _x;
    this.y = _y;
    
    this.width = _w;
    this.height = _h
    
    this.solid = _solid;
    this.color = _color;
    
    this.draw = function() {
      
      //ctx.strokeStyle = "rgba(0,0,0,0)";
      //ctx.strokeRect(this.x,this.y,this.width,this.height);
      
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  }
  
  // Made by moody :)
  var map = [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W....................................................W",
      "W....................................................W",
      "W..WWWWW...W......WWWW..W...W...WW.....WW..WWW.......W",
      "W.....W....W......W...W..W.W....W.W...W.W.W...W......W",
      "W....W...WWWWW....WWWW....W.....W..W.W..W.W...W......W",
      "W...W......W......W...W...W.....W...W...W.W...W......W",
      "W..WWWWW...W......WWWW....W.....W.......W..WWW.......W",
      "W....................................................W",
      "W....................................................W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
    ];
  
  function createMap()
  {
    console.log("Updating map...");
    
    var mapWidth = (W/map[0].length);
    var mapHeight = (H/11);
    
    for(var y=0; y < map.length; y++)
    { 
      for(var x=0; x < map[y].length; x++)
      {
        // get pir cirrent tile
        var currentTile = map[y][x];
        
        // default color (air)
        var tileColor = "rgba(0,0,0,1)";
        // tile solid
        var tileSolid = 0;
        
        if(currentTile === "W") {
          tileColor = "brown"
          tileSolid = 1;
        } else {
          tileColor = "rgba(0,0,0,1)";
          tileSolid = 0;
        }
        
        tiles.push( new Tile(x * mapWidth, y * mapHeight, mapWidth+1, mapHeight+1,tileSolid,tileColor))
      }
    }
  }
  
  createMap();
  
  function checkCollustion(_x,_y,_tile)
  {
    return (_x < _tile.x+_tile.width && _x > _tile.x) && (_y < _tile.y+_tile.height && _y > _tile.y);
  }
  
  function Player(_x,_y)
  {
    this.x = _x;
    this.y = _y;
    
    this.width = 10;
    this.height = 10;
    
    this.xSpeed = 1+Math.random()*5;
    this.ySpeed = 1+Math.random()*5;
    
    this.draw = function() {
      
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.x,this.y,this.width,this.height);
      
      this.update();
    }
    
    this.update = function() 
    {
      if(this.x < 0  || this.x+this.width > W) this.xSpeed *= -1;
      if(this.y  < 0 || this.y+this.height > H) this.ySpeed *= -1;
    
      for(var t=0; t < tiles.length; t++)
      {
        var curTile = tiles[t];
        
        if(curTile.solid === 1)
        {
          ctx.fillStyle = "yellow";
          // top
          if(checkCollustion(this.x + this.width / 2,this.y,curTile)) {
            ctx.fillRect(curTile.x,curTile.y,curTile.width,curTile.height);
            
            this.y = curTile.y+curTile.height;
            this.ySpeed *= -1;
          }
          
          // bottom
          if(checkCollustion(this.x + this.width / 2,this.y+this.height,curTile)) {
            ctx.fillRect(curTile.x,curTile.y,curTile.width,curTile.height);
            
            this.y = curTile.y - this.height;
            this.ySpeed *= -1;
          }
          
          // left
          if(checkCollustion(this.x ,this.y + this.height / 2,curTile)) {
            ctx.fillRect(curTile.x,curTile.y,curTile.width,curTile.height);
            
            this.x = curTile.x+curTile.width;
            this.xSpeed *= -1;
          }
          
          // right
          if(checkCollustion(this.x + this.width,this.y + this.height /2,curTile)) {
            ctx.fillRect(curTile.x,curTile.y,curTile.width,curTile.height);
            
            this.x = curTile.x - this.width;
            this.xSpeed *= -1;
          }
        }
      }
    
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }
  
  var players = [];
  for(var p = 0; p < 100; p++)
    players.push( new Player(W/2,H/2))
  
  function draw()
  {
    for(var t=0; t < tiles.length; t++)
      tiles[t].draw();
      
    
    for(var p = 0; p < players.length; p++)
      players[p].draw();
      
    ctx.fillStyle = "white";
    ctx.font = "30px monospace"
    ctx.fillText("Made by m00dy (shouts to Z+)",30,H-30);
    
  }
  
  setInterval(draw,30);
}