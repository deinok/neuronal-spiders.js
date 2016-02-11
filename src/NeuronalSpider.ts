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

    public createPoints(points: Point[]): Point[] {
        for (var x = 0; x < this.width; x = x + this.width / 20) {
            for (var y = 0; y < this.height; y = y + this.height / 20) {
                var px = x + Math.random() * this.width / 20;
                var py = y + Math.random() * this.height / 20;
                var p = new Point(px, py);
                points.push(p);
            }
        }
        return points;
    }

    public findClosests(points: Point[]): Point[] {
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

    public addCircles(points: Point[]): Point[] {
        for (var l in points) {
            var circle = new Circle(points[l], 2 + Math.random() * 2, new Color(255, 255, 255, 0.3));
            points[l].circle = circle;
        }
        return points;
    }

    public drawLines(point: Point): void {
        if (!point.activeOpacity) {
            return;
        }
        for (var i in point.closest) {
            this.context.beginPath();
            this.context.moveTo(point.x, point.y);
            this.context.lineTo(point.closest[i].x, point.closest[i].y);
            this.context.strokeStyle = 'rgba(255,255,255,' + point.activeOpacity + ')';/*TODO: Lines color*/
            this.context.stroke();
        }
    }

    public addListeners(): void {
        if (!('ontouchstart' in window)) {
            window.onmousemove = this.onMouseMove.bind(this);
        }
        window.onresize = this.onResize.bind(this);
        window.onscroll = this.onScrollCheck.bind(this);
    }

    private onMouseMove(event: MouseEvent):void {
        var posx = 0;
        var posy = 0;
        if (event.pageX || event.pageY) {
            posx = event.pageX;
            posy = event.pageY;
        } else if (event.clientX || event.clientY) {
            posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        this.target.x = posx;
        this.target.y = posy;
    }

    private onScrollCheck(event: UIEvent): void {
        if (document.body.scrollTop > this.height) {
            this.animateHeader = false;
        } else {
            this.animateHeader = true;
        }
    }

    private onResize(event:UIEvent): void {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }


    public shiftPoint(target: Point): void {
        TweenLite.to(
            target,
            1 + 1 * Math.random(),
            {
                x: target.originX - 50 + Math.random() * 100,
                y: target.originY - 50 + Math.random() * 100,
                onComplete: this.shiftPoint.bind(this,target),
            }
        );
    }

    




    public animate(points:Point[]):void {
        if (this.animateHeader) {
            this.context.clearRect(0, 0, this.width, this.height);
            for (var i in points) {
                // detect points in range
                if (Math.abs(Point.getDistance(this.target, points[i])) < 4000) {
                    points[i].activeOpacity = 0.3;
                    points[i].circle.color.alpha = 0.6;
                } else if (Math.abs(Point.getDistance(this.target, points[i])) < 20000) {
                    points[i].activeOpacity = 0.1;
                    points[i].circle.color.alpha = 0.3;
                } else if (Math.abs(Point.getDistance(this.target, points[i])) < 40000) {
                    points[i].activeOpacity = 0.02;
                    points[i].circle.color.alpha = 0.1;
                } else {
                    points[i].activeOpacity = 0;
                    points[i].circle.color.alpha = 0;
                }

                this.drawLines(points[i]);
                points[i].circle.draw(this.context);
            }
        }
        requestAnimationFrame(this.animate.bind(this,points));
    }


    public initAnimation(points:Point[]):void {
        this.animate(points);
        for (var i in points) {
            this.shiftPoint(points[i]);
        }
    }


}