/*Requereix TweenMax (script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>)*/
namespace NeuronalSpiders {
	"use strict";

	window.onload = function () {
		execute();
	};

	function execute():void {
		var neuronalElements:HTMLElement[] = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
		var neuronalSpiders:NeuronalSpider[] = new Array<NeuronalSpider>(neuronalElements.length);
		for (var i in neuronalElements) {
			var configuration:NeuronalSpiderConfiguration = NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
			neuronalSpiders[i] = new NeuronalSpider(configuration);
			neuronalSpiders[i].initialize();
		}
	}
}
