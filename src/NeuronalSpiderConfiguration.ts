"use strict";

/**
 * Represents the Configuration of a Neuronal Spider
 */
class NeuronalSpiderConfiguration {

    public targetElement: HTMLElement;
    public enabled: boolean = true;
    public numberPoints: number = 400;
    public numberLines: number = 5;
    public visualRadius: number = 40000;
    public maximumOpacity: number = 0.6;
    public circleRadius: number = 2;
    public circleColor: Color=Color.FromHex("#000000");
    public linesColor: Color = Color.FromHex("#000000");

    public constructor(htmlElement: HTMLElement, enabled: boolean) {
        this.targetElement = htmlElement;
        this.enabled = enabled;
    }

    /**
     * Return a NeuronaSpiderConfiguration of the given NeuronalSpiderConfiguration
     * @param htmlElement
     */
    public static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration {
        if (htmlElement.dataset['neuronal']=="true") {
            var result:NeuronalSpiderConfiguration = new NeuronalSpiderConfiguration(htmlElement,true);

            var numberPoints:string = htmlElement.dataset['numberPoints'];
            if (numberPoints != null) {
                result.numberPoints = parseInt(numberPoints);
            }

            var numberLines:string = htmlElement.dataset['numberLines'];
            if (numberLines != null) {
                result.numberLines = parseInt(numberLines);
            }

            var visualRadius:string = htmlElement.dataset['visualRadius'];
            if (visualRadius != null) {
                result.visualRadius = parseInt(visualRadius);
            }
            
            var maximumOpacity:string = htmlElement.dataset['maximumOpacity'];
            if (maximumOpacity != null){
                result.maximumOpacity = parseInt(maximumOpacity);
            }

            var circleRadius:string = htmlElement.dataset['circleRadius'];
            if (circleRadius != null) {
                result.circleRadius = parseInt(circleRadius);
            }

            var color:string = htmlElement.dataset['color'];
            if (color != null) {
                var generalColor:Color = Color.FromHex(color);
                result.circleColor = generalColor;
                result.linesColor = generalColor;
            }

            var circleColor = htmlElement.dataset['circlesColor'];
            if (circleColor != null) {
                result.circleColor = Color.FromHex(circleColor);
            }

            var linesColor:string = htmlElement.dataset['linesColor'];
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
            var nodeList:NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll('[data-neuronal]');
            return Array.prototype.slice.call(nodeList);
        } catch (Exception){
            return null;
        }
    }
}