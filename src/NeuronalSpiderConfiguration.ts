"use strict"

/**
 * Represents the Configuration of a Neuronal Spider
 */
class NeuronalSpiderConfiguration {

    public targetElement: HTMLElement;
    public enabled: boolean = true;
    public numberPoints: number = 400;
    public numberLines: number = 5;
    public visualRadius: number = 40000;
    public circleRadius: number = 2;
    public circleColor: Color=Color.FromHex("#000000");
    public linesColor: Color = Color.FromHex("#000000");

    public constructor(htmlElement: HTMLElement, enabled: boolean) {
        this.targetElement = htmlElement;
        this.enabled = enabled;
    }

    /**
     * Return a NeuronaSpiderConfiguration oa the given NeuronalSpiderConfiguration
     * @param htmlElement
     */
    public static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration {
        if (htmlElement.dataset['neuronal']=="enabled") {
            var result = new NeuronalSpiderConfiguration(htmlElement,true);

            var numberPoints = htmlElement.dataset['numberPoints'];
            if (numberPoints != null) {
                result.numberPoints = parseInt( numberPoints);
            }

            var numberLines = htmlElement.dataset['numberLines'];
            if (numberLines != null) {
                result.numberLines = parseInt(numberLines);
            }

            var visualRadius = htmlElement.dataset['visualRadius'];
            if (visualRadius != null) {
                result.visualRadius = parseInt(visualRadius);
            }

            var circleRadius = htmlElement.dataset['circleRadius'];
            if (circleRadius != null) {
                result.circleRadius = parseInt(circleRadius);
            }

            var color = htmlElement.dataset['color'];
            if (color != null) {
                var generalColor = Color.FromHex(color);
                result.circleColor = generalColor;
                result.linesColor = generalColor;
            }

            var circleColor = htmlElement.dataset['circleColor'];
            if (circleColor != null) {
                result.circleColor = Color.FromHex(circleColor);
            }

            var linesColor = htmlElement.dataset['linesColor'];
            if (linesColor != null) {
                result.linesColor = Color.FromHex(linesColor);
            }

            return result;
        }
        return new NeuronalSpiderConfiguration(htmlElement,false);
    }

    /**
     * Search all data-neuronal=enabled and return its HTMLElement
     */
    public static searchNeuronalSpiderElements(): HTMLElement[] {
        try {
            var nodeList = <NodeListOf<HTMLElement>>document.querySelectorAll('[data-neuronal="enabled"]');
            return Array.prototype.slice.call(nodeList);
        } catch (Exception){
            return null;
        }
    }
}