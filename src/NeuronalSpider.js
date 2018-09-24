import { TweenLite } from "gsap";
import { Point } from "./Point";
import { Color } from "./Color";
import { Line } from "./Line";
export class NeuronalSpider {
    constructor(configuration) {
        this.animateHeader = true;
        this.configuration = configuration;
    }
    initialize() {
        this.createCanvas();
        this.initializeHeader();
        this.initializePoints();
        this.initAnimation();
        this.addListeners();
    }
    interchangeBackground() {
        let style = window.getComputedStyle(this.configuration.targetElement);
        if (style.background != "") {
            this.canvas.style.background = style.background;
            this.configuration.targetElement.style.background = "transparent";
        }
        this.canvas.style.zIndex = "-1";
    }
    createCanvas() {
        let clientRect = this.configuration.targetElement.getBoundingClientRect();
        this.canvas = document.createElement("canvas");
        this.configuration.targetElement.parentElement.insertBefore(this.canvas, this.configuration.targetElement);
        this.canvas.width = clientRect.width;
        this.canvas.height = clientRect.height;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = clientRect.top.toString() + "px";
        this.canvas.style.left = clientRect.left.toString() + "px";
        this.canvas.style.width = clientRect.width.toString() + "px";
        this.canvas.style.height = clientRect.height.toString() + "px";
        this.interchangeBackground();
    }
    initializeHeader() {
        this.points = [];
        this.onResize(null);
        this.targetMouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 3,
        };
        this.context = this.canvas.getContext("2d");
    }
    initializePoints() {
        this.createPoints();
        this.findClosests();
        this.addCircles();
    }
    addListeners() {
        if (!("ontouchstart" in window)) {
            this.configuration.targetElement.onmousemove = this.onMouseMove.bind(this);
        }
        window.onresize = this.onResize.bind(this);
        window.onscroll = this.onScrollCheck.bind(this);
    }
    initAnimation() {
        this.animate();
        for (let i in this.points) {
            this.shiftPoint(this.points[i]);
        }
    }
    createPoints() {
        let pointsPerDistance = Math.sqrt(this.configuration.numberPoints);
        for (let x = 0; x < this.width; x += this.width / pointsPerDistance) {
            for (let y = 0; y < this.height; y += this.height / pointsPerDistance) {
                let point = new Point(x + Math.random() * this.width / pointsPerDistance, y + Math.random() * this.height / pointsPerDistance);
                this.points.push(point);
            }
        }
    }
    findClosests() {
        this.points = Point.findClosests(this.points, this.configuration);
    }
    addCircles() {
        for (let i in this.points) {
            this.points[i].addCircle(this.configuration);
        }
    }
    onMouseMove(event) {
        this.targetMouse.x = event.offsetX;
        this.targetMouse.y = event.offsetY;
    }
    onScrollCheck(event) {
        if (document.body.scrollTop > this.height) {
            this.animateHeader = false;
        }
        else {
            this.animateHeader = true;
        }
    }
    onResize(event) {
        this.width = this.canvas.width = this.configuration.targetElement.clientWidth;
        this.height = this.canvas.height = this.configuration.targetElement.clientHeight;
    }
    animate() {
        if (this.animateHeader) {
            this.context.clearRect(0, 0, this.width, this.height);
            for (let i in this.points) {
                let maxOpacity = this.configuration.maximumOpacity;
                let distance = Point.getAbsolutDistance(this.targetMouse, this.points[i]);
                let opacity = 0;
                if (distance < this.configuration.visualRadius / 10) {
                    opacity = (maxOpacity / 10) * 10;
                }
                else if (distance < this.configuration.visualRadius / 9) {
                    opacity = (maxOpacity / 10) * 9;
                }
                else if (distance < this.configuration.visualRadius / 8) {
                    opacity = (maxOpacity / 10) * 8;
                }
                else if (distance < this.configuration.visualRadius / 7) {
                    opacity = (maxOpacity / 10) * 7;
                }
                else if (distance < this.configuration.visualRadius / 6) {
                    opacity = (maxOpacity / 10) * 6;
                }
                else if (distance < this.configuration.visualRadius / 5) {
                    opacity = (maxOpacity / 10) * 5;
                }
                else if (distance < this.configuration.visualRadius / 4) {
                    opacity = (maxOpacity / 10) * 4;
                }
                else if (distance < this.configuration.visualRadius / 3) {
                    opacity = (maxOpacity / 10) * 3;
                }
                else if (distance < this.configuration.visualRadius / 2) {
                    opacity = (maxOpacity / 10) * 2;
                }
                else if (distance < this.configuration.visualRadius) {
                    opacity = (maxOpacity / 10) * 1;
                }
                else {
                    opacity = (maxOpacity / 10) * 0;
                }
                this.points[i].circle.color.alpha = opacity;
                this.points[i].activeOpacity = opacity / 2;
                Line.drawLines(this.points[i], new Color(this.configuration.linesColor.red, this.configuration.linesColor.green, this.configuration.linesColor.blue, this.points[i].activeOpacity), this.context);
                this.points[i].circle.draw(this.context);
            }
        }
        requestAnimationFrame(this.animate.bind(this));
    }
    shiftPoint(target) {
        TweenLite.to(target, 1 + 1 * Math.random(), {
            x: target.originX - 50 + Math.random() * 100,
            y: target.originY - 50 + Math.random() * 100,
            onComplete: this.shiftPoint.bind(this, target),
        });
    }
}
//# sourceMappingURL=NeuronalSpider.js.map