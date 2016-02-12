"use strict"

class NeuronalSpider {

    public width: number;
    public height: number;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public points: Point[];
    public targetMouse: GeometricPoint;
    public animateHeader: boolean = true;
    public configuration:NeuronalSpiderConfiguration;

    public constructor(configuration: NeuronalSpiderConfiguration) {
        this.configuration = configuration;
    }

    public initialize(): void {
        this.initializeHeader();
        this.initializePoints();
        this.initAnimation();
        this.addListeners();
    }

    public initializeHeader(): void {
        this.points = new Array<Point>(this.configuration.numberPoints);
        this.canvas = <HTMLCanvasElement>this.configuration.targetElement;
        this.canvas.width = this.width = window.innerWidth;
        this.canvas.height = this.height = window.innerHeight;
        this.targetMouse = new Point(
            window.innerWidth / 2,
            window.innerHeight / 3
        );
        this.context = this.canvas.getContext('2d');
    }


    public initializePoints(): void {
        this.createPoints();
        this.findClosests();
        this.addCircles();
    }

    private createPoints(): void {
        var pointsPerDistance = Math.sqrt(this.configuration.numberPoints);
        for (var x = 0; x < this.width; x = x + this.width / pointsPerDistance) {
            for (var y = 0; y < this.height; y = y + this.height / pointsPerDistance) {
                var point = new Point(
                    x + Math.random() * this.width / pointsPerDistance,
                    y + Math.random() * this.height / pointsPerDistance
                );
                this.points.push(point);
            }
        }
    }

    private findClosests(): void{
        for (var i in this.points) {
            var closest = [];
            var p1 = this.points[i];
            for (var j = 0; j < this.points.length; j++) {
                var p2 = this.points[j]
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
    }

    private addCircles():void {
        for (var l in this.points) {
            var circle = new Circle(
                this.points[l],
                this.configuration.circleRadius + Math.random() * 2,
                new Color(
                    this.configuration.circleColor.red,
                    this.configuration.circleColor.green,
                    this.configuration.circleColor.blue,
                    1
                )
            );
            this.points[l].circle = circle;
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
        this.targetMouse.x = posx;
        this.targetMouse.y = posy;
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



    public initAnimation(): void {
        this.animate();
        for (var i in this.points) {
            this.shiftPoint(this.points[i]);
        }
    }

    private animate(): void {
        if (this.animateHeader) {
            this.context.clearRect(0, 0, this.width, this.height);
            for (var i in this.points) {
                var distance = Point.getAbsolutDistance(this.targetMouse,this.points[i]);
                if (distance < this.configuration.visualRadius/10) {
                    this.points[i].activeOpacity = 0.3;
                    this.points[i].circle.color.alpha = 0.6;
                } else if (distance < this.configuration.visualRadius/2) {
                    this.points[i].activeOpacity = 0.1;
                    this.points[i].circle.color.alpha = 0.3;
                } else if (distance < this.configuration.visualRadius) {
                    this.points[i].activeOpacity = 0.02;
                    this.points[i].circle.color.alpha = 0.1;
                } else {
                    this.points[i].activeOpacity = 0;
                    this.points[i].circle.color.alpha = 0;
                }

                Line.drawLines(
                    this.points[i],
                    new Color(
                        this.configuration.linesColor.red,
                        this.configuration.linesColor.green,
                        this.configuration.linesColor.blue,
                        this.points[i].activeOpacity
                    ),
                    this.context
                );
                this.points[i].circle.draw(this.context);
            }
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    private shiftPoint(target: Point): void {
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

    










}