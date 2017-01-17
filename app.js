webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _ball = __webpack_require__(299);
	
	var _ball2 = _interopRequireDefault(_ball);
	
	var _paddle = __webpack_require__(300);
	
	var _paddle2 = _interopRequireDefault(_paddle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext('2d');
	
		var paddle = new _paddle2.default(ctx, canvas);
		var ball = new _ball2.default(ctx, canvas, paddle);
	
		setInterval(function () {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ball.draw();
			paddle.draw();
		}, 10);
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
	
	var Ball = function () {
		function Ball(ctx, canvas, paddle) {
			_classCallCheck(this, Ball);
	
			this.ctx = ctx;
			this.canvas = canvas;
			this.paddle = paddle;
			this.x = canvas.width / 2;
			this.y = canvas.height - 30;
			this.dx = 2;
			this.dy = -2;
			this.ballRadius = 5;
		}
	
		_createClass(Ball, [{
			key: "draw",
			value: function draw() {
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
		function _class(ctx, canvas) {
			var _this = this;
	
			_classCallCheck(this, _class);
	
			this.ctx = ctx;
			this.canvas = canvas;
			this.paddleHeight = 10;
			this.paddleWidth = 75;
			this.paddleX = (canvas.width - this.paddleWidth) / 2;
	
			this.rightPressed = false;
			this.leftPressed = false;
	
			this.boundingRect = canvas.getBoundingClientRect();
	
			document.addEventListener("keydown", function (e) {
				return _this.keyDownHandler(e);
			}, false);
			document.addEventListener("keyup", function (e) {
				return _this.keyUpHandler(e);
			}, false);
			document.addEventListener('mousemove', function (e) {
				return _this.mouseMoveHandler(e);
			}, false);
		}
	
		_createClass(_class, [{
			key: "draw",
			value: function draw() {
				this.drawPaddle();
	
				if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
					this.paddleX += 7;
				} else if (this.leftPressed && this.paddleX > 0) {
					this.paddleX -= 7;
				}
			}
		}, {
			key: "keyDownHandler",
			value: function keyDownHandler(e) {
				if (e.keyCode == 39) {
					this.rightPressed = true;
				} else if (e.keyCode == 37) {
					this.leftPressed = true;
				}
			}
		}, {
			key: "keyUpHandler",
			value: function keyUpHandler(e) {
				if (e.keyCode == 39) {
					this.rightPressed = false;
				} else if (e.keyCode == 37) {
					this.leftPressed = false;
				}
			}
		}, {
			key: "mouseMoveHandler",
			value: function mouseMoveHandler(e) {
				var newPosition = e.clientX - this.boundingRect.left;
	
				if (this.paddleX + newPosition > 0) {
					this.paddleX = newPosition;
				}
				if (this.paddleX < this.canvas.width - this.paddleWidth) {
					this.paddleX = newPosition;
				}
			}
		}, {
			key: "drawPaddle",
			value: function drawPaddle() {
				this.ctx.beginPath();
				this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
				this.ctx.fillStyle = "#0095DD";
				this.ctx.fill();
				this.ctx.closePath();
			}
		}]);

		return _class;
	}();

	exports.default = _class;

/***/ }

});
//# sourceMappingURL=app.js.map