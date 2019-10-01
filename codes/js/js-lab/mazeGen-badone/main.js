window.onload = function(){

  // settings
  var canvas;
  var ctx;

  var tileWidth;
  var tileHeight;

  var worldWidth;
  var worldHeight;

  var worldMap = [[]];

  var nodes = [];
  var curNode;
  var neighbours = [],
      chosenNeighbour = null

  var tries = 0; // if we got stuck

  init()
  function init(){
    console.log('Initializing...');
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    worldWidth = 30
    worldHeight = 15
  
    tileWidth = Math.floor(window.innerWidth / worldWidth);
    tileHeight = Math.floor(window.innerHeight / worldHeight);

    nodes[0] = {x:1, y:0};
    curNode = nodes[nodes.length-1];

    createWorld();
  }
  
  function getNeighbours(curNode){
    var ns = []  

    var e,n,w,s

    if(curNode.x -1 >= 0){
      w = worldMap[curNode.x - 1][curNode.y]
      if(w == 0){
        ns.push({x:curNode.x - 1, y:curNode.y})
      }
    }

    if(curNode.x +1 <= worldMap.length-1){      
      e = worldMap[curNode.x + 1][curNode.y]
      if(e == 0){
        ns.push({x: curNode.x + 1, y: curNode.y})
      }
    }
    
    if(curNode.y -1 >= 0){
      n = worldMap[curNode.x][curNode.y - 1]
      if(n == 0){
        ns.push({x:curNode.x, y:curNode.y - 1})
      }
    }

    if(curNode.y +1 <= worldMap[0].length-1){      
      s = worldMap[curNode.x][curNode.y + 1]
      if(s == 0){
        ns.push({x: curNode.x, y: curNode.y + 1})
      }
    }

    return ns;
  }

  function genMaze() {

    if(nodes.length < 1){
      console.log('WE ARE DONE')

      curNode = {x:-1,y:-1}
      neighbours = []
      chosenNeighbour = null
      drawWorld()
      return false
    }
    
    //console.log('Generating maze..')
    
    // set as visited
    worldMap[curNode.x][curNode.y] = 1
    
    // n = get neighbours 
    neighbours = getNeighbours(curNode)
    
    // currentN = n[random]
    chosenNeighbour = neighbours[Math.round(Math.random() * neighbours.length-1)]
    
    // get neighbours of the random neighbour we chose
    neighbours = getNeighbours(chosenNeighbour)

    // set the chosen neighbour with neighbours more than 3 or equal
    if(neighbours.length >= 3){

      // set as currentNode
      nodes.push({x:chosenNeighbour.x, y:chosenNeighbour.y})
      curNode = chosenNeighbour
      
      tries = 0
    } else {

      tries++
    }

    if(tries > 5){
      curNode = nodes[nodes.length-1]
      nodes.splice(nodes.length-1,1)
      tries = 0
    }    
    
    drawWorld()
  }
  
  function createWorld()
  {
    console.log('Creating world...');

    // lets create wall tiles
    for(var x=0; x < worldWidth; x++){
      worldMap[x] = []
      for(var y=0; y < worldHeight; y++){
        worldMap[x][y] = 0;
      }
    }

    drawWorld()
  }

  setInterval(genMaze,10)

  addEventListener('keyup',function(e){
    switch(e.keyCode){

      // space bar
      case 32:
        genMaze()
      break

    }
  },false)

  function drawWorld(){
    
    //console.log('Drawing world...');
    
    // draw the blocks
    for(var x=0; x < worldMap.length; x++){
      for(var y=0; y < worldMap[x].length; y++){
        
        // draw our nodes
        switch(worldMap[x][y]){
          
          case 0:
            ctx.fillStyle = 'black'
          break;
          default:
            ctx.fillStyle = 'white'
          break;
          
        }       
        ctx.fillRect(x * tileWidth,y * tileHeight,tileWidth,tileHeight)
      }
    }

    // draw nodes left
    if(1){
      if(nodes.length > 1){
        for(var n=0; n < nodes.length; n++){
          ctx.strokeStyle = 'rgba(0,0,255,1)'
          ctx.beginPath()
          
          ctx.moveTo(nodes[n].x   * tileWidth + tileWidth/2, nodes[n].y * tileHeight + tileHeight/2)
          ctx.moveTo(nodes[n-1].x   * tileWidth + tileWidth/2, nodes[n-1].y * tileHeight + tileHeight/2)

          ctx.stroke()
        }
      }
    }

    // draw neighbours that has not been visited
    if(1){
      for(var n=0; n < neighbours.length; n++){
        ctx.fillStyle = 'rgba(0,100,0,0.5)'
        ctx.fillRect(neighbours[n].x * tileWidth,neighbours[n].y * tileHeight,tileWidth,tileHeight)
      }
    }
   
    if(chosenNeighbour != null){
      ctx.fillStyle = 'rgba(0,255,0,0.5)'
      ctx.fillRect(chosenNeighbour.x * tileWidth,chosenNeighbour.y * tileHeight,tileWidth,tileHeight)
    }

    // current node
    ctx.strokeStyle = 'rgba(255,0,0,1)'
    ctx.strokeRect(curNode.x * tileWidth,curNode.y * tileHeight,tileWidth,tileHeight)
  }
  
  
}
