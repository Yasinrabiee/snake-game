function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let scale = 10;
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
const canvasWidth = document.querySelector(`#canvas`).offsetWidth;
const canvasHeight = document.querySelector(`#canvas`).offsetHeight;
const rows = canvasHeight / scale;
const columns = canvasWidth /  scale;

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

	this.eatingFood = function(food) {
		if(this.x === food.xFood && this.y === food.yFood)
			return true;
		return false;
	}
}

function dropFood() {
	this.xFood;
	this.yFood;

	this.setRandomLocation = function() {										
		this.xFood = (Math.floor(Math.random() * rows - 1) + 1) * scale;
		this.yFood = (Math.floor(Math.random() * columns - 1) + 1) * scale;
	}

	this.foodDraw = function() {
		ctx.fillStyle = `red`;
		ctx.fillRect(this.xFood, this.yFood, scale, scale);
	}
}

const snake = new Snake();
const food = new dropFood();
food.setRandomLocation();

setInterval(function() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	food.foodDraw();
	snake.snakeDraw();
	if(snake.eatingFood(food))
		food.setRandomLocation();
},150);

window.addEventListener(`keydown`, function(event) {
	const userDirection = event.key.replace(`Arrow`, ``);
	snake.updateDirection(userDirection);
});