/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"

class Color {

    public red: number;
    public green: number;
    public blue: number;
    public opacity: number;

    public constructor(red: number, green: number, blue: number, opacity: number) {
        if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || opacity < 0 || opacity > 1) {
            throw new RangeError("Out of range numbers")
        }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.opacity = opacity;
    }

    public static FromHex(hex:string):Color {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? new Color(
            Number.parseInt(result[1], 16),
            Number.parseInt(result[2], 16),
            Number.parseInt(result[3], 16),
            1
        ) : null;
    }

    public toString(): string {
        if (this.opacity == 1) {
            return this.toHexString();
        }
        return this.toRGBAString();
    }

    public toHexString(): string {
        return "#" + this.componentToHex(this.red) + this.componentToHex(this.green) + this.componentToHex(this.blue);
    }
    public toRGBAString(): string {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
    }

    private componentToHex(component:number):string {
        var hexComponent:string = component.toString(16);
        return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
    }
}

interface GeometricPoint {
    x: number;
    y: number;
}

class Point implements GeometricPoint{

    public x: number;
    public y: number;
    public originX: number;
    public originY: number;
    public activeOpacity: number;
    public closest: Point[];
    public circle: Circle;

    public constructor(x: number, y: number) {
        this.x = this.originX= x;
        this.y = this.originY = y;
    }

    public static getDistance(point1: Point, point2: Point): number {
        return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
    }

}

class Circle {

    public point: Point;
    public radius: number;
    public color: Color;
    public active: boolean;

    public draw(canvasContext:CanvasRenderingContext2D):void {
        if (this.active){
            return;
        }
        canvasContext.beginPath();
        canvasContext.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = 'rgba(255,255,255,' + this.active + ')';/*TODO: Color dels Cercles*/
        canvasContext.fill();
    }
}

class NeuronalSpider {

    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    points: Point[];
    target: any;
    animatedHeader: boolean;
  
}


$(function () {

    var points, target, animateHeader = true;
    var spider = new NeuronalSpider();

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        spider.width = window.innerWidth;
        spider.height = window.innerHeight;
        target = {
            x: spider.width / 2,
            y: spider.height / 3
        };

        spider.canvas = <HTMLCanvasElement>document.getElementById('spiders');
        spider.canvas.width = spider.width;
        spider.canvas.height = spider.height;
        spider.context = spider.canvas.getContext('2d');

        // create points
        points = [];
        for (var x = 0; x < spider.width; x = x + spider.width / 20) {
            for (var y = 0; y < spider.height; y = y + spider.height / 20) {
                var px = x + Math.random() * spider.width / 20;
                var py = y + Math.random() * spider.height / 20;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
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
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point

        for(var l in points) {
            var c = new Circle(points[l], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
            points[l].circle = c;
        }
    }

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
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if (document.body.scrollTop > spider.height) animateHeader = false;
        else animateHeader = true;
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
        if (animateHeader) {
            spider.context.clearRect(0, 0, spider.width, spider.height);
            for (var i in points) {
                // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
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

    function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function () {
            if (!_this.active) return;
            spider.context.beginPath();
            spider.context.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            spider.context.fillStyle = 'rgba(255,255,255,' + _this.active + ')';/*TODO: Color dels Cercles*/
            spider.context.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

});


