window.onload = function(){

  // settings
  var canvas;
  var ctx;

  var tileWidth;
  var tileHeight;

  var worldWidth;
  var worldHeight;

  var worldMap = [[]];

  // sprites links
  var spritesArray = ['sprite/grass.png','sprite/wall.png'];

  var sprites = [];
  var spritesLoaded = 0

  function loadAllsprites(){
    for(var i=0; i < spritesArray.length;i++){
      //if(sprites[i] == undefined){
        sprites[i] = new Image()
        sprites[i].src = spritesArray[i]

        sprites[i].onload = function(){
          spritesLoaded += 1;
      if (spritesLoaded == spritesArray.length) {
      init();
      }
        }
      //}
    }
  }

  loadAllsprites();
  
  function init(){
    console.log('Initializing...');
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    tileWidth = 32;
    tileHeight = 32;

    worldWidth = Math.floor(window.innerWidth / tileWidth);
    worldHeight = Math.floor(window.innerHeight / tileHeight);
  
    createWorld();
  }
  
  function distTo(start, stop) {
  x = (start.x-stop.x);
  y = (start.y-stop.y); 
  return Math.sqrt(x*x+y*y)
  }
  
    function Astar(start, stop) {
  maze = [];
  nodes = [];
  path = [];
  var cur;
  var curLow, low, x, y;
  //make a clone of the maze
  //ctx.font="15px Arial";
  for(var x=0; x < worldWidth; x++){
      maze[x] = []
      for(var y=0; y < worldHeight; y++){
    cur = {x:x,y:y};
        maze[x][y] = {
    cur:{x:x,y:y},
    wall:worldMap[x][y],
    parent:{x:-1,y:-1},
    weight:distTo(cur,start)+distTo(cur,stop)*3,
    };
    //ctx.strokeText(Math.round(maze[x][y].weight),cur.x * tileWidth+5,cur.y * tileHeight+15);
      }
    }
  //debug
  ctx.strokeStyle = "rgb(255,0,0)";
  ctx.beginPath();
  ctx.arc(start.x * tileWidth+15,start.y * tileHeight+15,10,0,2*Math.PI);
  ctx.stroke();
  
  ctx.strokeStyle = "rgb(255,255,255)";
  ctx.beginPath();
  ctx.arc(stop.x * tileWidth+15,stop.y * tileHeight+15,10,0,2*Math.PI);
  ctx.stroke();
  ctx.strokeStyle = "rgb(0,255,255)";
  
  nodes[0] = maze[start.x][start.y];
  nodes[0].wall = 1;
  while (nodes.length > 0) {
    //find the lowest node
    curLow = nodes[0];
    low = 0;
    for (i = 1; i < nodes.length; i++) {
      if (nodes[i].weight < curLow.weight) {
        curLow = nodes[i];
        low = i;
      }
    }
    //alert(nodes.length);
    nodes.splice(low,1);//remove it from the nodes
    //from the current low add the surrounding ones
    x = curLow.cur.x;
    y = curLow.cur.y;
    if (stop.x == curLow.cur.x && stop.y == curLow.cur.y) {
      break;
    }
    alert(nodes.length);
    ctx.beginPath();
    ctx.arc(x * tileWidth+15,y * tileHeight+15,10,0,2*Math.PI);
    ctx.stroke();
    //up
    if (y+1 < worldHeight) {
      if (maze[x][y+1].wall == 0) {
        maze[x][y+1].wall = 1;
        maze[x][y+1].parent = curLow.cur;
        nodes.push(maze[x][y+1]);
        
        ctx.beginPath();
        ctx.moveTo(maze[x][y+1].cur.x * tileWidth+15,maze[x][y+1].cur.y * tileHeight+15);
        ctx.lineTo(x * tileWidth+15,y * tileHeight+15);
        ctx.stroke();
      }
    }
    //down
    if (y-1 >= 0) {
      if (maze[x][y-1].wall == 0) {
        maze[x][y-1].wall = 1;
        maze[x][y-1].parent = curLow.cur;
        nodes.push(maze[x][y-1]);
        
        ctx.beginPath();
        ctx.moveTo(maze[x][y-1].cur.x * tileWidth+15,maze[x][y-1].cur.y * tileHeight+15);
        ctx.lineTo(x * tileWidth+15,y * tileHeight+15);
        ctx.stroke();
      }
    }
    //left
    if (x-1 >= 0) {
      if (maze[x-1][y].wall == 0) {
        maze[x-1][y].wall = 1;
        maze[x-1][y].parent = curLow.cur;
        nodes.push(maze[x-1][y]);
        
        ctx.beginPath();
        ctx.moveTo(maze[x-1][y].cur.x * tileWidth+15,maze[x-1][y].cur.y * tileHeight+15);
        ctx.lineTo(x * tileWidth+15,y * tileHeight+15);
        ctx.stroke();
      }
    }
    //right
    if (x+1 < worldWidth) {
      if (maze[x+1][y].wall == 0) {
        maze[x+1][y].wall = 1;
        maze[x+1][y].parent = curLow.cur;
        nodes.push(maze[x+1][y]);
        
        ctx.beginPath();
        ctx.moveTo(maze[x+1][y].cur.x * tileWidth+15,maze[x+1][y].cur.y * tileHeight+15);
        ctx.lineTo(x * tileWidth+15,y * tileHeight+15);
        ctx.stroke();
      }
    }
  }
  curScan = stop;
  alert(maze[curScan.x][curScan.y].parent.x);
  ctx.fillStyle = "rgb(255,0,255)";
  while (maze[curScan.x][curScan.y].parent.x != -1) {
    ctx.beginPath();
    ctx.arc(curScan.x * tileWidth+15,curScan.y * tileHeight+15,8,0,2*Math.PI);
    ctx.fill();
    path.unshift(maze[curScan.x][curScan.y].parent);
    curScan = maze[curScan.x][curScan.y].parent;
  }
  return path;
  }
  
  function addMaze() {
  var nodes = [];
  var curNode;
  var tmp, totBor, x, y;
  nodes[0] = {x:1, y:1};
  var hold = [];
  while (nodes.length > 0) {
    //pick a random node and remove it
    tmp = Math.round((nodes.length-1)*Math.random());
    curNode = nodes[tmp];
    nodes.splice(tmp,1);
    //check that node to see if it is free
    x = curNode.x;
    y = curNode.y;
    totBor = 0;//empty this
    hold = [];//empty this too
    //up
    if (y+1 < worldHeight) {
      if (worldMap[x][y+1] == 1) {
        hold.push({x:x,y:y+1});
        totBor++;
      }
    }
    //down
    if (y-1 >= 0) {
      if (worldMap[x][y-1] == 1) {
        hold.push({x:x,y:y-1});
        totBor++;
      }
    }
    //left
    if (x-1 >= 0) {
      if (worldMap[x-1][y] == 1) {
        hold.push({x:x-1,y:y});
        totBor++;
      }
    }
    //right
    if (x+1 < worldWidth) {
      if (worldMap[x+1][y] == 1) {
        hold.push({x:x+1,y:y});
        totBor++;
      }
    }
    //alert(hold.length);
    if (totBor >= 3) {//it is free
      worldMap[x][y] = 0;
      nodes.push.apply(nodes, hold)
    }
  }
  
  }
  
  function createWorld()
  {
    console.log('Creating world...');

    // lets create wall tiles
    for(var x=0; x < worldWidth; x++){
      worldMap[x] = []
      for(var y=0; y < worldHeight; y++){
        worldMap[x][y] = 1;
      }
    }

    /*// lets throw some stones around ;)
    for(var x=0; x < worldWidth; x++){
      for(var y=0; y < worldHeight; y++){
        if(Math.random() > 0.9){
          worldMap[x][y] = 1;
        }
      }
    }*/
  addMaze();

    /*// draw walls
    for(var x=0; x < worldWidth; x++){
      for(var y=0; y < worldHeight; y++){
        if(x == 0 || y == 0 || x == worldWidth-1 || y == worldHeight-1){
          worldMap[x][y] = 1;
        }
      }
    }*/
    
    drawWorld()
  Astar({x:1,y:1},{x:20,y:20})
  }

  function drawWorld(){
    console.log('Drawing world...');
    
    for(var x=0; x < worldMap.length; x++){
      for(var y=0; y < worldMap[x].length; y++){
        var img;
        // draw our tiles color
        switch(worldMap[x][y]){
          
          case 1:
            img = sprites[1] // stones
          break;
          default:
            img = sprites[0] // grass
          break;
          
        }
        
        ctx.drawImage(
          img, 
          0,0,tileWidth,tileHeight,
          x * tileWidth,y * tileHeight,tileWidth,tileHeight
        )
      }
    }

  }

}