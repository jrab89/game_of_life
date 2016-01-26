const width = 400;
const height = 300;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

const context = <CanvasRenderingContext2D>canvas.getContext('2d');

function randomGrid() {
    let grid: boolean[][]= [];

    for(let x = 0; x < width; x++) {
        grid[x] = [];
        for(let y = 0; y < height; y++) {
            grid[x][y] = Math.round(Math.random()) === 1;
        }
    }

    return grid;
}

let currentGrid = randomGrid();

function gridToImageData(grid: boolean[][]) {
    let imageData = context.createImageData(width, height);

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            let imageDataIndex = 4 * y * width + 4 * x;
            let color = grid[x][y] ? 255 : 0;

            imageData.data[imageDataIndex]     = color; // red
            imageData.data[imageDataIndex + 1] = color; // green
            imageData.data[imageDataIndex + 2] = color; // blue
            imageData.data[imageDataIndex + 3] = 255;   // alpha
        }
    }

    return imageData;
}

function draw() {
    window.requestAnimationFrame(draw);
    context.putImageData(gridToImageData(currentGrid), 0, 0);
}

function updateState() {
    currentGrid = randomGrid();
}

window.setInterval(updateState, 100);
draw();
