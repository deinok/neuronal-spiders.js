"use strict"

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

    public drawLines(context:CanvasRenderingContext2D):void {
        if (!this.isActive()) return;
        for (var closestPoint in this.closest) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(closestPoint.x, closestPoint.y);
            context.strokeStyle = 'rgba(255,255,255,' + this.activeOpacity + ')';/*TODO: Lines color*/
            context.stroke();
        }
    }

    public static getDistance(point1: GeometricPoint, point2: GeometricPoint): number {
        return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
    }

}