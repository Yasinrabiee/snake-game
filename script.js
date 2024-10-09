function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
const canvasWidth = document.querySelector(`#canvas`).offsetWidth;
const canvasHeight = document.querySelector(`#canvas`).offsetHeight;
let scale = 10;

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xSpeed = scale;
	this.ySpeed = 0;

	this.snakeDraw = function() {
		ctx.fillStyle = `#FFF`;
		ctx.fillRect(this.x , this.y, scale, scale);
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if(this.x > canvasWidth)
			this.x = 0;
		else if(this.x < 0)
		 	this.x = canvasWidth;
		else if(this.y > canvasHeight)
		 	this.y = 0;
		else if(this.y < 0)
			this.y = canvasHeight;
	}

	// this.updateLocation = function() {
	// 	this.x += this.xSpeed;
	// 	this.y += this.ySpeed;
	// 	if(this.x > canvasWidth)
	// 		this.x = 0;
	// }

	this.updateDirection = function(userDirection) {
		switch(userDirection)
		{
			case 'Up':
			{
				this.xSpeed = 0;
				this.ySpeed = -scale;
				break;
			}
			case 'Down': 
			{
				this.xSpeed = 0;
				this.ySpeed = scale;
				break;
			}
			case 'Left': 
			{
				this.xSpeed = -scale;
				this.ySpeed = 0;
				break;
			}
			case 'Right': 
			{
				this.xSpeed = scale;
				this.ySpeed = 0;
				break;
			}
		}
	}
}

const snake = new Snake();

setInterval(function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	snake.snakeDraw();
},150);

window.addEventListener(`keydown`, function(event) {
	const userDirection = event.key.replace(`Arrow`, ``);
	snake.updateDirection(userDirection);
});