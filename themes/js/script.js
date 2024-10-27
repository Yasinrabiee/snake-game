function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const scale = 12;
const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);
const canvasWidth = document.querySelector(`#canvas`).offsetWidth;
const canvasHeight = document.querySelector(`#canvas`).offsetHeight;
const modal = document.querySelector(`#myModal`);
const modalContent = document.querySelector(`.modal-content`);
const btn = document.querySelector(`#myBtn`);
const span = document.querySelector(`.close`);
const columns = canvasWidth /  scale;
const rows = canvasHeight / scale;

function En2Fa(value) {
	value = value.replace(/0/g, `۰`);
	value = value.replace(/1/g, `۱`);
	value = value.replace(/2/g, `۲`);
	value = value.replace(/3/g, `۳`);
	value = value.replace(/4/g, `۴`);
	value = value.replace(/5/g, `۵`);
	value = value.replace(/6/g, `۶`);
	value = value.replace(/7/g, `۷`);
	value = value.replace(/8/g, `۸`);
	value = value.replace(/9/g, `۹`);
	return value;
}

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

		ctx.fillStyle = `#43A047`;

		for(let i = 0; i < this.tail.length; i++) {
		    ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
	    }

	    ctx.fillStyle = `white`;
	    ctx.fillRect(this.x , this.y, scale, scale);
	    const previousPosition = { x: this.x, y: this.y};

	    for(let i = 0; i < this.tail.length - 1; i++)
	    	this.tail[i] = this.tail[i + 1];

	    if(this.total > 0) 
	    	this.tail[this.total - 1] = previousPosition;
		
		if(this.x > canvasWidth)
			this.x = 0;
		else if(this.x < 0)
		 	this.x = canvasWidth;
		else if(this.y > canvasHeight)
		 	this.y = 0;
		else if(this.y < 0)
			this.y = canvasHeight;

		for(let i = 0; i < this.tail.length - 1; i++) {
			if(this.tail[i].x === this.x && this.tail[i].y === this.y) {
				clearInterval(interval);
				document.querySelector(`#total-english`).innerHTML = this.total;
				document.querySelector(`#total-persian`).innerHTML = En2Fa(this.total);
				modalContent.style.top = `0px`;
			}
		}
	}

	this.updateDirection = function(userDirection) {
		switch(userDirection)
		{
			case 'up':
			{
				this.xSpeed = 0;
				this.ySpeed = -scale;
				break;
			}
			case 'down': 
			{
				this.xSpeed = 0;
				this.ySpeed = scale;
				break;
			}
			case 'left': 
			{
				this.xSpeed = -scale;
				this.ySpeed = 0;
				break;
			}
			case 'right': 
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

const interval = setInterval(function() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	food.foodDraw();
	snake.snakeDraw();
	if(snake.eatingFood(food))
		food.setRandomLocation();
},150);

window.addEventListener(`keydown`, function(event) {
	const userDirection = event.key.replace(`Arrow`, ``).toLowerCase();
	snake.updateDirection(userDirection);
});

document.querySelector(`#up`).addEventListener(`click`, function(event) {
	snake.updateDirection(`up`);	
});

document.querySelector(`#left`).addEventListener(`click`, function(event) {
	snake.updateDirection(`left`);
});

document.querySelector(`#right`).addEventListener(`click`, function(event) {
	snake.updateDirection(`right`);
});

document.querySelector(`#down`).addEventListener(`click`, function(event) {
	snake.updateDirection(`down`);
});

btn.onclick = function() {
	modalContent.style.top = `0`;
}

span.onclick = function() {
	modalContent.style.top = `-226px`;
	window.location = ``;
}