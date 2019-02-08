n = 13, brickSize = undefined;

canvas = document.getElementById("Canvas");
pen = canvas.getContext("2d");
brickSize = canvas.width/n;

position = function(a,b){
	x=a;
	y=b;
}

brick = {
	x = position.x, y = position.y;

	draw: function(){
		pen.beginPath();
		pen.rect(x, y, brickSize, brickSize);
		pen.fll();
		pen.closePath();
	}
}

layout = {
	for (var i = 0; i < canvas.height; i=i+2*brickSize) {
		for(var j = 0; j < canvas.width; j=j+brickSize){
			position(i,j);
			brick.draw();
		}

	}
	
}

