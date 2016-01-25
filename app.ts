var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
var context = <CanvasRenderingContext2D> canvas.getContext('2d');

context.fillRect(25,25,100,100);
context.clearRect(45,45,60,60);
context.strokeRect(50,50,50,50);
