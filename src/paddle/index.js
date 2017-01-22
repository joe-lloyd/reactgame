/**
 * @class Paddle
 *
 * @description
 * This created and moves the paddle
 *
 * @example
 * let paddle = new Paddle(canvas, ctx);
 */
export default class Paddle {

	/**
	 * @constructor
	 *
	 * @param canvas
	 * @param ctx
	 */
	constructor (canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.paddleHeight = 10;
		this.paddleWidth = 75;
		this.paddleX = (canvas.width - this.paddleWidth) / 2;

		this.boundingRect = canvas.getBoundingClientRect();

		document.addEventListener('mousemove', (event) => this.mouseMoveHandler(event), false);
	}

	/**
	 * @description
	 * Draws the paddle in position
	 *
	 */
	drawPaddle () {
		this.ctx.beginPath();
		this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}

	/**
	 * @description
	 * Action for when the paddle is hit
	 *
	 */
	paddleHit () {
		console.log('hit!');
	}

	/**
	 * @description
	 * Allows the paddle to change its position based on the mouse move event
	 *
	 * @param event
	 */
	mouseMoveHandler (event) {
		this.paddleX = event.clientX - this.boundingRect.left;
	}
}