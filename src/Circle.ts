namespace NeuronalSpiders {

	"use strict";

	/**
	 * Represents a Circle
	 */
	export class Circle {

		public point:IGeometricPoint;
		public radius:number;
		public color:Color;

		/**
		 * Creates a Circle
		 * @param point the IGeometricPoint
		 * @param radius the radius of the Circle
		 * @param color the Color of the Circle
		 */
		constructor(point:IGeometricPoint, radius:number, color:Color) {
			this.point = point;
			this.radius = radius;
			this.color = color;
		}

		/**
		 * Draw a Circle in the canvas
		 * @param canvasContext The Canvas Context
		 */
		public draw(canvasContext:CanvasRenderingContext2D):void {
			if (!this.isActive()) {
				return;
			}
			canvasContext.beginPath();
			canvasContext.arc(
				this.point.x,
				this.point.y,
				this.radius,
				0,
				2 * Math.PI,
				false
			);
			canvasContext.fillStyle = this.color;
			canvasContext.fill();
		}

		/**
		 * Gets the Opacity of its Colors
		 */
		public getOpacity():number {
			return this.color.alpha;
		}

		/**
		 * Checks if its opacity is not 0
		 */
		public isActive():boolean {
			return this.getOpacity() != 0;
		}
	}
}
