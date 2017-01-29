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
		document.addEventListener('click', (event) => this.handleClick(event), false);
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
		this.ballState();
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
		if (this.ball.y + this.ball.dy <= this.ball.ballRadius) {
			this.ball.hitSideY();
		} else if (this.ball.y + this.ball.ballRadius >= this.paddle.paddleY) {
			if (this.ball.x > this.paddle.paddleX && this.ball.x < this.paddle.paddleX + this.paddle.paddleWidth) {
				this.ball.hitSideY();
				this.paddle.paddleHit();
				this.calcRefraction();
			} else {
				document.location.reload();
			}
		}
	}

	/**
	 * @description
	 * Detects collisions between bricks
	 *
	 */
	checkBlockHits () {
		for (let [index, brick] of this.layout.bricks.entries()) {
			if (brick) {
				let xRange = this.ball.x >= brick.blockX && this.ball.x <= brick.blockX + brick.width;
				let yRange = this.ball.y >= brick.blockY && this.ball.y <= brick.blockY + brick.height;

				let hitBottom = this.ball.y - this.ball.ballRadius + this.ball.dy <= brick.blockY + brick.height;
				let hitTop = this.ball.y + this.ball.ballRadius + this.ball.dy >= brick.blockY;
				let hitRight = this.ball.x  + this.ball.ballRadius + this.ball.dx >= brick.blockX;
				let hitLeft = this.ball.x - this.ball.ballRadius + this.ball.dx <= brick.blockX + brick.width;

				if (hitBottom && xRange && hitTop) {
					this.ball.hitSideY();
					brick.hit();
					delete this.layout.bricks[index];
				} else if (hitLeft && yRange && hitRight) {
					this.ball.hitSideX();
					brick.hit();
					delete this.layout.bricks[index];
				}
			}
		}
	}

	/**
	 * @description
	 * Changes the X of the ball to make it bounce based on paddle hit
	 *
	 */
	calcRefraction () {
		let ballHitPos = this.ball.x - this.paddle.paddleX;
		let ballHitPercent = (ballHitPos / this.paddle.paddleWidth) * 100;
		let refraction = 0;

		if (ballHitPercent < 45) {
			refraction = -2 * (100 - ballHitPercent) / 100;
		} else if (ballHitPercent > 55) {
			refraction = 2 * ballHitPercent / 100;
		}

		this.ball.hitPaddleRefraction(refraction);
	}

	/**
	 * @description
	 * Checks the state of the ball to decide what movement mode it should be in
	 *
	 */
	ballState () {
		if (this.ball.state === 'static') {
			let ballsPosition = this.paddle.paddleX + this.paddle.paddleWidth / 2;
			this.ball.initBall(ballsPosition);
		} else {
			this.ball.move();
		}
	}

	/**
	 * @description
	 * Releases the ball if its in static mode
	 *
	 */
	handleClick () {
		if (this.ball.state === 'static') {
			this.ball.releaseBall();
			new Audio('./sound/run.mp3').play()
		}
	}
}