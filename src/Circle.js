/**
 * Represents a Circle
 */
export class Circle {
    /**
     * Creates a Circle
     * @param point the IGeometricPoint
     * @param radius the radius of the Circle
     * @param color the Color of the Circle
     */
    constructor(point, radius, color) {
        this.point = point;
        this.radius = radius;
        this.color = color;
    }
    /**
     * Draw a Circle in the canvas
     * @param canvasContext The Canvas Context
     */
    draw(canvasContext) {
        if (!this.isActive()) {
            return;
        }
        canvasContext.beginPath();
        canvasContext.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
    }
    /**
     * Gets the Opacity of its Colors
     */
    getOpacity() {
        return this.color.alpha;
    }
    /**
     * Checks if its opacity is not 0
     */
    isActive() {
        return this.getOpacity() !== 0;
    }
}
//# sourceMappingURL=Circle.js.map