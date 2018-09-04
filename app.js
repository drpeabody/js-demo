
canvas = undefined, pen = undefined, n = 5, padding = 20, blockColor = "#DD95DD", blockSize = undefined;
blocks = new Array(n * (n - 1));
score = 0;

ball = {
	x: 20, y: 20, radius: 5, color: "#fff",	dx: 1, dy: 1, speed: 3,
	draw: function() {
		pen.beginPath();
		pen.fillStyle = this.color;
		pen.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		pen.fill();
		pen.closePath();
	},
	update: function() {
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
		if(this.y > canvas.height - this.radius || this.y < this.radius) this.dy *= -1;
		if(this.x > canvas.width - this.radius || this.x < this.radius) this.dx *= -1;

		if(this.x > bar.x && this.x < bar.x + bar.width){
			if(this.y + this.radius > bar.y && this.y - this.radius < bar.y + bar.height){
				this.dy *= -1;
			}
		}
		if(this.y + this.radius > canvas.height){
			alert('Game Over! Your Score: ' + score);
			onResize();
		}
	},
};

bar = {
	x: 0, y: 0, width: 100, height: 30, color: "#0095DD", speed: 10, leftKeyDown: false, rightKeyDown: false,
	draw: function() {
		pen.fillStyle = this.color;
		pen.fillRect(this.x, this.y, this.width, this.height);
	},
	update: function() {
		if(this.leftKeyDown && bar.x > 0) bar.x -= bar.speed;
		if(this.rightKeyDown && bar.x + bar.width < canvas.width) bar.x += bar.speed;
	}
};

onResize = () => { 
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth/2;
	canvas.height = window.innerHeight/2;
	ball.x = canvas.width / 10; 
	ball.y = canvas.height / 10; 
	ball.speed = 3;
	score = 0; blocks = new Array(n * (n - 1));
	pen = canvas.getContext("2d");
	bar.x = (canvas.width - bar.width)/2; 
	bar.y = canvas.height - bar.height;
	bar.rightKeyDown = false; bar.leftKeyDown = false;
	blockSize = 0.8 * Math.min(canvas.width, canvas.height) / n;
	padding = 0.2 * Math.min(canvas.width, canvas.height) / n;
	pen.font = canvas.height/10 + "px Georgia";
}

onKeyDown = (event) => {
	if(event.code === "ArrowRight") bar.rightKeyDown = true;
	if(event.code === "ArrowLeft") bar.leftKeyDown = true;
}
onKeyUp = (event) => {
	if(event.code === "ArrowRight") bar.rightKeyDown = false;
	if(event.code === "ArrowLeft") bar.leftKeyDown = false;
}

collidedWithBlockOfIndex = (idx) => {
	blocks[idx] = undefined;
	score++;
	ball.speed += 0.1;
}

updateAndDrawBlocks = () => {
	var v = Math.random();
	if(v < 1/(120)) blocks[Math.floor(v * 120 * blocks.length)] = true;
	
	pen.fillStyle = blockColor;
	for(var i = 0; i < n; i++){
		for(var j = 0; j < n; j++){
			if(blocks[i * n + j]){
				var x = j * canvas.width / n + padding;
				var y = i * canvas.height / n + padding;
				pen.fillRect(x, y, blockSize, blockSize);

				if(x < ball.x + ball.radius && x > ball.x - ball.radius || x + blockSize < ball.x + ball.radius && x + blockSize > ball.x - ball.radius){
					if(ball.y > y && ball.y < y + blockSize){
						ball.dx *= -1;
						collidedWithBlockOfIndex(i * n + j);
					}
				}
				if(y < ball.y + ball.radius && y > ball.y - ball.radius || y + blockSize < ball.y + ball.radius && y + blockSize > ball.y - ball.radius){
					if(ball.x > x && ball.x < x + blockSize){
						ball.dy *= -1;
						collidedWithBlockOfIndex(i * n + j);
					}
				}
			}
		}
	}
}

draw = () => {
	pen.fillStyle = "#000";
	pen.fillRect(0, 0, canvas.width, canvas.height);

	ball.update();
	bar.update();
	updateAndDrawBlocks();
	pen.fillText('Score: ' + score, canvas.width/10, canvas.height * 0.9);
	ball.draw();
	bar.draw();
}

onResize();
setInterval(draw, 1000/60);
