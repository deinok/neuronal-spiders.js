import { Color } from "./Color";
export class NeuronalSpiderConfiguration {
    constructor(htmlElement, enabled) {
        this.enabled = true;
        this.numberPoints = 400;
        this.numberLines = 5;
        this.visualRadius = 40000;
        this.maximumOpacity = 0.6;
        this.circleRadius = 2;
        this.circleColor = Color.FromHex("#000000");
        this.linesColor = Color.FromHex("#000000");
        this.targetElement = htmlElement;
        this.enabled = enabled;
    }
    static readConfiguration(htmlElement) {
        if (htmlElement.dataset.neuronal == "true") {
            let result = new NeuronalSpiderConfiguration(htmlElement, true);
            let numberPoints = htmlElement.dataset.numberPoints;
            if (numberPoints != null) {
                result.numberPoints = parseInt(numberPoints);
            }
            let numberLines = htmlElement.dataset.numberLines;
            if (numberLines != null) {
                result.numberLines = parseInt(numberLines);
            }
            let visualRadius = htmlElement.dataset.visualRadius;
            if (visualRadius != null) {
                result.visualRadius = parseInt(visualRadius);
            }
            let maximumOpacity = htmlElement.dataset.maximumOpacity;
            if (maximumOpacity != null) {
                result.maximumOpacity = parseInt(maximumOpacity);
            }
            let circleRadius = htmlElement.dataset.circleRadius;
            if (circleRadius != null) {
                result.circleRadius = parseInt(circleRadius);
            }
            let color = htmlElement.dataset.color;
            if (color != null) {
                let generalColor = Color.FromHex(color);
                result.circleColor = generalColor;
                result.linesColor = generalColor;
            }
            let circleColor = htmlElement.dataset.circlesColor;
            if (circleColor != null) {
                result.circleColor = Color.FromHex(circleColor);
            }
            let linesColor = htmlElement.dataset.linesColor;
            if (linesColor != null) {
                result.linesColor = Color.FromHex(linesColor);
            }
            return result;
        }
        return new NeuronalSpiderConfiguration(htmlElement, false);
    }
    static searchNeuronalSpiderElements() {
        try {
            let nodeList = document.querySelectorAll("[data-neuronal]");
            return Array.prototype.slice.call(nodeList);
        }
        catch (exception) {
            return null;
        }
    }
}
//# sourceMappingURL=NeuronalSpiderConfiguration.js.map