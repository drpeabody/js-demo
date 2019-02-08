var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var tankHeight = 50;
var tankWidth = 50;
var tankX = 0;
var tankY = 0;

function drawTank() {
	ctx.beginPath();
	ctx.rect(tankX, tankY, tankWidth, tankHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawTank();

	if(rightPressed && tankX < canvas.width-tankWidth) {
	    tankX += 5;
	}
	else if(leftPressed && tankX > 0) {
	    tankX -= 5;
	}
	else if(upPressed && tankY > 0) {
	    tankY -= 5;
	}
	else if(downPressed && tankY < canvas.height-tankHeight) {
	    tankY += 5;
	}

	requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {  //key pressed
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }

    else if(e.key == "Up" || e.key == "ArrowUp") {
    	upPressed = true;
    }

    else if(e.key == "Down" || e.key == "ArrowDown") {
    	downPressed = true;
    }
}

function keyUpHandler(e) {   //key not pressed
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }

    else if(e.key == "Up" || e.key == "ArrowUp") {
    	upPressed = false;
    }

    else if(e.key == "Down" || e.key == "ArrowDown") {
    	downPressed = false;
    }
}

draw();

