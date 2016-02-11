"use strict"

class Line {
    
    public point1: Point;
    public point2: GeometricPoint;
    public color: Color;

    constructor(point1:Point,point2:GeometricPoint,color:Color) {
        this.point1 = point1;
        this.point2 = point2;
        this.color = color;
    }

    public draw(context:CanvasRenderingContext2D):void{
        context.beginPath();
        context.moveTo(this.point1.x, this.point1.y);
        context.lineTo(this.point2.x, this.point2.y);
        this.color.alpha = this.point1.activeOpacity;
        context.strokeStyle = this.color.toString();
        context.stroke();
    }

    public static drawLines(point: Point, color: Color, context: CanvasRenderingContext2D): void {
        if (!point.isActive()) {
            return;
        }
        for (var i in point.closest) {
            var line = new Line(
                point,
                point.closest[i],
                color
            );
            line.draw(context);
        }
    }

}