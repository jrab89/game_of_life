import { Point } from "../src/point";
import * as assert from "assert";

let origin = new Point(0, 0);
let fiveZero = new Point(5, 0);

assert.equal(origin.distanceTo(fiveZero), 5);
assert.deepEqual(origin.lineTo(fiveZero), [
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(3, 0),
    new Point(4, 0),
    new Point(5, 0)
]);

assert.deepEqual(origin.lineTo(new Point(5, 1)), [
    new Point(0, 0),
    new Point(1, 0),
    new Point(2, 0),
    new Point(3, 1),
    new Point(4, 1),
    new Point(5, 1)
]);

assert.deepEqual(origin.lineTo(new Point(3, 10)), [
    new Point(0, 0),
    new Point(0, 1),
    new Point(1, 2),
    new Point(1, 3),
    new Point(1, 4),
    new Point(2, 5),
    new Point(2, 6),
    new Point(2, 7),
    new Point(2, 8),
    new Point(3, 9),
    new Point(3, 10)
]);
