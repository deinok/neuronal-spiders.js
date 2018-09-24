export class Line {
    static drawLines(point, color, context) {
        if (!point.isActive()) {
            return;
        }
        for (let i in point.closest) {
            let line = new Line(point, point.closest[i], color);
            line.draw(context);
        }
    }
    constructor(point1, point2, color) {
        this.point1 = point1;
        this.point2 = point2;
        this.color = color;
    }
    draw(context) {
        context.beginPath();
        context.moveTo(this.point1.x, this.point1.y);
        context.lineTo(this.point2.x, this.point2.y);
        this.color.alpha = this.point1.activeOpacity;
        context.strokeStyle = this.color.toString();
        context.stroke();
    }
}
//# sourceMappingURL=Line.js.map