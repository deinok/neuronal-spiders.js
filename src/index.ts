import {NeuronalSpider} from "./NeuronalSpider";
import {NeuronalSpiderConfiguration} from "./NeuronalSpiderConfiguration";

window.onload = () => {
	execute();
};

function execute(): void {
	const neuronalElements: HTMLElement[] = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
	const neuronalSpiders: NeuronalSpider[] = new Array<NeuronalSpider>(neuronalElements.length);
	for (const i in neuronalElements) {
		const configuration: NeuronalSpiderConfiguration = NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
		neuronalSpiders[i] = new NeuronalSpider(configuration);
		neuronalSpiders[i].initialize();
	}
}
