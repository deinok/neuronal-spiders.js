"use strict";

/**
 * Represents a Point in Canvas
 */
class Point implements GeometricPoint {

    public x: number;
    public y: number;
    public originX: number;
    public originY: number;
    public activeOpacity: number;
    public closest: Point[];
    public circle: Circle;

    public constructor(x: number, y: number) {
        this.x = this.originX = x;
        this.y = this.originY = y;
    }

    public isActive(): boolean {
        return this.activeOpacity != 0;
    }

    public addCircle(configuration:NeuronalSpiderConfiguration) {
        this.circle = new Circle(
            this,
            configuration.circleRadius + Math.random() * 2,
            new Color(
                configuration.circleColor.red,
                configuration.circleColor.green,
                configuration.circleColor.blue,
                1
            )
        );
    }

    public static getAbsolutDistance(point1: GeometricPoint, point2: GeometricPoint): number {
        return Math.abs(
            Point.getDistance(point1, point2)
        );
    }

    public static getDistance(point1: GeometricPoint, point2: GeometricPoint): number {
        return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
    }

    public static findClosests(points:Point[],configuration:NeuronalSpiderConfiguration): Point[] {
        for (var i in points) {
            var closest: Point[] = new Array<Point>(configuration.numberLines);
            var point: Point = points[i];

            for (var j in points) {
                var point2: Point = points[j];
                if (point != point2) {
                    var placed: boolean = false;
                    for (var k = 0; k < configuration.numberLines; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = point2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < configuration.numberLines; k++) {
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

}