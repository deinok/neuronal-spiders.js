var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var Circle = (function () {
        function Circle(point, radius, color) {
            this.point = point;
            this.radius = radius;
            this.color = color;
        }
        Circle.prototype.draw = function (canvasContext) {
            if (!this.isActive()) {
                return;
            }
            canvasContext.beginPath();
            canvasContext.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = this.color;
            canvasContext.fill();
        };
        Circle.prototype.getOpacity = function () {
            return this.color.alpha;
        };
        Circle.prototype.isActive = function () {
            return this.getOpacity() != 0;
        };
        return Circle;
    }());
    NeuronalSpiders.Circle = Circle;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var Color = (function () {
        function Color(red, green, blue, alpha) {
            if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || alpha < 0 || alpha > 1) {
                throw new RangeError("Out of range numbers");
            }
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
        }
        Color.FromHex = function (hex) {
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1) : null;
        };
        Color.prototype.toString = function () {
            if (this.alpha == 1) {
                return this.toHexString();
            }
            return this.toRGBAString();
        };
        Color.prototype.toHexString = function () {
            return "#" + this.componentToHex(this.red) + this.componentToHex(this.green) + this.componentToHex(this.blue);
        };
        Color.prototype.toRGBAString = function () {
            return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
        };
        Color.prototype.componentToHex = function (component) {
            var hexComponent = component.toString(16);
            return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
        };
        return Color;
    }());
    NeuronalSpiders.Color = Color;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var Line = (function () {
        function Line(point1, point2, color) {
            this.point1 = point1;
            this.point2 = point2;
            this.color = color;
        }
        Line.prototype.draw = function (context) {
            context.beginPath();
            context.moveTo(this.point1.x, this.point1.y);
            context.lineTo(this.point2.x, this.point2.y);
            this.color.alpha = this.point1.activeOpacity;
            context.strokeStyle = this.color.toString();
            context.stroke();
        };
        Line.drawLines = function (point, color, context) {
            if (!point.isActive()) {
                return;
            }
            for (var i in point.closest) {
                var line = new Line(point, point.closest[i], color);
                line.draw(context);
            }
        };
        return Line;
    }());
    NeuronalSpiders.Line = Line;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var NeuronalSpider = (function () {
        function NeuronalSpider(configuration) {
            this.animateHeader = true;
            this.configuration = configuration;
        }
        NeuronalSpider.prototype.initialize = function () {
            this.createCanvas();
            this.initializeHeader();
            this.initializePoints();
            this.initAnimation();
            this.addListeners();
        };
        NeuronalSpider.prototype.interchangeBackground = function () {
            var style = window.getComputedStyle(this.configuration.targetElement);
            if (style.background != "") {
                this.canvas.style.background = style.background;
                this.configuration.targetElement.style.background = "transparent";
            }
            this.canvas.style.zIndex = "-1";
        };
        NeuronalSpider.prototype.createCanvas = function () {
            var clientRect = this.configuration.targetElement.getBoundingClientRect();
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
        };
        NeuronalSpider.prototype.initializeHeader = function () {
            this.points = [];
            this.onResize(null);
            this.targetMouse = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 3
            };
            this.context = this.canvas.getContext('2d');
        };
        NeuronalSpider.prototype.initializePoints = function () {
            this.createPoints();
            this.findClosests();
            this.addCircles();
        };
        NeuronalSpider.prototype.createPoints = function () {
            var pointsPerDistance = Math.sqrt(this.configuration.numberPoints);
            for (var x = 0; x < this.width; x += this.width / pointsPerDistance) {
                for (var y = 0; y < this.height; y += this.height / pointsPerDistance) {
                    var point = new NeuronalSpiders.Point(x + Math.random() * this.width / pointsPerDistance, y + Math.random() * this.height / pointsPerDistance);
                    this.points.push(point);
                }
            }
        };
        NeuronalSpider.prototype.findClosests = function () {
            this.points = NeuronalSpiders.Point.findClosests(this.points, this.configuration);
        };
        NeuronalSpider.prototype.addCircles = function () {
            for (var i in this.points) {
                this.points[i].addCircle(this.configuration);
            }
        };
        NeuronalSpider.prototype.addListeners = function () {
            if (!('ontouchstart' in window)) {
                this.configuration.targetElement.onmousemove = this.onMouseMove.bind(this);
            }
            window.onresize = this.onResize.bind(this);
            window.onscroll = this.onScrollCheck.bind(this);
        };
        NeuronalSpider.prototype.onMouseMove = function (event) {
            this.targetMouse.x = event.offsetX;
            this.targetMouse.y = event.offsetY;
        };
        NeuronalSpider.prototype.onScrollCheck = function (event) {
            if (document.body.scrollTop > this.height) {
                this.animateHeader = false;
            }
            else {
                this.animateHeader = true;
            }
        };
        NeuronalSpider.prototype.onResize = function (event) {
            this.width = this.canvas.width = this.configuration.targetElement.clientWidth;
            this.height = this.canvas.height = this.configuration.targetElement.clientHeight;
        };
        NeuronalSpider.prototype.initAnimation = function () {
            this.animate();
            for (var i in this.points) {
                this.shiftPoint(this.points[i]);
            }
        };
        NeuronalSpider.prototype.animate = function () {
            if (this.animateHeader) {
                this.context.clearRect(0, 0, this.width, this.height);
                for (var i in this.points) {
                    var maxOpacity = this.configuration.maximumOpacity;
                    var distance = NeuronalSpiders.Point.getAbsolutDistance(this.targetMouse, this.points[i]);
                    var opacity = 0;
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
                    NeuronalSpiders.Line.drawLines(this.points[i], new NeuronalSpiders.Color(this.configuration.linesColor.red, this.configuration.linesColor.green, this.configuration.linesColor.blue, this.points[i].activeOpacity), this.context);
                    this.points[i].circle.draw(this.context);
                }
            }
            requestAnimationFrame(this.animate.bind(this));
        };
        NeuronalSpider.prototype.shiftPoint = function (target) {
            TweenLite.to(target, 1 + 1 * Math.random(), {
                x: target.originX - 50 + Math.random() * 100,
                y: target.originY - 50 + Math.random() * 100,
                onComplete: this.shiftPoint.bind(this, target),
            });
        };
        return NeuronalSpider;
    }());
    NeuronalSpiders.NeuronalSpider = NeuronalSpider;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var NeuronalSpiderConfiguration = (function () {
        function NeuronalSpiderConfiguration(htmlElement, enabled) {
            this.enabled = true;
            this.numberPoints = 400;
            this.numberLines = 5;
            this.visualRadius = 40000;
            this.maximumOpacity = 0.6;
            this.circleRadius = 2;
            this.circleColor = NeuronalSpiders.Color.FromHex("#000000");
            this.linesColor = NeuronalSpiders.Color.FromHex("#000000");
            this.targetElement = htmlElement;
            this.enabled = enabled;
        }
        NeuronalSpiderConfiguration.readConfiguration = function (htmlElement) {
            if (htmlElement.dataset['neuronal'] == "true") {
                var result = new NeuronalSpiderConfiguration(htmlElement, true);
                var numberPoints = htmlElement.dataset['numberPoints'];
                if (numberPoints != null) {
                    result.numberPoints = parseInt(numberPoints);
                }
                var numberLines = htmlElement.dataset['numberLines'];
                if (numberLines != null) {
                    result.numberLines = parseInt(numberLines);
                }
                var visualRadius = htmlElement.dataset['visualRadius'];
                if (visualRadius != null) {
                    result.visualRadius = parseInt(visualRadius);
                }
                var maximumOpacity = htmlElement.dataset['maximumOpacity'];
                if (maximumOpacity != null) {
                    result.maximumOpacity = parseInt(maximumOpacity);
                }
                var circleRadius = htmlElement.dataset['circleRadius'];
                if (circleRadius != null) {
                    result.circleRadius = parseInt(circleRadius);
                }
                var color = htmlElement.dataset['color'];
                if (color != null) {
                    var generalColor = NeuronalSpiders.Color.FromHex(color);
                    result.circleColor = generalColor;
                    result.linesColor = generalColor;
                }
                var circleColor = htmlElement.dataset['circlesColor'];
                if (circleColor != null) {
                    result.circleColor = NeuronalSpiders.Color.FromHex(circleColor);
                }
                var linesColor = htmlElement.dataset['linesColor'];
                if (linesColor != null) {
                    result.linesColor = NeuronalSpiders.Color.FromHex(linesColor);
                }
                return result;
            }
            return new NeuronalSpiderConfiguration(htmlElement, false);
        };
        NeuronalSpiderConfiguration.searchNeuronalSpiderElements = function () {
            try {
                var nodeList = document.querySelectorAll('[data-neuronal]');
                return Array.prototype.slice.call(nodeList);
            }
            catch (exception) {
                return null;
            }
        };
        return NeuronalSpiderConfiguration;
    }());
    NeuronalSpiders.NeuronalSpiderConfiguration = NeuronalSpiderConfiguration;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    var Point = (function () {
        function Point(x, y) {
            this.x = this.originX = x;
            this.y = this.originY = y;
        }
        Point.prototype.isActive = function () {
            return this.activeOpacity != 0;
        };
        Point.prototype.addCircle = function (configuration) {
            this.circle = new NeuronalSpiders.Circle(this, configuration.circleRadius + Math.random() * 2, new NeuronalSpiders.Color(configuration.circleColor.red, configuration.circleColor.green, configuration.circleColor.blue, 1));
        };
        Point.getAbsolutDistance = function (point1, point2) {
            return Math.abs(Point.getDistance(point1, point2));
        };
        Point.getDistance = function (point1, point2) {
            return Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2);
        };
        Point.findClosests = function (points, configuration) {
            for (var i in points) {
                var closest = new Array(configuration.numberLines);
                var point = points[i];
                for (var j in points) {
                    var point2 = points[j];
                    if (point != point2) {
                        var placed = false;
                        for (var k = 0; k < configuration.numberLines; k++) {
                            if (!placed) {
                                if (closest[k] == undefined) {
                                    closest[k] = point2;
                                    placed = true;
                                }
                            }
                        }
                        for (var k = 0; k < configuration.numberLines; k++) {
                            if (!placed) {
                                if (Point.getDistance(point, point2) < Point.getDistance(point, closest[k])) {
                                    closest[k] = point2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                point.closest = closest;
            }
            return points;
        };
        return Point;
    }());
    NeuronalSpiders.Point = Point;
})(NeuronalSpiders || (NeuronalSpiders = {}));
var NeuronalSpiders;
(function (NeuronalSpiders) {
    "use strict";
    window.onload = function () {
        execute();
    };
    function execute() {
        var neuronalElements = NeuronalSpiders.NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
        var neuronalSpiders = new Array(neuronalElements.length);
        for (var i in neuronalElements) {
            var configuration = NeuronalSpiders.NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
            neuronalSpiders[i] = new NeuronalSpiders.NeuronalSpider(configuration);
            neuronalSpiders[i].initialize();
        }
    }
})(NeuronalSpiders || (NeuronalSpiders = {}));
//# sourceMappingURL=neuronal-spiders.js.map