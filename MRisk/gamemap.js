


	class GameMap {
		constructor(zones, zoneWidth, zoneHeight){
			assert(zones.constructor.name, 'Array', 'Zones has to be an array of Zones');
			assert(typeof zoneWidth === 'number' && !isNaN(zoneWidth), true, 'Width not a valid number');
			assert(typeof zoneHeight === 'number' && !isNaN(zoneHeight), true, 'Height not a valid number');
			zones.forEach(s => { assert(s.constructor.name, "Zone", 'Every zone is a zone'); });
			if(zones.length < 2) throw Error("Lol Map this is");
			final(this, 'zones', zones);
			final(this, 'zoneWidth', zoneWidth);
			final(this, 'zoneHeight', zoneHeight);

			// Verify that the adjecency lists are symmetric
			zones.forEach(s => { 
				s.neighbours.forEach(t => {
					let tzone = zones.find(z => z.name === t);
					assert(tzone.isNeighbour(s.name), true, t + ' should be a neighbour of ' + s.name);
				});
			});
		}

		getZone (name) { return this.zones.find(s => s.name === name); }
		areNeighbours(name1, name2) { return this.getZone(name1).isNeighbour(name2); }
		getZoneAt(x, y) {
			for(let z of this.zones) {
				if(z.x < x && z.x + this.zoneWidth > x){
					if(z.y < y && z.y + this.zoneHeight > y) return z;
				}
			}
		}

		draw(ctx, width, height, fontSize){
			this.zones.forEach(s => { s.draw(ctx, this.zoneWidth, this.zoneHeight); });
			ctx.fillStyle = "#fff";
			this.zones.forEach(s => { s.drawNames(ctx, this.zoneWidth, this.zoneHeight, fontSize); });
		}

		randomlyAlotPlayers() {
			let rem = ZONES
				.filter(s => s.master === null)
				.sort(s => 0.5 < Math.random()); // Filter and shuffle
			let idx = 0;
			for(let z of rem) {
				z.master = PLAYERS[idx++];
				if(idx === PLAYERS.length) idx = 0;
			}

			ZONES.forEach(z => { z.master.numZonesOwned++; } );
		}

		highlight(pred, state) {
			this.zones.filter(pred).forEach(z => z.highlighted = state);
		}
		
	}
