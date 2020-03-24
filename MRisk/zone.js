

class Zone {
		constructor(name, x, y, neighbours){
			assert(name, NotEmpty, 'Name of Zone cannot be empty');
			assert(typeof name, 'string', 'Name of Zone should be a String');
			assert(neighbours.constructor.name, 'Array', 'Neihbous should be array');
			assert(typeof x === 'number' && !isNaN(x), true, 'X should be a valid number');
			assert(typeof y === 'number' && !isNaN(y), true, 'Y should be a valid number');
			neighbours.forEach(s => { assert(typeof s, 'string', 'Neighbours should be names'); })
			final(this, 'name', name);
			final(this, 'neighbours', neighbours);
			final(this, 'x', x);
			final(this, 'y', y);
			this.Infantry = 1;
			this.Cavalry = 0;
			this.Artillery = 0;
			this.master = null;
			this.highlighted = false;
		}

		isNeighbour(name) { return this.neighbours.find(s => s === name) !== undefined; }
		draw(ctx, w, h) {
			let style = "#fff";
			if(this.master !== null){
				style = this.master.color;
			}
			if(this.highlighted) ctx.fillStyle = style + "6";
			else ctx.fillStyle = style + "3";
			ctx.fillRect(this.x, this.y, w, h);
		}
		drawNames(ctx, w, h, fs) {
			let armyString = `${this.Infantry} - ${this.Cavalry} - ${this.Artillery}`;
			let nameRect = ctx.measureText(this.name);
			let armyRect = ctx.measureText(armyString);
			ctx.fillText(this.name, this.x + (w - nameRect.width)/2, this.y + h/2);
			ctx.fillText(armyString, this.x + (w - armyRect.width)/2, this.y + h/2 + fs); 	
		}	
	}