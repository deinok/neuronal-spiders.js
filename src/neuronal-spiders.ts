/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"

$(function () {

    var points=[];
    
    
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


