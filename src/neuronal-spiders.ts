/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"

$(function () {

    
    
    
    // Main

    var spider = new NeuronalSpider();
    spider.initializeHeader();
    spider.createPoints();
    spider.findClosests(spider.points);
    spider.addCircles(spider.points);
    

    spider.initAnimation(spider.points);
    spider.addListeners();

    // animation




});


