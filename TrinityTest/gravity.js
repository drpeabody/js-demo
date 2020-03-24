{
	// These are some utility functions to make life easier
	// The game doesn't depend upon them

	clog = console.log;

	// Usefule Type Checking Function

	// assert(door, NotEmpty); or assert(NotEmpty, door);
	//		Fails for null, '', undefined
	//		Success for any non empty object
	// assert(door instanceof Door, true);
	//		Checks for objects that were made using new keyword
	// assert(typeof name, 'string')
	//		Checks of type of built in objects
	// assert(typeof foo, 'function')
	// 		Also works

	assert = function(obj1, obj2, msg) {
		if(obj1 === NotEmpty && !obj2)
			throw Error(msg);
		if(obj2 === NotEmpty && !obj1)
			throw Error(msg);
		if(obj1 !== obj2 && obj1 !== NotEmpty && obj2 != NotEmpty) 
			throw Error(msg);
	}

	// A special long unique string to ensure non empty objects using assrt()
	const NotEmpty = 'ODH@<)UD@D(@#>DJIJEIDKLADJ<@UD(UD>KLDM:LEDJ';

	// Define constant object members

	final = (obj, key, value) => {
		assert(obj, NotEmpty, 'Object cannot be empty');
		assert(key, NotEmpty, 'Key cannot be empty');
		Object.defineProperty( obj, key, {
			value: value,
			writable: false,
			enumerable: true,
			configurable: true
		}); // Makes obj.<key> unwritable and final
	}
}


class Orbit {
	constructor(r, phi, v_rad, v_ang){
		assert(r > 0, true, "Need Positive Radius");
		assert(v_rad >= 0, true, "Need Positive Radial Velocity");
		assert(v_ang != 0, true, "Need Non Zero Angular Velocity");
		final(this, 'l', r * v_ang); // Angular Momentum per Unit Mass
		final(this, 'phi', phi);
		let e;
		if(Math.abs(Math.sin(phi)) > 0.01)
			e = v_rad * this.l * this.l / (r * v_ang * Math.sin(phi));
		else 
			e = (this.l * this.l / r - 1) / Math.cos(phi);
		final(this, 'e', Math.abs(e)); // Ecentricity
		clog(`Orbit: (l, e) = (${this.l},${this.e})`);
	}

	getPos(theta) {
		return this.l * this.l / (1 + this.e * Math.cos(theta));
	}
}

class Orbiter {
	constructor (r, phi, v_rad, v_ang, mass) {
		assert(r > 0, true, "Need Positive Radius");
		assert(v_rad >= 0, true, "Need Positive Radial Velocity");
		assert(v_ang != 0, true, "Need Non Zero Angular Velocity");
		assert(isNaN(mass) && mass > 0, false, "Need a positive number mass");
		let orbit = new Orbit(r, phi, v_rad, v_ang);
		final(this, 'orbit', orbit);
		final(this, 'mass', mass);
		// this.r = r; R must be calculated from orbit equation
		this.phi = phi; // Variables
	}

	draw (ctx, x, y) {
		if(!this.orbit) return;
		ctx.translate(x, y);
		ctx.fillStyle = "#00f";
		ctx.fillRect(-5, -5, 10, 10);

		ctx.fillStyle = "#f00";
		let x0, y0, r0 = this.orbit.getPos(this.phi);
		x0 = r0 * Math.cos(this.phi);
		y0 = r0 * Math.sin(this.phi);
		ctx.fillRect(x0-5, y0-5, 10, 10);

		ctx.strokeStyle = "#fff";
		ctx.beginPath();
		let o = this.orbit;
		for(let i = 0; i <= 2*PI; i += (2*PI/100)){
			let r = o.getPos(i);
			ctx.lineTo(r * Math.cos(i), r * Math.sin(i));
		}
		ctx.stroke();
		ctx.closePath();
		ctx.translate(-x, -y);
	}
}

class Orbited {
	constructor(x, y, mass) {
		assert(mass > 0, true, "Need Positive Mass");
		assert(isNan(x), false, "Need Number Coordinate X");
		assert(isNan(y), false, "Need Number Coordinate Y");
		final(this, 'x', x);
		final(this, 'y', y);
		final(this, 'm', m);
	}
}

const PI = 3.1415;
const G = 6.77 * 10e-11;
const canvas = document.getElementById("canvas-1");
canvas.width = Math.floor(window.innerWidth);
canvas.height = Math.floor(window.innerHeight * 0.999);
const ctx = canvas.getContext('2d', { alpha: false });
const width = canvas.width; 
const height = canvas.height;

// Test
let R0 = 100, Phi0 = PI/2;
let o = new Orbiter(R0, Phi0, 0, 0.2, 1);

draw = () => {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);

	o.draw(ctx, width/2, height/2);

	ctx.fillStyle = "#0ff";
	let x0, y0;
	x0 = width/2 + R0 * Math.cos(Phi0);
	y0 = height/2 + R0 * Math.sin(Phi0);
	ctx.fillRect(x0-3, y0-3, 6, 6);

	requestAnimationFrame(draw);
}


draw();
