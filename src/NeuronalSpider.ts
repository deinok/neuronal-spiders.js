"use strict"

class NeuronalSpider {

    public width: number;
    public height: number;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public points: Point[];
    public target: GeometricPoint;
    public animateHeader: boolean = true;

    public initializeHeader(): void {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.target = new Point(
            window.innerWidth / 2,
            window.innerHeight / 3
        );

        this.canvas = <HTMLCanvasElement>document.getElementById('spiders');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
    }

    public createPoints(points: any[]): any[] {
        for (var x = 0; x < this.width; x = x + this.width / 20) {
            for (var y = 0; y < this.height; y = y + this.height / 20) {
                var px = x + Math.random() * this.width / 20;
                var py = y + Math.random() * this.height / 20;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                points.push(p);
            }
        }
        return points;
    }

    public findClosests(points: any[]): any[] {
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (Point.getDistance(p1, p2) < Point.getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        return points;
    }

    public addCircles(points: any[]): any[] {
        for (var l in points) {
            var circle = new Circle(points[l], 2 + Math.random() * 2, new Color(255, 255, 255, 0.3));
            points[l].circle = circle;
        }
        return points;
    }

   

    public drawLines(p: any): void {
        if (!p.active) return;
        for (var i in p.closest) {
            this.context.beginPath();
            this.context.moveTo(p.x, p.y);
            this.context.lineTo(p.closest[i].x, p.closest[i].y);
            this.context.strokeStyle = 'rgba(255,255,255,' + p.active + ')';/*TODO: Lines color*/
            this.context.stroke();
        }
    }


    public addListeners(): any {
        window.onresize = this.onResize.bind(this);
    }

    private onResize(event:UIEvent): void {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }
}