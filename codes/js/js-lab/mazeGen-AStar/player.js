function Player(_ctx,_img, _x,_y){

  this.x = _x;
  this.y = _y;
  this.ctx = _ctx;
  this.img = _img

  this.width = 32
  this.height = 32;

  ctx = this.ctx

  this.degree = 0;

  this.update = function(){
    this.degree += 0.01
  }

  this.draw = function(){
    console.log('drawing player');
    
    var xTemp, yTemp;

    xTemp = this.x * this.width + (32/2)
    yTemp = this.y * this.height + (32/2)

    
    ctx.save()
    ctx.translate(xTemp ,yTemp)
    
    ctx.rotate(this.degree)
    ctx.drawImage(this.img,0,0,32,32,0-32,0,32,32)
    
    ctx.restore()

    this.update()
  }

}