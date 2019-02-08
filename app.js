var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawTank() {
	ctx.beginPath();
	ctx.rect(20, 40, 50, 50);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}