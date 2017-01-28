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
		this.width = canvas.width / 20;
		this.height = canvas.height / 20;
	}

	/**
	 * @description
	 * draws teh brick on teh canvas
	 *
	 */
	draw () {
		this.ctx.beginPath();
		this.ctx.rect(this.blockX, this.blockY, this.width, this.height);
		this.ctx.fillStyle = "#0f5bdd";
		this.ctx.strokeStyle = "#123bdd";
		this.ctx.lineWidth="6";
		this.ctx.fill();
		this.ctx.stroke();
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