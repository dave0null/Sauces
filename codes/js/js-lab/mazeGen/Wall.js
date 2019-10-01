var backgroundColor  = 'rgba(000,000,000,1)', // the background color
    visitedColor     = 'rgba(050,050,050,0.3)', // color of nodes visited
    currentNodeColor = 'rgba(255,000,000,1)', // the current selected node
    wallsColor       = 'rgba(250,000,250,1)'  // the walls around the node

function Wall(_x,_y,_tileWidth,_tileHeight)
{
  this.x = _x;
  this.y = _y;
  this.w = _tileWidth;
  this.h = _tileHeight;
  this.size = this.w/2 + this.w/2
  
  this.rightWall = 1;
  this.upWall    = 1;
  this.leftWall  = 1;
  this.downWall  = 1;

  this.current = 0;
  this.visited = 0;
  
  // sprites yo
  var ground = new Image(),
      wall   = new Image();

  ground.src = 'ground.png'
  wall.src   = 'wall.png'

  // this is for the walls starting and ending points
  var offset = 0
  
  this.draw = function(ctx){

    //ctx.globalCompositeOperation="source-out";
    // background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(this.x * this.w,this.y * this.h,this.w,this.h) 
    
    // visited
    if(this.visited == 1){
      ctx.fillStyle = visitedColor;
    } 
    
    // current node
    if(this.current == 1){
      ctx.globalCompositeOperation="lighter";
      ctx.fillStyle = currentNodeColor;  
    }
    
    ctx.fillRect(this.x * this.w,this.y * this.h,this.w,this.h) 
    ctx.globalCompositeOperation="source-over";
    
    // draw walls
    var xPos = this.x * this.w ,
        yPos = this.y * this.h

    // walls
    ctx.strokeStyle = wallsColor
    ctx.lineWidth = 2
    ctx.beginPath()

    // right
    if(this.rightWall == 1 && this.visited == 1){
      ctx.moveTo(xPos + this.w, yPos + offset)
      ctx.lineTo(xPos + this.w, yPos + this.h - offset)
      ctx.stroke()    
    }
    // up
    if(this.upWall == 1 && this.visited == 1){
      ctx.moveTo(xPos + offset, yPos)
      ctx.lineTo(xPos + this.w - offset, yPos )
      ctx.stroke()    
    }
    // left
    if(this.leftWall == 1 && this.visited == 1){
      ctx.moveTo(xPos , yPos + offset)
      ctx.lineTo(xPos , yPos + this.h - offset)
      ctx.stroke()    
    }
    // down
    if(this.downWall == 1 && this.visited == 1){
      ctx.moveTo(xPos + offset, yPos + this.h)
      ctx.lineTo(xPos + this.w - offset, yPos + this.h)
      ctx.stroke()    
    }
  }

  this.getNeighbours = function(map)
  {
    this.neighbours = [];
    var east  = map[this.x+1][this.y],
        north = map[this.x]  [this.y-1],
        west  = map[this.x-1][this.y],
        south = map[this.x]  [this.y+1]

    if(east.x < map.length-1 && east.visited == 0){
      this.neighbours.push(east)
    }
    
    if(north.y > 0  && north.visited == 0){
      this.neighbours.push(north)
    }

    if(west.x > 0 && west.visited == 0){
      this.neighbours.push(west)
    }
  
    if(south.y < map[0].length-1 && south.visited == 0){
      this.neighbours.push(south)
    }
    return this.neighbours;
  }
}

function swapCurrentWall(current,next)
{
    current.current = 0
    current.visited = 1

    if(next.visited == 0){
        removeWall(current,next)
    }

    next.current = 1
    next.visited = 1
}

function removeWall(current,next)
{
  var x = next.x - current.x,
      y = next.y - current.y
      
  // right
  if(x == 1 && y == 0){
    current.rightWall = 0
    next.leftWall = 0
  }

  // up
  if(x == 0 && y == -1){
    current.upWall = 0
    next.downWall = 0
  }

  // left
  if(x == -1 && y == 0){
    current.leftWall = 0
    next.rightWall = 0
  }

  // down
  if(x == 0 && y == 1){
    current.downWall = 0
    next.upWall = 0
  }
}