/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"
$(function () {
    var neuronalElements = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
    for (var i in neuronalElements) {
        var configuration = NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
        var spider = new NeuronalSpider(configuration);
        spider.initialize();
    }
});


