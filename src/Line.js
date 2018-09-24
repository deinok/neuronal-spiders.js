/**
 * Represents a Line in Canvas
 */
export class Line {
    /**
     * Draws all Lines of a Point
     * @param point The Point
     * @param color The Color
     * @param context The Canvas Context
     */
    static drawLines(point, color, context) {
        if (!point.isActive()) {
            return;
        }
        for (let i in point.closest) {
            let line = new Line(point, point.closest[i], color);
            line.draw(context);
        }
    }
    /**
     * Creates a Line beetween two points
     * @param point1 The first Point
     * @param point2 The second Point
     * @param color The Color
     */
    constructor(point1, point2, color) {
        this.point1 = point1;
        this.point2 = point2;
        this.color = color;
    }
    /**
     * Draw a Line
     * @param context The Canvas Context
     */
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