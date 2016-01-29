/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

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



    public drawLines(p:any):void {
        if (!p.active) return;
        for (var i in p.closest) {
            this.context.beginPath();
            this.context.moveTo(p.x, p.y);
            this.context.lineTo(p.closest[i].x, p.closest[i].y);
            this.context.strokeStyle = 'rgba(255,255,255,' + p.active + ')';/*TODO: Lines color*/
            this.context.stroke();
        }
    }
}

$(function () {

    var points=[];
    
    
    // Main

    var spider = new NeuronalSpider();
    spider.initializeHeader();
    points = spider.createPoints(points);
    points = spider.findClosests(points);
    points = spider.addCircles(points);
    

    initAnimation();
    addListeners();


    // Event handling
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e:MouseEvent) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        spider.target.x = posx;
        spider.target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > spider.height) spider.animateHeader = false;
        else spider.animateHeader = true;
    }

    function resize() {
        spider.width = spider.canvas.width = window.innerWidth;
        spider.height = spider.canvas.height = window.innerHeight;
    }

    // animation
    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (spider.animateHeader) {
            spider.context.clearRect(0, 0, spider.width, spider.height);
            for (var i in points) {
                // detect points in range
                if (Math.abs(getDistance(spider.target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.color.alpha = 0.6;
                } else if (Math.abs(getDistance(spider.target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.color.alpha = 0.3;
                } else if (Math.abs(getDistance(spider.target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.color.alpha = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.color.alpha = 0;
                }

                spider.drawLines(points[i]);
                points[i].circle.draw(spider.context);
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }

    // Canvas manipulation
    function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            spider.context.beginPath();
            spider.context.moveTo(p.x, p.y);
            spider.context.lineTo(p.closest[i].x, p.closest[i].y);
            spider.context.strokeStyle = 'rgba(255,255,255,' + p.active + ')';/*TODO: Lines color*/
            spider.context.stroke();
        }
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

});


