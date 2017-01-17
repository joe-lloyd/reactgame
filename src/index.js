import 'babel-polyfill';
import Ball from './ball';
import Paddle from './paddle';

document.addEventListener("DOMContentLoaded",() => {
	let canvas = document.getElementById('game');
	let ctx = canvas.getContext('2d');

	let paddle = new Paddle(ctx, canvas);
	let ball = new Ball(ctx, canvas, paddle);

	setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ball.draw();
		paddle.draw();
	}, 10);
});
