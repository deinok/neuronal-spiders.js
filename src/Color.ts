namespace NeuronalSpiders {

	"use strict";

	/**
	 * Represents a color as RGBA
	 */
	export class Color {

		public red:number;
		public green:number;
		public blue:number;
		public alpha:number;

		/**
		 * Create a color from its RGBA form
		 * @param red Red Index
		 * @param green Green Index
		 * @param blue Blue Index
		 * @param alpha Alpha Index
		 */
		public constructor(red:number, green:number, blue:number, alpha:number) {
			if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || alpha < 0 || alpha > 1) {
				throw new RangeError("Out of range numbers");
			}
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = alpha;
		}

		/**
		 * Create a color from its HEX string (#012345)
		 * @param hex The Hex string with sharp
		 */
		public static FromHex(hex:string):Color {
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function (m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

			return result ? new Color(
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16),
				1
			) : null;
		}

		/**
		 * Converts te color to its Hex or RGBA String
		 */
		public toString():string {
			if (this.alpha == 1) {
				return this.toHexString();
			}
			return this.toRGBAString();
		}

		/**
		 * Converts the color to its HEX String
		 */
		public toHexString():string {
			return "#" + this.componentToHex(this.red) + this.componentToHex(this.green) + this.componentToHex(this.blue);
		}

		/**
		 * Converts the color to its RGBA String
		 */
		public toRGBAString():string {
			return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
		}

		private componentToHex(component:number):string {
			var hexComponent:string = component.toString(16);
			return hexComponent.length == 1 ? "0" + hexComponent : hexComponent;
		}
	}
}
