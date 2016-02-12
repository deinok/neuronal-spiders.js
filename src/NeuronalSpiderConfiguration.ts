"use strict"

/**
 * Represents the Configuration of a Neuronal Spider
 */
class NeuronalSpiderConfiguration {

    public enabled: boolean = true;
    public targetElement: HTMLElement;
    public numberPoints: number = 400;
    public numberLines: number = 5;
    public visualRadius: number = 40000;
    public circleRadius: number = 2;
    public circleColor: Color=Color.FromHex("#000000");
    public linesColor: Color = Color.FromHex("#000000");

    public constructor(enabled:boolean) {
        this.enabled = enabled;
    }

    public static createNeuronalSpiderConfiguration(targetElement: HTMLElement, numberPoints: number, numberLines: number, visualRadius: number,circleRadius:number, circleColor: Color, linesColor: Color):NeuronalSpiderConfiguration {
        var configuration= new NeuronalSpiderConfiguration(true);
        configuration.targetElement = targetElement;
        configuration.numberPoints = numberPoints;
        configuration.numberLines = numberLines;
        configuration.visualRadius = visualRadius;
        configuration.circleRadius = circleRadius;
        configuration.circleColor = circleColor;
        configuration.linesColor = linesColor;
        return configuration;
    }

    public static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration {
        if (htmlElement.dataset['neuronal']=="enabled") {
            var result = new NeuronalSpiderConfiguration(true);

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
        return new NeuronalSpiderConfiguration(false);
    }

    public static searchNeuronalSpiderElements(): NodeListOf<Element> {
        try {
            return document.querySelectorAll('[data-neuronal="enabled"]');
        } catch (Exception){
            return null;
        }
    }
}