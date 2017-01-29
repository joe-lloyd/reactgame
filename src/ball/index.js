/**
 * @class Ball
 *
 * @description
 * Creates a ball in the space and controls its
 * speed and direction
 *
 * @example
 * let ball = new Ball(canvas, ctx);
 *
 */
export default class Ball {

	/**
	 * @constructor
	 *
	 * @param canvas
	 * @param ctx
	 */
	constructor (canvas, ctx) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.state = 'static';
		this.x = canvas.width / 2;
		this.y = canvas.height * 0.9;
		this.dx = 0;
		this.dy = 0;
		this.ballRadius = canvas.width / 200 + canvas.height / 200;
	}

	/**
	 * @description
	 * When ball is in basic motion
	 */
	move () {
		this.drawBall();
		this.x += this.dx;
		this.y += this.dy;
	}

	releaseBall () {
		this.state = 'moving';
		this.dx = 2;
		this.dy = -4;
	}

	initBall (paddleX) {
		this.drawBall();
		this.x = paddleX;
	}

	/**
	 * @description
	 * when the ball hits the side reverse the direction
	 *
	 */
	hitSideX () {
		this.dx = -this.dx;
	}

	/**
	 * @description
	 * When the ball hits the top or the paddle this can revers the y direction
	 *
	 */
	hitSideY () {
		this.dy = -this.dy;
	}

	/**
	 * @description
	 * Changes the angle of the balls trajectory.
	 *
	 * @param refraction
	 */
	hitPaddleRefraction(refraction) {
		this.dx += refraction;
	}

	/**
	 * @description
	 * Draws a frame of the ball
	 *
	 */
	drawBall () {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}

}