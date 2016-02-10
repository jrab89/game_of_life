function lerp(start: number, end: number, t: number) {
    return start + t * (end - start);
}

export class Point {
    constructor(public x: number, public y: number) {}

    distanceTo(other: Point) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        return Math.max(Math.abs(dx), Math.abs(dy));
    }

    lineTo(other: Point) {
        let pointsOnLine: Point[] = [];
        let distance = this.distanceTo(other);
        for (let step = 0; step <= distance; step++) {
            let t = distance === 0 ? 0.0 : step / distance;
            pointsOnLine.push(this.lerpTo(other, t).round());
        }
        return pointsOnLine;
    }

    round() {
        return new Point(Math.round(this.x), Math.round(this.y));
    }

    lerpTo(other: Point, t: number) {
        return new Point(lerp(this.x, other.x, t),
                         lerp(this.y, other.y, t));
    }
}
