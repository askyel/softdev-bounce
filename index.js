console.log("js present");

var screen = document.getElementById("screen");
var addBut = document.getElementById("add");
var startBut = document.getElementById("start");
var stopBut = document.getElementById("stop");

var screenWidth = 800;
var screenHeight = 500;

// Ball class
var Ball = function(rad, x, y, xVel, yVel, color) {
	this.shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	this.r = rad;
	this.x = x;
	this.y = y;
	this.xVel = xVel;
	this.yVel = yVel;

	this.shape.setAttribute("r", this.r);
	this.shape.setAttribute("cx", this.x);
	this.shape.setAttribute("cy", this.y);
	this.shape.setAttribute("fill", color);

	screen.appendChild(this.shape);

	this.move = function() {
		// check x boundaries
		if (this.x - this.r <= 1 || this.x + this.r >= screenWidth)
			this.xVel *= -1;

		// check y boundaries
		if (this.y - this.r <= 1 || this.y + this.r >= screenHeight)
			this.yVel *= -1;

		// move Ball
		this.x += this.xVel
		this.y += this.yVel
		this.shape.setAttribute("cx", this.x);
		this.shape.setAttribute("cy", this.y);
	};

	this.checkCollision = function(other) {
		var dx = Math.abs(this.x - other.x);
		var dy = Math.abs(this.y - other.y);
		var d = Math.sqrt(dx*dx + dy*dy);

		if (d <= this.r + other.r)
			return true;
		else
			return false;
	};

	this.collide = function(other) {
		this.xVel *= -1;
		this.yVel *= -1;
		other.xVel *= -1;
		other.yVel *= -1;
	};
};

var balls = [];

var newBall = function() {
	var r, x, y, xVel, yVel, color;

	r = 50;
	x = screenWidth/2;
	y = screenWidth/2;
	xVel = (Math.random() * 5 + 5) * Math.pow(-1, Math.floor(Math.random()*2));
	yVel = (Math.random() * 5 + 5) * Math.pow(-1, Math.floor(Math.random()*2));
	color = "pink";
	
	balls.push(new Ball(r, x, y, xVel, yVel, color));
};

var requestId;

var startBalls = function() {
	var i, j;

	balls = balls.map( function(ball) {
		ball.move();
		return ball;
    });

	for (i = 0; i < balls.length; i++) {
		for (j = i+1; j < balls.length; j++) {
				if (balls[i].checkCollision(balls[j]))
					balls[i].collide(balls[j]);
		}
	}
	requestId = window.requestAnimationFrame(startBalls);
};

var stopBalls = function() {
	window.cancelAnimationFrame(requestId);
};

addBut.addEventListener("click", newBall);
startBut.addEventListener("click", startBalls);
stopBut.addEventListener("click", stopBalls);
