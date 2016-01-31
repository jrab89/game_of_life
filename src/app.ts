const width = 400;
const height = 300;

const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

const context = <CanvasRenderingContext2D>canvas.getContext("2d");

let currentGrid = randomGrid();

function gridToImageData(grid: boolean[][]) {
    let imageData = context.createImageData(width, height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let imageDataIndex = 4 * y * width + 4 * x;
            let color = grid[x][y] ? 0 : 255; // true is black, false is white

            imageData.data[imageDataIndex]     = color; // red
            imageData.data[imageDataIndex + 1] = color; // green
            imageData.data[imageDataIndex + 2] = color; // blue
            imageData.data[imageDataIndex + 3] = 255;   // alpha
        }
    }

    return imageData;
}

function randomGrid() {
    let grid: boolean[][] = [];

    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            grid[x][y] = Math.round(Math.random()) === 1;
        }
    }

    return grid;
}

function draw() {
    window.requestAnimationFrame(draw);
    context.putImageData(gridToImageData(currentGrid), 0, 0);
}

function aliveNeighbors(grid: boolean[][], x: number, y: number) {
    let total = 0;

    // bottom right
    if (x + 1 < width && y + 1 < height && grid[x + 1][y + 1]) {
        total += 1;
    }

    // bottom middle
    if (y + 1 < height && grid[x][y + 1]) {
        total += 1;
    }

    // bottom left
    if (x - 1 >= 0 && y + 1 < height && grid[x - 1][y + 1]) {
        total += 1;
    }

    // left
    if (x - 1 >= 0 && grid[x - 1][y]) {
        total += 1;
    }

    // top left
    if (x - 1 >= 0 && y - 1 >= 0 && grid[x - 1][y - 1]) {
        total += 1;
    }

    // top middle
    if (y - 1 >= 0 && grid[x][y - 1]) {
        total += 1;
    }

    // top right
    if (x + 1 < width && y - 1 >= 0 && grid[x + 1][y - 1]) {
        total += 1;
    }

    // right
    if (x + 1 < width && grid[x + 1][y]) {
        total += 1;
    }

    return total;
}

function nextGrid(grid: boolean[][]) {
    let newGrid: boolean[][] = [];

    for (let x = 0; x < width; x++) {
        newGrid[x] = [];
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let neighbors = aliveNeighbors(grid, x, y);

            if (grid[x][y]) {
                newGrid[x][y] = !(neighbors < 2 || neighbors > 3);
            } else {
                newGrid[x][y] = neighbors === 3;
            }
        }
    }

    return newGrid;
}

function updateState() {
    currentGrid = nextGrid(currentGrid);
}

window.setInterval(updateState, 100);
draw();
