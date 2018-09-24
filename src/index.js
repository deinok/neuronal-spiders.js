import { NeuronalSpider } from "./NeuronalSpider";
import { NeuronalSpiderConfiguration } from "./NeuronalSpiderConfiguration";
window.onload = () => {
    execute();
};
function execute() {
    const neuronalElements = NeuronalSpiderConfiguration.searchNeuronalSpiderElements();
    const neuronalSpiders = new Array(neuronalElements.length);
    for (const i in neuronalElements) {
        const configuration = NeuronalSpiderConfiguration.readConfiguration(neuronalElements[i]);
        neuronalSpiders[i] = new NeuronalSpider(configuration);
        neuronalSpiders[i].initialize();
    }
}
//# sourceMappingURL=index.js.map