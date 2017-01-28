webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _ball = __webpack_require__(299);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	var _paddle = __webpack_require__(300);
	
	var _paddle2 = _interopRequireDefault(_paddle);
	
	var _physics = __webpack_require__(301);
	
	var _physics2 = _interopRequireDefault(_physics);
	
	var _layout = __webpack_require__(302);
	
	var _layout2 = _interopRequireDefault(_layout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @description
	 * This will wait for the page to be fully loaded before initializing the canvas and game elements
	 * The the setInterval will draw the game frame by frame
	 *
	 */
	document.addEventListener("DOMContentLoaded", function () {
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext('2d');
	
		var layout = new _layout2.default(canvas, ctx);
		var paddle = new _paddle2.default(canvas, ctx);
		var ball = new _ball2.default(canvas, ctx);
		var physics = new _physics2.default(canvas, ctx, paddle, ball, layout);
	
		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			physics.draw();
			requestAnimationFrame(draw);
		}
	
		draw();
	});

/***/ },

/***/ 299:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var Ball = function () {
	
		/**
	  * @constructor
	  *
	  * @param canvas
	  * @param ctx
	  */
		function Ball(canvas, ctx) {
			_classCallCheck(this, Ball);
	
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
	
	
		_createClass(Ball, [{
			key: "move",
			value: function move() {
				this.drawBall();
				this.x += this.dx;
				this.y += this.dy;
			}
	
			/**
	   * @description
	   * when the ball hits the side reverse the direction
	   *
	   */
	
		}, {
			key: "hitSideX",
			value: function hitSideX() {
				this.dx = -this.dx;
			}
	
			/**
	   * @description
	   * When the ball hits the top or the paddle this can revers the y direction
	   *
	   */
	
		}, {
			key: "hitSideY",
			value: function hitSideY() {
				this.dy = -this.dy;
			}
		}, {
			key: "hitPaddleRefraction",
			value: function hitPaddleRefraction(refraction) {
				this.dx += refraction;
			}
	
			/**
	   * @description
	   * Draws a frame of the ball
	   *
	   */
	
		}, {
			key: "drawBall",
			value: function drawBall() {
				this.ctx.beginPath();
				this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
				this.ctx.fillStyle = "#0095DD";
				this.ctx.fill();
				this.ctx.closePath();
			}
		}]);
	
		return Ball;
	}();
	
	exports.default = Ball;

/***/ },

/***/ 300:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Paddle
	 *
	 * @description
	 * This created and moves the paddle
	 *
	 * @example
	 * let paddle = new Paddle(canvas, ctx);
	 */
	var Paddle = function () {
	
		/**
	  * @constructor
	  *
	  * @param canvas
	  * @param ctx
	  */
		function Paddle(canvas, ctx) {
			var _this = this;
	
			_classCallCheck(this, Paddle);
	
			this.canvas = canvas;
			this.ctx = ctx;
			this.paddleHeight = canvas.height * 0.03;
			this.paddleWidth = canvas.width * 0.10;
			this.paddleX = (canvas.width - this.paddleWidth) / 2;
	
			this.boundingRect = canvas.getBoundingClientRect();
	
			document.addEventListener('mousemove', function (event) {
				return _this.mouseMoveHandler(event);
			}, false);
		}
	
		/**
	  * @description
	  * Draws the paddle in position
	  *
	  */
	
	
		_createClass(Paddle, [{
			key: 'drawPaddle',
			value: function drawPaddle() {
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
	
		}, {
			key: 'paddleHit',
			value: function paddleHit() {
				console.log('hit!');
			}
	
			/**
	   * @description
	   * Allows the paddle to change its position based on the mouse move event
	   *
	   * @param event
	   */
	
		}, {
			key: 'mouseMoveHandler',
			value: function mouseMoveHandler(event) {
				this.paddleX = event.clientX - this.boundingRect.left;
			}
		}]);
	
		return Paddle;
	}();
	
	exports.default = Paddle;

/***/ },

