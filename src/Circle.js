export class Circle {
    constructor(point, radius, color) {
        this.point = point;
        this.radius = radius;
        this.color = color;
    }
    draw(canvasContext) {
        if (!this.isActive()) {
            return;
        }
        canvasContext.beginPath();
        canvasContext.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
    }
    getOpacity() {
        return this.color.alpha;
    }
    isActive() {
        return this.getOpacity() !== 0;
    }
}
//# sourceMappingURL=Circle.js.map