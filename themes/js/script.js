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
				if(localStorage.getItem(`record`) === null) {
					localStorage.setItem(`record`, this.total);
				}
				else {
					if(this.total > localStorage.getItem(`record`))
						localStorage.setItem(`record`, this.total);	
				}
				document.querySelector(`#total-english`).innerHTML = this.total;
				document.querySelector(`#total-persian`).innerHTML = this.total;
				document.querySelector(`#record`).innerHTML = localStorage.getItem(`record`);
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

span.addEventListener(`click`, function() {
	modalContent.style.top = `-275px`;
	window.location = ``;
});