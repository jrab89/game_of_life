import { Grid } from "./grid";

const width = 800;
const height = 600;

const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

const context = <CanvasRenderingContext2D>canvas.getContext("2d");

let currentGrid = new Grid(Grid.random(width, height));

function draw() {
    window.requestAnimationFrame(draw);
    context.putImageData(currentGrid.toImageData(context), 0, 0);
}

function updateState() {
    currentGrid = currentGrid.next();
}

window.setInterval(updateState, 100);
draw();
