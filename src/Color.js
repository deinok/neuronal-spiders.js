/**
 * Represents a color as RGBA
 */
export class Color {
    /**
     * Create a color from its HEX string (#012345)
     * @param hex The Hex string with sharp
     */
    static FromHex(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1) : null;
    }
    /**
     * Create a color from its RGBA form
     * @param red Red Index
     * @param green Green Index
     * @param blue Blue Index
     * @param alpha Alpha Index
     */
    constructor(red, green, blue, alpha) {
        if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255 || alpha < 0 || alpha > 1) {
            throw new RangeError("Out of range numbers");
        }
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    /**
     * Converts te color to its Hex or RGBA String
     */
    toString() {
        if (this.alpha === 1) {
            return this.toHexString();
        }
        return this.toRGBAString();
    }
    /**
     * Converts the color to its HEX String
     */
    toHexString() {
        return "#" + this.componentToHex(this.red) + this.componentToHex(this.green) + this.componentToHex(this.blue);
    }
    /**
     * Converts the color to its RGBA String
     */
    toRGBAString() {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }
    componentToHex(component) {
        const hexComponent = component.toString(16);
        return hexComponent.length === 1 ? "0" + hexComponent : hexComponent;
    }
}
//# sourceMappingURL=Color.js.map