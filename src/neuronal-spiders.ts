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
        spider.animate(points);
        for (var i in points) {
            spider.shiftPoint(points[i]);
        }
    }



});


