/**
 * Represents a Circle
 */
declare class Circle {
    point: GeometricPoint;
    radius: number;
    color: Color;
    /**
     * Creates a Circle
     * @param point the GeometricPoint
     * @param radius the radius of the Circle
     * @param color the Color of the Circle
     */
    constructor(point: GeometricPoint, radius: number, color: Color);
    /**
     * Draw a Circle in the canvas
     * @param canvasContext The Canvas Context
     */
    draw(canvasContext: CanvasRenderingContext2D): void;
    /**
     * Gets the Opacity of its Colors
     */
    getOpacity(): number;
    /**
     * Checks if its opacity is not 0
     */
    isActive(): boolean;
}
/**
 * Represents a color as RGBA
 */
declare class Color {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    /**
     * Create a color from its RGBA form
     * @param red Red Index
     * @param green Green Index
     * @param blue Blue Index
     * @param alpha Alpha Index
     */
    constructor(red: number, green: number, blue: number, alpha: number);
    /**
     * Create a color from its HEX string (#012345)
     * @param hex The Hex string with sharp
     */
    static FromHex(hex: string): Color;
    /**
     * Converts te color to its Hex or RGBA String
     */
    toString(): string;
    /**
     * Converts the color to its HEX String
     */
    toHexString(): string;
    /**
     * Converts the color to its RGBA String
     */
    toRGBAString(): string;
    private componentToHex(component);
}
/**
 * Reprsents a Geometric Point
 */
interface GeometricPoint {
    x: number;
    y: number;
}
/**
 * Represents a Line in Canvas
 */
declare class Line {
    point1: Point;
    point2: GeometricPoint;
    color: Color;
    /**
     * Creates a Line beetween two points
     * @param point1 The first Point
     * @param point2 The second Point
     * @param color The Color
     */
    constructor(point1: Point, point2: GeometricPoint, color: Color);
    /**
     * Draw a Line
     * @param context The Canvas Context
     */
    draw(context: CanvasRenderingContext2D): void;
    /**
     * Draws all Lines of a Point
     * @param point The Point
     * @param color The Color
     * @param context The Canvas Context
     */
    static drawLines(point: Point, color: Color, context: CanvasRenderingContext2D): void;
}
declare function execute(): void;
declare class NeuronalSpider {
    configuration: NeuronalSpiderConfiguration;
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    points: Point[];
    targetMouse: GeometricPoint;
    animateHeader: boolean;
    constructor(configuration: NeuronalSpiderConfiguration);
    initialize(): void;
    interchangeBackground(): void;
    createCanvas(): void;
    initializeHeader(): void;
    initializePoints(): void;
    /**
     * Creates the Points
     */
    private createPoints();
    /**
     * Find the closestPoints
     */
    private findClosests();
    /**
     * Add Circles to every Point
     */
    private addCircles();
    /**
     * Adds Listeners
     */
    addListeners(): void;
    private onMouseMove(event);
    private onScrollCheck(event);
    private onResize(event);
    initAnimation(): void;
    private animate();
    private shiftPoint(target);
}
/**
 * Represents the Configuration of a Neuronal Spider
 */
declare class NeuronalSpiderConfiguration {
    targetElement: HTMLElement;
    enabled: boolean;
    numberPoints: number;
    numberLines: number;
    visualRadius: number;
    maximumOpacity: number;
    circleRadius: number;
    circleColor: Color;
    linesColor: Color;
    constructor(htmlElement: HTMLElement, enabled: boolean);
    /**
     * Return a NeuronaSpiderConfiguration of the given NeuronalSpiderConfiguration
     * @param htmlElement
     */
    static readConfiguration(htmlElement: HTMLElement): NeuronalSpiderConfiguration;
    /**
     * Search all data-neuronal=enabled and return its HTMLElement
     */
    static searchNeuronalSpiderElements(): HTMLElement[];
}
/**
 * Represents a Point in Canvas
 */
declare class Point implements GeometricPoint {
    x: number;
    y: number;
    originX: number;
    originY: number;
    activeOpacity: number;
    closest: Point[];
    circle: Circle;
    constructor(x: number, y: number);
    isActive(): boolean;
    addCircle(configuration: NeuronalSpiderConfiguration): void;
    static getAbsolutDistance(point1: GeometricPoint, point2: GeometricPoint): number;
    static getDistance(point1: GeometricPoint, point2: GeometricPoint): number;
    static findClosests(points: Point[], configuration: NeuronalSpiderConfiguration): Point[];
}
