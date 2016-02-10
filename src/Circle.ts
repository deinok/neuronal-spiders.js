"use strict"

class Circle {

    public point: GeometricPoint;
    public radius: number;
    public color: Color;

    constructor(point: GeometricPoint, radius: number,color: Color) {
        this.point = point;
        this.radius = radius;
        this.color = color;
    }

    public draw(canvasContext: CanvasRenderingContext2D): void {
        if (!this.isActive()) {
            return;
        }
        canvasContext.beginPath();
        canvasContext.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
    }

    public isActive():boolean {
        return this.color.alpha != 0;
    }
}