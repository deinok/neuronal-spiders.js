import {Color} from "./Color";

/**
 * Represents the Configuration of a Neuronal Spider
 */
export class NeuronalSpiderConfiguration {

	/**
	 * Return a NeuronaSpiderConfiguration of the given NeuronalSpiderConfiguration
	 * @param htmlElement
	 */
	public static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration {
		if (htmlElement.dataset.neuronal == "true") {
			let result: NeuronalSpiderConfiguration = new NeuronalSpiderConfiguration(htmlElement, true);

			let numberPoints: string = htmlElement.dataset.numberPoints;
			if (numberPoints != null) {
				result.numberPoints = parseInt(numberPoints);
			}

			let numberLines: string = htmlElement.dataset.numberLines;
			if (numberLines != null) {
				result.numberLines = parseInt(numberLines);
			}

			let visualRadius: string = htmlElement.dataset.visualRadius;
			if (visualRadius != null) {
				result.visualRadius = parseInt(visualRadius);
			}

			let maximumOpacity: string = htmlElement.dataset.maximumOpacity;
			if (maximumOpacity != null) {
				result.maximumOpacity = parseInt(maximumOpacity);
			}

			let circleRadius: string = htmlElement.dataset.circleRadius;
			if (circleRadius != null) {
				result.circleRadius = parseInt(circleRadius);
			}

			let color: string = htmlElement.dataset.color;
			if (color != null) {
				let generalColor: Color = Color.FromHex(color);
				result.circleColor = generalColor;
				result.linesColor = generalColor;
			}

			let circleColor = htmlElement.dataset.circlesColor;
			if (circleColor != null) {
				result.circleColor = Color.FromHex(circleColor);
			}

			let linesColor: string = htmlElement.dataset.linesColor;
			if (linesColor != null) {
				result.linesColor = Color.FromHex(linesColor);
			}

			return result;
		}
		return new NeuronalSpiderConfiguration(htmlElement, false);
	}

	/**
	 * Search all data-neuronal=enabled and return its HTMLElement
	 */
	public static searchNeuronalSpiderElements(): HTMLElement[] {
		try {
			let nodeList: NodeListOf<HTMLElement> = document.querySelectorAll("[data-neuronal]") as NodeListOf<HTMLElement>;
			return Array.prototype.slice.call(nodeList);
		} catch (exception) {
			return null;
		}
	}

	public targetElement: HTMLElement;
	public enabled: boolean = true;
	public numberPoints: number = 400;
	public numberLines: number = 5;
	public visualRadius: number = 40000;
	public maximumOpacity: number = 0.6;
	public circleRadius: number = 2;
	public circleColor: Color = Color.FromHex("#000000");
	public linesColor: Color = Color.FromHex("#000000");

	public constructor(htmlElement: HTMLElement, enabled: boolean) {
		this.targetElement = htmlElement;
		this.enabled = enabled;
	}
}

