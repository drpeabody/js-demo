
class Complex {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	sum(c_n) {
		return new Complex(this.x + c_n.x, this.y + c_n.y);
	}
	product(c_n) {
		return new Complex(this.x*c_n.x - this.y*c_n.y, this.y*c_n.x + this.x*c_n.y);
	}

	times_scalar(s) {
		return new Complex(this.x*s, this.y*s);
	}
	sum_scalar(s) {
		return new Complex(this.x+s, this.y+s);
	}

	mod() {
		return this.x*this.x + this.y*this.y;
	}

	conj() {
		return new Complex(this.x, -this.y);
	}

	divide(c_n) {
		let d = c_n.mod();
		return this.product(c_n.conj()).times_scalar(1/d);
	}

	str() {
		return `${this.x} + i${this.y}`;
	}
}
