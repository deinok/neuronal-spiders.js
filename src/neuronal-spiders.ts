/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"
$(function () {
    var a = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
    for (var i in a) {
        var spidertmp = NeuronalSpiderConfiguration.readConfiguration(<HTMLElement>a.item(i));
    }
    // Main
    var spider = new NeuronalSpider();
    spider.initializeHeader();
    spider.initializePoints();
    spider.initAnimation();
    spider.addListeners();
});


