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
		this.x = canvas.width / 2;
		this.y = canvas.height - 30;
		this.dx = 2;
		this.dy = -2;
		this.ballRadius = 5;
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