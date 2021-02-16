
class Spinor {
	constructor() {
		this.s0 = new Complex(1, 0);
		this.s1 = new Complex(0, 0);
	}
	sum(spinor) {
		return new Spinor(this.s0.sum(spinor.s0), this.s1.sum(spinor.s1));
	}
	draw(ctx, Tx, Ty){
		let Ts0x = Tx(this.s0.x);
		let Ts0y = Ty(this.s0.y);
		let Ts1x = Tx(this.s1.x);
		let Ts1y = Ty(this.s1.y);
		var grad = ctx.createLinearGradient(Ts0x, Ts0y, Ts1x, Ts1y);
		grad.addColorStop(0, color_focus1);
		grad.addColorStop(1, color_focus2);
		ctx.strokeStyle = grad;
		ctx.beginPath();
		ctx.moveTo(Ts0x, Ts0y);
		ctx.lineTo(Ts1x, Ts1y);
		ctx.closePath();
		ctx.stroke();

	}
	rotateBy(rotator) {
		this.s0 = rotator[0][0].product(this.s0).sum(rotator[0][1].product(this.s1));
		this.s1 = rotator[1][0].product(this.s0).sum(rotator[1][1].product(this.s1));
	}
	str(){
		return `[${this.s0.str()},\n ${this.s1.str()}]`;
	}
}
