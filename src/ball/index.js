export default class Ball {

	constructor (ctx, canvas, paddle) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.paddle = paddle;
		this.x = canvas.width / 2;
		this.y = canvas.height - 30;
		this.dx = 2;
		this.dy = -2;
		this.ballRadius = 5;
	}

	draw () {
		this.drawBall();

		if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
			this.dx = -this.dx;
		}
		if (this.y + this.dy < this.ballRadius) {
			this.dy = -this.dy;
		} else if (this.y + this.dy > this.canvas.height - this.ballRadius) {
			if (this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.paddleWidth) {
				this.dy = -this.dy;
			} else {
				alert('GAME OVER');
				document.location.reload();
			}
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	drawBall () {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}

}