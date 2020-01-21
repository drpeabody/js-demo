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
		clog(r, phi, v_rad, v_ang);
		assert(r > 0, true, "Need Positive Radius");
		assert(v_rad >= 0, true, "Need Positive Radial Velocity");
		assert(v_ang != 0, true, "Need Non Zero Angular Velocity");
		final(this, 'e', (v_rad / v_ang)); // Ecentricity
		final(this, 'l', r * v_ang); // Angular Momentum per Unit Mass
		final(this, 'phi', phi);
		clog(`Orbit: (P, A) = (${this.l * this.l / (1 + this.e)},${this.l * this.l / (1 - this.e)})`);
	}
}

class Orbiter {
	constructor (x, y, v_x, v_y, mass) {
		assert(isNaN(x), false, "Need a Number Coordinate X");
		assert(isNaN(y), false, "Need a Number Coordinate Y");
		assert(isNaN(v_x), false, "Need a Number Valocity v_X");
		assert(isNaN(v_y), false, "Need a Number Valocity v_Y");
		let r = Math.sqrt(x*x + y*y);
		let orbit = new Orbit(r, Math.atan(y/x), 
			(x * v_x + y * v_y) / r, (x * v_y - y * v_x ) / (r * r));
		final(this, 'orbit', orbit);
	}

	draw (ctx, x, y) {
		if(!this.orbit) return;
		ctx.strokeStyle = "#fff";
		ctx.translate(x, y);
		ctx.beginPath();
		let o = this.orbit;
		for(let i = 0; i <= 2*PI; i += (2*PI/100)){
			let r = o.l * o.l / (1 + o.e * Math.cos(i - o.phi));
			ctx.lineTo(r * Math.sin(i), r * Math.cos(i));
		}
		ctx.closePath();
		ctx.stroke();
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
let o = new Orbiter(100, 100, 0, 10);

draw = () => {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);

	// orbit.draw(ctx, width/2, height/2);
	o.draw(ctx, width/2, height/2);

	requestAnimationFrame(draw);
}


draw();
