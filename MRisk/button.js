
class Button {
	constructor(name, x, y, w, h) {
		assert(name, NotEmpty, 'Name of a button cannot be Empty');
		assert(isNaN(x), false, 'x has to be a number');
		assert(isNaN(y), false, 'y has to be a number');
		assert(isNaN(w), false, 'w has to be a number');
		assert(isNaN(h), false, 'h has to be a number');
		final(this, 'x', Math.floor(x));
		final(this, 'y', Math.floor(y));
		final(this, 'w', Math.floor(w));
		final(this, 'h', Math.floor(h));
		final(this, 'name', name);
	}

	draw(ctx) {
		ctx.fillStyle = "#ff0";
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = "#000";
		let g = ctx.measureText(this.name);
		ctx.fillText(this.name, this.x + this.w/2 - g.width/2, this.y + this.h/1.5);
	}

	contains(x, y){
		if(this.x < x && this.x + this.w > x){
			return (this.y < y && this.y + this.h > y);
		}
		return false;
	}
}