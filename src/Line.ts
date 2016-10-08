namespace NeuronalSpiders {

	"use strict";

	/**
	 * Represents a Line in Canvas
	 */
	export class Line {

		public point1:Point;
		public point2:IGeometricPoint;
		public color:Color;

		/**
		 * Creates a Line beetween two points
		 * @param point1 The first Point
		 * @param point2 The second Point
		 * @param color The Color
		 */
		constructor(point1:Point, point2:IGeometricPoint, color:Color) {
			this.point1 = point1;
			this.point2 = point2;
			this.color = color;
		}

		/**
		 * Draw a Line
		 * @param context The Canvas Context
		 */
		public draw(context:CanvasRenderingContext2D):void {
			context.beginPath();
			context.moveTo(this.point1.x, this.point1.y);
			context.lineTo(this.point2.x, this.point2.y);
			this.color.alpha = this.point1.activeOpacity;
			context.strokeStyle = this.color.toString();
			context.stroke();
		}

		/**
		 * Draws all Lines of a Point
		 * @param point The Point
		 * @param color The Color
		 * @param context The Canvas Context
		 */
		public static drawLines(point:Point, color:Color, context:CanvasRenderingContext2D):void {
			if (!point.isActive()) {
				return;
			}
			for (var i in point.closest) {
				var line = new Line(
					point,
					point.closest[i],
					color
				);
				line.draw(context);
			}
		}

	}
}
