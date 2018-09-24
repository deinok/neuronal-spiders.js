import { Circle } from "./Circle";
import { Color } from "./Color";
export class Point {
    static getAbsolutDistance(point1, point2) {
        return Math.abs(Point.getDistance(point1, point2));
    }
    static getDistance(point1, point2) {
        return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
    }
    static findClosests(points, configuration) {
        for (let i in points) {
            let closest = new Array(configuration.numberLines);
            let point = points[i];
            for (let j in points) {
                let point2 = points[j];
                if (point != point2) {
                    let placed = false;
                    for (let k = 0; k < configuration.numberLines; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = point2;
                                placed = true;
                            }
                        }
                    }
                    for (let k = 0; k < configuration.numberLines; k++) {
                        if (!placed) {
                            if (Point.getDistance(point, point2) < Point.getDistance(point, closest[k])) {
                                closest[k] = point2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            point.closest = closest;
        }
        return points;
    }
    constructor(x, y) {
        this.x = this.originX = x;
        this.y = this.originY = y;
    }
    isActive() {
        return this.activeOpacity !== 0;
    }
    addCircle(configuration) {
        this.circle = new Circle(this, configuration.circleRadius + Math.random() * 2, new Color(configuration.circleColor.red, configuration.circleColor.green, configuration.circleColor.blue, 1));
    }
}
//# sourceMappingURL=Point.js.map