const canvas = document.querySelector(`#canvas`);
const ctx = canvas.getContext(`2d`);

let position = 0;

setInterval(function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0 + position, 0, 10, 10);
	if(position > canvas.width)
		position = 0;
	position += 10;
},250);