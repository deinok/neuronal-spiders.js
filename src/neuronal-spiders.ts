/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
/*Requereix JQUERY 1.9*/

"use strict"
window.onload = function () {
    execute();
}

function execute():void {
    var neuronalElements:HTMLElement[] = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
    var neuronalSpiders:NeuronalSpider[] = new Array<NeuronalSpider>(neuronalElements.length);
    for (var i in neuronalElements) {
        var configuration:NeuronalSpiderConfiguration = NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
        var spider: NeuronalSpider = new NeuronalSpider(configuration);
        neuronalSpiders[i] = spider;
        neuronalSpiders[i].initialize();
    }
}


