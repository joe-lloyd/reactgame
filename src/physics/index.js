/**
 * @class Physics
 *
 * @description
 * This is the physics engine responsible for the way elements interact with one another
 *
 * @example
 * let physics = new Physics(ctx, canvas, paddle, ball, blocks)
 *
 */
export default class Physics {

	/**
	 * @constructor
	 *
	 * @param ctx
	 * @param canvas
	 * @param paddle
	 * @param ball
	 * @param layout
	 */
	constructor (canvas, ctx, paddle, ball, layout) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.paddle = paddle;
		this.ball = ball;
		this.layout = layout;
		console.log(this.layout);
	}

	/**
	 * @description
	 * Draws the position of the elements
	 *
	 */
	draw () {
		this.layout.draw();
		this.collisionDetection();
		this.paddle.drawPaddle();
		this.ball.move();
	}

	/**
	 * @description
	 * Detects when the ball is out of bounds or in a collision.
	 *
	 */
	collisionDetection () {
		this.checkBlockHits();
		if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.ballRadius || this.ball.x + this.ball.dx < this.ball.ballRadius) {
			this.ball.hitSideX();
		}
		if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
			this.ball.hitSideY();
		} else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.ballRadius) {
			if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth) {
				this.ball.hitSideY();
				this.paddle.paddleHit();
			} else {
				document.location.reload();
			}
		}
	}

	checkBlockHits () {
		for (let [index, brick] of this.layout.bricks.entries()) {

			if (brick && this.ball.x > brick.blockX && this.ball.x < brick.blockX + brick.width && this.ball.y > brick.blockY && this.ball.y < brick.blockY + brick.height) {
				if (this.ball.y >=  brick.blockY && this.ball.y <=  brick.blockY + this.ball.dy || this.ball.y >=  brick.blockY + brick.height && this.ball.y <=  brick.blockY + this.ball.dy + brick.height) {
					this.ball.hitSideY();
				}
				if (this.ball.x >=  brick.blockX && this.ball.x <=  brick.blockX + this.ball.dx || this.ball.x >=  brick.blockX + brick.width && this.ball.x <=  brick.blockX + this.ball.dx + brick.width) {
					this.ball.hitSideX();
				}
				brick.hit();
				delete this.layout.bricks[index];
			}
		}
	}
}