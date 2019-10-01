// convert from degree to radian
function toRadian(degree) {
  return 2*Math.PI * (degree/360);
}

function magnitude(dist,src)
{
  var x2 = dist.x - src.x;
  var y2 = dist.y - src.y;
  return Math.sqrt( (x2*x2) + (y2*y2) );
}

// class for helping in 2d vectors
function PVector(_x,_y)
{
  this.x = _x;
  this.y = _y;

  this.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }
  
  this.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }
  
  this.div = function(number) {
    this.x /= number;
    this.y /= number;
  }

  this.mul = function(number) {
    this.x *= number;
    this.y *= number;
  }
    
  this.mag = function()
  {
    var x2 = this.x * this.x;
    var y2 = this.y * this.y;
    return Math.sqrt( x2 + y2 ); 
  }
  
  this.normalize = function()
  {
    var m = this.mag();
    if(m != 0)
      this.div(m);
  }
}

// convert words to leet
function convertLeet(_word)
{
  var word = _word.toLowerCase();
  var output = '';

  var dict = {
    'l': '1',
    'e': '3',
    'a': '@',
    's': '$',
    'i': '!'
  };
  
  for(var i=0; i < word.length; i++) {
    output += dict[word[i]] || word[i];
  }

  return output;
}

// function to return dictronery array so we draw our letters as grids
function getDict()
{
  var dictTable = {

    // if the letter dont exist in here then just put empty grids
    '-1':[[1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1]], // ------> end of current letter 

    ' ': [[0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0]], // ------> end of current letter 

    'a': [[0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,1],
          [1,0,0,0,1]], // ------> end of current letter

    'b': [[1,1,1,1,0],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [1,0,0,0,1],
          [1,1,1,1,0]], // ------> end of current letter
    
    'c': [[0,1,1,1,1],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [0,1,1,1,1]], // ------> end of current letter
    
    'd': [[1,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,0]], // ------> end of current letter
    
    'e': [[1,1,1,1,1],
          [1,0,0,0,0],
          [1,1,1,1,1],
          [1,0,0,0,0],
          [1,1,1,1,1]], // ------> end of current letter
    
    'f': [[1,1,1,1,1],
          [1,0,0,0,0],
          [1,1,1,1,0],
          [1,0,0,0,0],
          [1,0,0,0,0]], // ------> end of current letter
    
    'g': [[0,1,1,1,1],
          [1,0,0,0,0],
          [1,0,1,1,1],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    'h': [[1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1]], // ------> end of current letter
    
    'i': [[1,1,1,1,1],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [1,1,1,1,1]], // ------> end of current letter
    
    'j': [[1,1,1,1,0],
          [0,0,0,1,0],
          [0,0,0,1,0],
          [1,0,0,1,0],
          [0,1,1,0,0]], // ------> end of current letter
    
    'k': [[1,0,0,0,1],
          [1,0,0,1,0],
          [1,1,1,0,0],
          [1,0,0,1,0],
          [1,0,0,0,1]], // ------> end of current letter
    
    'l': [[1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,1,1,1,1]], // ------> end of current letter
    
    'm': [[1,0,0,0,1],
          [1,1,0,1,1],
          [1,0,1,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1]], // ------> end of current letter
    
    'n': [[1,0,0,0,1],
          [1,1,0,0,1],
          [1,0,1,0,1],
          [1,0,0,1,1],
          [1,0,0,0,1]], // ------> end of current letter
    
    'o': [[0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    'p': [[1,1,1,1,0],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [1,0,0,0,0],
          [1,0,0,0,0]], // ------> end of current letter
    
    'q': [[0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,1,0,1],
          [1,0,0,1,0],
          [0,1,1,0,1]], // ------> end of current letter
    
    'r': [[0,1,1,1,0],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [1,0,1,0,0],
          [1,0,0,1,0]], // ------> end of current letter
    
    's': [[0,1,1,1,1],
          [1,0,0,0,0],
          [1,1,1,1,1],
          [0,0,0,0,1],
          [1,1,1,1,0]], // ------> end of current letter
    
    't': [[1,1,1,1,1],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0]], // ------> end of current letter
    
    'u': [[1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    'v': [[1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,0,1,0],
          [0,0,1,0,0]], // ------> end of current letter
    
    'w': [[1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [1,0,1,0,1],
          [0,1,0,1,0]], // ------> end of current letter
    
    'x': [[1,0,0,0,1],
          [0,1,0,1,0],
          [0,0,1,0,0],
          [0,1,0,1,0],
          [1,0,0,0,1]], // ------> end of current letter
    
    'y': [[1,0,0,0,1],
          [0,1,0,1,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0]], // ------> end of current letter
    
    'z': [[1,1,1,1,1],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,1,0,0,0],
          [1,1,1,1,1]], // ------> end of current letter
    
    '1': [[0,0,1,0,0],
          [0,1,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,1,1,1,0]], // ------> end of current letter
    
    '2': [[0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,1,1,0],
          [0,1,0,0,0],
          [1,1,1,1,1]], // ------> end of current letter
    
    '3': [[0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,1,1,0],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    '4': [[0,0,1,1,0],
          [0,1,0,1,0],
          [1,1,1,1,1],
          [0,0,0,1,0],
          [0,0,0,1,0]], // ------> end of current letter
    
    '5': [[1,1,1,1,0],
          [1,0,0,0,0],
          [1,1,1,1,0],
          [0,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    '6': [[0,1,1,1,0],
          [1,0,0,0,0],
          [1,1,1,1,0],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    '7': [[1,1,1,1,1],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,1,0,0,0],
          [1,0,0,0,0]], // ------> end of current letter
    
    '8': [[0,1,1,1,0],
          [1,0,0,0,1],
          [0,1,1,1,0],
          [1,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    '9': [[0,1,1,1,0],
          [1,0,0,0,1],
          [0,1,1,1,1],
          [0,0,0,0,1],
          [0,1,1,1,0]], // ------> end of current letter
    
    '0': [[0,1,1,1,0],
          [1,0,0,0,1],
          [1,1,1,1,1],
          [1,0,0,0,1],
          [0,1,1,1,0]],// ------> end of current letter // XXXXXXXXXx

      /* ICONS */
    '=': [[0,0,0,0,0],
          [1,1,1,1,1],
          [0,0,0,0,0],
          [1,1,1,1,1],
          [0,0,0,0,0]],// ------> end of current letter // XXXXXXXXXx

    ':': [[0,0,0,0,0],
          [0,0,1,0,0],
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,0,0,0,0]],// ------> end of current letter // XXXXXXXXXx

    '.': [[0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,1,0,0]],// ------> end of current letter // XXXXXXXXXx

    ',': [[0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,1,0,0],
          [0,1,0,0,0]],// ------> end of current letter // XXXXXXXXXx


    '_': [[0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [1,1,1,1,1]],// ------> end of current letter // XXXXXXXXXx

    '-': [[0,0,0,0,0],
          [0,0,0,0,0],
          [1,1,1,1,1],
          [0,0,0,0,0],
          [0,0,0,0,0]],// ------> end of current letter // XXXXXXXXXx

    '!': [[0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,0,0,0],
          [0,0,1,0,0]],// ------> end of current letter // XXXXXXXXXx

    '?': [[0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,0,1,0],
          [0,0,0,0,0],
          [0,0,1,0,0]],  

    ']': [[0,1,1,1,0],
          [0,0,0,1,0],
          [0,0,0,1,0],
          [0,0,0,1,0],
          [0,1,1,1,0]],

    '[': [[0,1,1,1,0],
          [0,1,0,0,0],
          [0,1,0,0,0],
          [0,1,0,0,0],
          [0,1,1,1,0]]// ------> end of current letter // XXXXXXXXXx

      //-+!@#$%^&*()_/\<>
      //lets try arabic?
    };
  return dictTable;
}

