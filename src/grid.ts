export class Grid {
    width: number;
    height: number;

    static random(width: number, height: number) {
        let grid: boolean[][] = [];

        for (let x = 0; x < width; x++) {
            grid[x] = [];
            for (let y = 0; y < height; y++) {
                grid[x][y] = Math.round(Math.random()) === 1;
            }
        }

        return grid;
    }

    static cleared(width: number, height: number) {
        let grid: boolean[][] = [];

        for (let x = 0; x < width; x++) {
            grid[x] = [];
            for (let y = 0; y < height; y++) {
                grid[x][y] = false;
            }
        }

        return grid;
    }

    constructor(public grid: boolean[][]) {
        this.width = grid.length;
        this.height = grid[0].length;
    }

    toImageDataArray() {
        let imageDataArray = new Uint8ClampedArray(this.width * this.height * 4);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let index = 4 * y * this.width + 4 * x;
                let color = this.grid[x][y] ? 0 : 255; // true is black, false is white

                imageDataArray[index]     = color; // red
                imageDataArray[index + 1] = color; // green
                imageDataArray[index + 2] = color; // blue
                imageDataArray[index + 3] = 255;   // alpha
            }
        }

        return imageDataArray;
    }

    aliveNeighborsAt(x: number, y: number) {
        let total = 0;

        // bottom right
        if (x + 1 < this.width && y + 1 < this.height && this.grid[x + 1][y + 1]) {
            total += 1;
        }

        // bottom middle
        if (y + 1 < this.height && this.grid[x][y + 1]) {
            total += 1;
        }

        // bottom left
        if (x - 1 >= 0 && y + 1 < this.height && this.grid[x - 1][y + 1]) {
            total += 1;
        }

        // left
        if (x - 1 >= 0 && this.grid[x - 1][y]) {
            total += 1;
        }

        // top left
        if (x - 1 >= 0 && y - 1 >= 0 && this.grid[x - 1][y - 1]) {
            total += 1;
        }

        // top middle
        if (y - 1 >= 0 && this.grid[x][y - 1]) {
            total += 1;
        }

        // top right
        if (x + 1 < this.width && y - 1 >= 0 && this.grid[x + 1][y - 1]) {
            total += 1;
        }

        // right
        if (x + 1 < this.width && this.grid[x + 1][y]) {
            total += 1;
        }

        return total;
    }

    next() {
        let newGrid: boolean[][] = [];

        for (let x = 0; x < this.width; x++) {
            newGrid[x] = [];
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let neighbors = this.aliveNeighborsAt(x, y);

                if (this.grid[x][y]) {
                    newGrid[x][y] = !(neighbors < 2 || neighbors > 3);
                } else {
                    newGrid[x][y] = neighbors === 3;
                }
            }
        }

        return new Grid(newGrid);
    }

    toggle(coordsToToggle: {x: number, y: number}[]) {
        if (coordsToToggle.length === 0) {
            return this;
        }

        let gridCopy: boolean[][] = [];

        for (let x = 0; x < this.width; x++) {
            gridCopy[x] = [];
            for (let y = 0; y < this.height; y++) {
                gridCopy[x][y] = this.grid[x][y];
            }
        }

        coordsToToggle.forEach(function(coord) {
            gridCopy[coord.x][coord.y] = !gridCopy[coord.x][coord.y];
        });

        return new Grid(gridCopy);
    }
}
