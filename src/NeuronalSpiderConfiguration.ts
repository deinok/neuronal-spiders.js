"use strict"

/**
 * Represents the Configuration of a Neuronal Spider
 */
class NeuronalSpiderConfiguration {

    public enabled: boolean = true;
    public targetElement: HTMLElement;
    public numberPoints: number = 400;
    public numberLines: number = 5;
    public visualRadius: number;
    public circleColor: Color=Color.FromHex("#000000");
    public linesColor: Color = Color.FromHex("#000000");

    public constructor(enabled:boolean) {
        this.enabled = enabled;
    }

    public static createNeuronalSpiderConfiguration(targetElement: HTMLElement, numberPoints: number, numberLines: number, visualRadius: number, circleColor: Color, linesColor: Color):NeuronalSpiderConfiguration {
        var configuration= new NeuronalSpiderConfiguration(true);
        configuration.targetElement = targetElement;
        configuration.numberPoints = numberPoints;
        configuration.numberLines = numberLines;
        configuration.visualRadius = visualRadius;
        configuration.circleColor = circleColor;
        configuration.linesColor = linesColor;
        return configuration;
    }

    public static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration {
        if (htmlElement.dataset['enabled']) {
            var result = new NeuronalSpiderConfiguration(true);
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