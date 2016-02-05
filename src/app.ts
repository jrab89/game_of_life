import { Grid } from "./grid";

const width = 400;
const height = 300;

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);
document.getElementById("canvas-div").appendChild(canvas);

let currentGrid = new Grid(Grid.random(width, height));
let stopped = true;
let shouldClear = false;
let shouldRandomize = false;

document.getElementById("toggle-start").onclick = function(e) {
    stopped = !stopped;
    let newText = stopped ? "Start" : "Stop";
    e.srcElement.textContent = newText;
};

document.getElementById("clear").onclick = function(e) {
    shouldClear = true;
};

document.getElementById("randomize").onclick = function(e) {
    shouldRandomize = true;
};

canvas.onclick = function(e) {
    let [x, y] = [e.offsetX, e.offsetY];
    currentGrid.grid[x][y] = !currentGrid.grid[x][y];
};

function draw() {
    window.requestAnimationFrame(draw);
    const imageData = new ImageData(currentGrid.toImageDataArray(), width, height);
    context.putImageData(imageData, 0, 0);
}

function updateState() {
    if (shouldClear) {
        shouldClear = false;
        currentGrid = new Grid(Grid.cleared(width, height));
    }

    if (shouldRandomize) {
        shouldRandomize = false;
        currentGrid = new Grid(Grid.random(width, height));
    }

    if (!stopped) {
        currentGrid = currentGrid.next();
    }
}

window.setInterval(updateState, 100);
draw();
