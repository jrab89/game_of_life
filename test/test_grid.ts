import { Grid } from "../src/grid";
import * as assert from "assert";

const beehive = new Grid([
    [false, false, false, false, false, false],
    [false, false, true,  true,  false, false],
    [false, true,  false, false, true,  false],
    [false, false, true,  true,  false, false],
    [false, false, false, false, false, false]
]);

const block = new Grid([
    [true, true],
    [true, true]
]);

const glider = new Grid([
    [false, true,  false],
    [false, false, true],
    [true,  true,  true],
    [false, false, false]
]);

assert.deepEqual(beehive.grid, beehive.next().grid);
assert.deepEqual(block.grid, block.next().grid);
assert.deepEqual(glider.next().grid, [
    [false, false, false],
    [true,  false, true],
    [false, true,  true],
    [false, true,  false]
]);

assert.deepEqual(block.toImageDataArray(), new Uint8ClampedArray(
    [0, 0, 0, 255,
     0, 0, 0, 255,
     0, 0, 0, 255,
     0, 0, 0, 255])
);

assert.deepEqual(block.toggle([]), block);
assert.deepEqual(beehive.toggle([]), beehive);
assert.deepEqual(block.toggle([{x: 0, y: 0}, {x: 1, y: 0}]), new Grid([
    [false, true],
    [false, true]
]));
