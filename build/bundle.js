!function t(r,n,i){function e(h,a){if(!n[h]){if(!r[h]){var u="function"==typeof require&&require;if(!a&&u)return u(h,!0);if(o)return o(h,!0);var d=new Error("Cannot find module '"+h+"'");throw d.code="MODULE_NOT_FOUND",d}var s=n[h]={exports:{}};r[h][0].call(s.exports,function(t){var n=r[h][1][t];return e(n?n:t)},s,s.exports,t,r,n,i)}return n[h].exports}for(var o="function"==typeof require&&require,h=0;h<i.length;h++)e(i[h]);return e}({1:[function(t,r,n){function i(){window.requestAnimationFrame(i);var t=new ImageData(f.toImageDataArray(),a,u);s.putImageData(t,0,0)}function e(){g&&(g=!1,f=new o.Grid(o.Grid.cleared(a,u))),v&&(v=!1,f=new o.Grid(o.Grid.random(a,u))),c||(f=f.next())}var o=t("./grid"),h=t("./point"),a=800,u=600,d=document.createElement("canvas"),s=d.getContext("2d");d.width=a,d.height=u,document.body.appendChild(d),document.getElementById("canvas-div").appendChild(d);var f=new o.Grid(o.Grid.random(a,u)),c=!0,g=!1,v=!1,p=!1,l=new h.Point(0,0);document.getElementById("toggle-start").onclick=function(t){c=!c;var r=c?"Start":"Stop";t.srcElement.textContent=r},document.getElementById("clear").onclick=function(t){g=!0},document.getElementById("randomize").onclick=function(t){v=!0},d.onmousedown=function(t){p=!0;var r=[t.offsetX,t.offsetY],n=r[0],i=r[1];f.grid[n][i]=!f.grid[n][i],l=new h.Point(n,i)},d.onmousemove=function(t){if(p){var r=new h.Point(t.offsetX,t.offsetY),n=l.lineTo(r);f.togglePoints(n),l=r}},d.onmouseup=function(t){p=!1},window.setInterval(e,100),i()},{"./grid":2,"./point":3}],2:[function(t,r,n){var i=function(){function t(t){this.grid=t,this.width=t.length,this.height=t[0].length}return t.random=function(t,r){for(var n=[],i=0;t>i;i++){n[i]=[];for(var e=0;r>e;e++)n[i][e]=1===Math.round(Math.random())}return n},t.cleared=function(t,r){for(var n=[],i=0;t>i;i++){n[i]=[];for(var e=0;r>e;e++)n[i][e]=!1}return n},t.prototype.toImageDataArray=function(){for(var t=new Uint8ClampedArray(this.width*this.height*4),r=0;r<this.height;r++)for(var n=0;n<this.width;n++){var i=4*r*this.width+4*n,e=this.grid[n][r]?0:255;t[i]=e,t[i+1]=e,t[i+2]=e,t[i+3]=255}return t},t.prototype.aliveNeighborsAt=function(t,r){var n=0;return t+1<this.width&&r+1<this.height&&this.grid[t+1][r+1]&&(n+=1),r+1<this.height&&this.grid[t][r+1]&&(n+=1),t-1>=0&&r+1<this.height&&this.grid[t-1][r+1]&&(n+=1),t-1>=0&&this.grid[t-1][r]&&(n+=1),t-1>=0&&r-1>=0&&this.grid[t-1][r-1]&&(n+=1),r-1>=0&&this.grid[t][r-1]&&(n+=1),t+1<this.width&&r-1>=0&&this.grid[t+1][r-1]&&(n+=1),t+1<this.width&&this.grid[t+1][r]&&(n+=1),n},t.prototype.next=function(){for(var r=[],n=0;n<this.width;n++)r[n]=[];for(var i=0;i<this.height;i++)for(var n=0;n<this.width;n++){var e=this.aliveNeighborsAt(n,i);this.grid[n][i]?r[n][i]=!(2>e||e>3):r[n][i]=3===e}return new t(r)},t.prototype.toggle=function(r){if(0===r.length)return this;for(var n=[],i=0;i<this.width;i++){n[i]=[];for(var e=0;e<this.height;e++)n[i][e]=this.grid[i][e]}return r.forEach(function(t){n[t.x][t.y]=!n[t.x][t.y]}),new t(n)},t.prototype.togglePoints=function(t){var r=this;t.forEach(function(t){var n=t.x,i=t.y;r.grid[n][i]=!r.grid[n][i]})},t}();n.Grid=i},{}],3:[function(t,r,n){function i(t,r,n){return t+n*(r-t)}var e=function(){function t(t,r){this.x=t,this.y=r}return t.prototype.distanceTo=function(t){var r=t.x-this.x,n=t.y-this.y;return Math.max(Math.abs(r),Math.abs(n))},t.prototype.lineTo=function(t){for(var r=[],n=this.distanceTo(t),i=0;n>=i;i++){var e=0===n?0:i/n;r.push(this.lerpTo(t,e).round())}return r},t.prototype.round=function(){return new t(Math.round(this.x),Math.round(this.y))},t.prototype.lerpTo=function(r,n){return new t(i(this.x,r.x,n),i(this.y,r.y,n))},t}();n.Point=e},{}]},{},[1]);