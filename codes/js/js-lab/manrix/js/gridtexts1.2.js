window.onload=function(){var c=document.getElementById("c");var o=c.getContext("2d");var d=window.innerWidth,n=window.innerHeight;c.setAttribute("width",d);c.setAttribute("height",n);var k={x:d/2,y:n/2};var h=[];var b=5;var e=0;function g(i){k.x=i.pageX;k.y=i.pageY;}function j(p,i){this.x=p;this.y=i;this.xSpeed=2;this.ySpeed=2;this.draw=function(){if(this.x<0||this.x>d-b){this.xSpeed*=-1;}if(this.y<0||this.y>n-b){this.ySpeed*=-1;}o.fillStyle="red";o.fillRect(this.x,this.y,b,b);this.x+=this.xSpeed;this.y+=this.ySpeed;};}function m(s,v,t){var p=v;var i=t;var q=s.toLowerCase();var r=getDict();if(r[q]===undefined){q="-1";}for(var u=0;u<r[q].length;u++){for(var w=0;w<r[q][u].length;w++){if(r[q][u][w]===1){h.push(new j(p+w*b,i+u*b));}}}}var a=("Made by m00dy").toLowerCase();for(var f=0;f<a.length;f++){m(a[f],f*(6*b),10);}function l(){o.fillStyle="black";o.fillRect(0,0,d,n);for(var i=0;i<h.length;i++){h[i].draw();}}addEventListener("mousemove",g,false);setInterval(l,30);};