/***/ 301:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var Physics = function () {
	
		/**
	  * @constructor
	  *
	  * @param ctx
	  * @param canvas
	  * @param paddle
	  * @param ball
	  * @param layout
	  */
		function Physics(canvas, ctx, paddle, ball, layout) {
			_classCallCheck(this, Physics);
	
			this.ctx = ctx;
			this.canvas = canvas;
			this.paddle = paddle;
			this.ball = ball;
			this.layout = layout;
		}
	
		/**
	  * @description
	  * Draws the position of the elements
	  *
	  */
	
	
		_createClass(Physics, [{
			key: "draw",
			value: function draw() {
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
	
		}, {
			key: "collisionDetection",
			value: function collisionDetection() {
				this.checkBlockHits();
				if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.ballRadius || this.ball.x + this.ball.dx < this.ball.ballRadius) {
					this.ball.hitSideX();
				}
				if (this.ball.y + this.ball.dy < this.ball.ballRadius) {
					this.ball.hitSideY();
				} else if (this.ball.y + this.ball.ballRadius + this.ball.dy > this.canvas.height - this.ball.ballRadius) {
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
	
		}, {
			key: "checkBlockHits",
			value: function checkBlockHits() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.layout.bricks.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    index = _step$value[0],
						    brick = _step$value[1];
	
						if (brick) {
							var xRange = this.ball.x >= brick.blockX && this.ball.x <= brick.blockX + brick.width;
							var yRange = this.ball.y >= brick.blockY && this.ball.y <= brick.blockY + brick.height;
	
							var hitBottom = this.ball.y - this.ball.ballRadius + this.ball.dy <= brick.blockY + brick.height;
							var hitTop = this.ball.y + this.ball.ballRadius + this.ball.dy >= brick.blockY;
							var hitRight = this.ball.x + this.ball.ballRadius + this.ball.dx >= brick.blockX;
							var hitLeft = this.ball.x - this.ball.ballRadius + this.ball.dx <= brick.blockX + brick.width;
	
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
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "calcRefraction",
			value: function calcRefraction() {
				var ballHitPos = this.ball.x - this.paddle.paddleX;
				var ballHitPercent = ballHitPos / this.paddle.paddleWidth * 100;
				var refraction = 0;
	
				if (ballHitPercent < 45) {
					refraction = -2 * (100 - ballHitPercent) / 100;
				} else if (ballHitPercent > 55) {
					refraction = 2 * ballHitPercent / 100;
				}
	
				this.ball.hitPaddleRefraction(refraction);
			}
		}]);
	
		return Physics;
	}();
	
	exports.default = Physics;

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _brick = __webpack_require__(303);
	
	var _brick2 = _interopRequireDefault(_brick);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Layout
	 *
	 * @description
	 * Builds the brick layout for the level
	 *
	 */
	var Layout = function () {
		function Layout(canvas, ctx) {
			_classCallCheck(this, Layout);
	
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
	
	
		_createClass(Layout, [{
			key: 'init',
			value: function init() {
				var layout = this.getLayout();
				var y = void 0;
				var x = void 0;
				var row = void 0;
				var pos = void 0;
				var standardWidth = this.canvas.width / 20;
				var standardHeight = this.canvas.height / 20;
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = layout.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    index = _step$value[0],
						    value = _step$value[1];
	
						row = Math.floor(index / 20);
						pos = index % 20;
						if (value === 1) {
							x = pos * standardWidth;
							y = row * standardHeight;
	
							var brick = new _brick2.default(this.canvas, this.ctx, x, y);
							this.bricks.push(brick);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
	
			/**
	   * @description
	   * Using an array of numbers we can set different layouts
	   *
	   * @returns {Array}
	   */
	
		}, {
			key: 'getLayout',
			value: function getLayout() {
				switch (this.getRandomArbitrary(0, 10)) {
					case 0:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 1:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 2:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 3:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 4:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 5:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 6:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 7:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 8:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
					case 9:
						{
							return [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0];
						}
				}
			}
		}, {
			key: 'getRandomArbitrary',
			value: function getRandomArbitrary(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
	
			/**
	   * @description
	   * draw each block
	   */
	
		}, {
			key: 'draw',
			value: function draw() {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;
	
				try {
					for (var _iterator2 = this.bricks.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    index = _step2$value[0],
						    value = _step2$value[1];
	
						if (value) {
							value.draw();
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}]);
	
		return Layout;
	}();
	
	exports.default = Layout;

/***/ },

/***/ 303:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class Brick
	 *
	 * @description
	 * builds a single brick.
	 *
	 * @example
	 * let brick = new Brick(canvas, ctx, 20, 20);
	 */
	var Brick = function () {
	
		/**
	  * @constructor
	  *
	  * @param canvas
	  * @param ctx
	  * @param x
	  * @param y
	  */
		function Brick(canvas, ctx, x, y) {
			_classCallCheck(this, Brick);
	
			this.canvas = canvas;
			this.ctx = ctx;
			this.blockX = x;
			this.blockY = y;
			this.width = canvas.width / 20;
			this.height = canvas.height / 20;
		}
	
		/**
	  * @description
	  * draws teh brick on teh canvas
	  *
	  */
	
	
		_createClass(Brick, [{
			key: "draw",
			value: function draw() {
				this.ctx.beginPath();
				this.ctx.rect(this.blockX, this.blockY, this.width, this.height);
				this.ctx.fillStyle = "#0f5bdd";
				this.ctx.strokeStyle = "#123bdd";
				this.ctx.lineWidth = "6";
				this.ctx.fill();
				this.ctx.stroke();
				this.ctx.closePath();
			}
	
			/**
	   * @description
	   * Method for when a brick is hit
	   *
	   */
	
		}, {
			key: "hit",
			value: function hit() {
				console.log('get hit');
			}
		}]);
	
		return Brick;
	}();
	
	exports.default = Brick;

/***/ }

});
//# sourceMappingURL=app.js.map