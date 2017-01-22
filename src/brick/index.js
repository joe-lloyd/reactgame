/**
 * @class Brick
 *
 * @description
 * builds a single brick.
 *
 * @example
 * let brick = new Brick(canvas, ctx, 20, 20);
 */
export default class Brick {

	/**
	 * @constructor
	 *
	 * @param canvas
	 * @param ctx
	 * @param x
	 * @param y
	 */
	constructor (canvas, ctx, x, y) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.blockX = x;
		this.blockY = y;
		this.width = 25;
		this.height = 10;
	}

	/**
	 * @description
	 * draws teh brick on teh canvas
	 *
	 */
	draw () {
		this.ctx.beginPath();
		this.ctx.rect(this.blockX, this.blockY, this.width, this.height);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}

	/**
	 * @description
	 * Method for when a brick is hit
	 *
	 */
	hit () {
		console.log('get hit');
	}
}