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
		this.paddleHeight = canvas.height * 0.03;
		this.paddleWidth = canvas.width * 0.10;
		this.paddleX = (canvas.width - this.paddleWidth) / 2;
		this.paddleY = this.canvas.height - this.paddleHeight;

		this.boundingRect = canvas.getBoundingClientRect();

		document.addEventListener('mousemove', (event) => this.mouseMoveHandler(event), false);
		document.addEventListener("touchstart", (event) => this.handleTouchStart(event), false);
		document.addEventListener("touchend", (event) => this.handleTouchEnd(event), false);
		document.addEventListener("touchcancel", (event) => this.handleTouchCancel(event), false);
		document.addEventListener("touchmove", (event) => this.handleTouchMove(event), false);
	}

	/**
	 * @description
	 * Draws the paddle in position
	 *
	 */
	drawPaddle () {
		this.ctx.beginPath();
		this.ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.strokeStyle = "#00dd4a";
		this.ctx.lineWidth="6";
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	/**
	 * @description
	 * Action for when the paddle is hit
	 *
	 */
	paddleHit () {
		let no1 = this.getRandomArbitrary(0, 255);
		let no2 = this.getRandomArbitrary(0, 255);
		let no3 = this.getRandomArbitrary(0, 255);
		this.canvas.style.backgroundColor = `rgba(${no1}, ${no2}, ${no3}, 1)`;
	}

	/**
	 * @description
	 * Gets a random number between limits
	 *
	 * @param min
	 * @param max
	 * @returns {*}
	 */
	getRandomArbitrary (min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
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

	handleTouchStart (event) {
		this.paddleX = event.touches[0].clientX - this.boundingRect.left;
	}
	handleTouchEnd (event) {
		// this.paddleX = event.touches[0].clientX - this.boundingRect.left;
	}
	handleTouchCancel (event) {
		console.log(event);
	}
	handleTouchMove (event) {
		this.paddleX = event.touches[0].clientX - this.boundingRect.left;
	}
}