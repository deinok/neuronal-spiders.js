/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"

$(function () {

    var points=new Array<Point>();
    
    
    // Main

    var spider = new NeuronalSpider();
    spider.initializeHeader();
    points = spider.createPoints(points);
    points = spider.findClosests(points);
    points = spider.addCircles(points);
    

    initAnimation();
    spider.addListeners();

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
                if (Math.abs(Point.getDistance(spider.target, points[i])) < 4000) {
                    points[i].activeOpacity = 0.3;
                    points[i].circle.color.alpha = 0.6;
                } else if (Math.abs(Point.getDistance(spider.target, points[i])) < 20000) {
                    points[i].activeOpacity = 0.1;
                    points[i].circle.color.alpha = 0.3;
                } else if (Math.abs(Point.getDistance(spider.target, points[i])) < 40000) {
                    points[i].activeOpacity = 0.02;
                    points[i].circle.color.alpha = 0.1;
                } else {
                    points[i].activeOpacity = 0;
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
});


