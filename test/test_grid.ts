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
