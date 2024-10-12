function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const colors = [
// 	`lightgreen`,
// 	`lightred`,
// 	`lightblue`,
// 	`hotpink`
// ];

const scale = 10;
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
	this.total = 0;
	this.tail = [];

	this.snakeDraw = function() {
		
		this.x += this.xSpeed;
		this.y += this.ySpeed;

		ctx.fillStyle = `lightgreen`;
		for(let i = 0; i < this.tail.length; i++) {
		    ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
	    }
	    ctx.fillStyle = `white`;
	    ctx.fillRect(this.x , this.y, scale, scale);

		for(let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}

		this.tail[this.total - 1] = {x: this.x, y: this.y}

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
		if(this.x === food.xFood && this.y === food.yFood) {
			this.total++;
			return true;
		}
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

document.querySelector(`#up`).addEventListener('click', function(event) {
	snake.updateDirection(`Up`);	
});

document.querySelector(`#left`).addEventListener('click', function(event) {
	snake.updateDirection(`Left`);
});

document.querySelector(`#right`).addEventListener('click', function(event) {
	snake.updateDirection(`Right`);
});

document.querySelector(`#down`).addEventListener('click', function(event) {
	snake.updateDirection(`Down`);
});