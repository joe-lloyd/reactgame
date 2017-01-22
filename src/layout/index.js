import Brick from '../brick';
/**
 * @class Layout
 *
 * @description
 * Builds the brick layout for the level
 *
 */
export default class Layout {

	constructor (canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.bricks = [];
		this.init();
	}

	/**
	 * @description
	 * initialize the layout
	 *
	 */
	init () {
		let loops = 20;
		let n = 1;
		let y;
		let x;

		while (n <= loops) {
			if (n <= 10) { y = this.canvas.height / 10}
			else if (n <= 20) { y = (this.canvas.height / 10) * 2}

			x = ((n % 10) * this.canvas.width / 10) + 25 / 2;

			let brick = new Brick(this.canvas, this.ctx, x, y);
			this.bricks.push(brick);
			n++;
		}
	}

	/**
	 * @description
	 * draw each block
	 */
	draw () {
		for (let [index, value] of this.bricks.entries()) {
			if (value) {
				value.draw();
			}
		}
	}
}