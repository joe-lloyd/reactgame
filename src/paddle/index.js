export default class {


	constructor (ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.paddleHeight = 10;
		this.paddleWidth = 75;
		this.paddleX = (canvas.width - this.paddleWidth) / 2;

		this.rightPressed = false;
		this.leftPressed = false;

		this.boundingRect = canvas.getBoundingClientRect();

		document.addEventListener("keydown",(e) => this.keyDownHandler(e), false);
		document.addEventListener("keyup", (e) => this.keyUpHandler(e), false);
		document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e), false);
	}

	draw () {
		this.drawPaddle();

		if(this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
			this.paddleX += 7;
		}
		else if(this.leftPressed && this.paddleX > 0) {
			this.paddleX -= 7;
		}
	}

	keyDownHandler (e) {
		if(e.keyCode == 39) {
			this.rightPressed = true;
		}
		else if(e.keyCode == 37) {
			this.leftPressed = true;
		}
	}

	keyUpHandler (e) {
		if(e.keyCode == 39) {
			this.rightPressed = false;
		}
		else if(e.keyCode == 37) {
			this.leftPressed = false;
		}
	}

	mouseMoveHandler (e) {
		let newPosition = e.clientX - this.boundingRect.left;

		if(this.paddleX + newPosition > 0) {
			this.paddleX = newPosition;
		}
		if (this.paddleX < this.canvas.width - this.paddleWidth) {
			this.paddleX = newPosition;
		}
	}

	drawPaddle () {
		this.ctx.beginPath();
		this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
		this.ctx.fillStyle = "#0095DD";
		this.ctx.fill();
		this.ctx.closePath();
	}
}