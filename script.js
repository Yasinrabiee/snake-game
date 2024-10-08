function random(min, max) {
	return Math.floor(Math.random()*(max-min+1)) + min;
}

const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
const canvasWidth = document.querySelector(`#canvas`).offsetWidth;
let scale = 10;

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xSpeed = scale;
	this.ySpeed = 0;
	this.snakeDraw = function() {
		ctx.fillStyle = `#FFF`;
		ctx.fillRect(this.x , this.y, scale, scale);
	}
	this.updateLocation = function() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if(this.x > canvasWidth)
			this.x = 0;
	}
}

let snake = new Snake();

setInterval(function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	snake.snakeDraw();
	snake.updateLocation();
},150);