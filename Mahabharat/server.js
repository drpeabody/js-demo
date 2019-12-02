const http = require('http');
const fs = require('fs');
const port = 80;
let server = http.createServer();

let totalConnections = 0;

const generateNewId = () => {
	totalConnections += 1;
	return totalConnections;
}

/**
 * Find the index of the given client id in the global clients array
 * 
 * @param {string} id	If the id is M-xyz then just send in "xyz"
 * 
 * @return {idx}	if given client is found
 * @return {-1} 	if given client is not found
 * 
 */
const getIndexOfId = (id) => {
	// Input: xxx NOT M-xxx
	// Replace with binary search later
	return clientIDS.findIndex(s => s.id === id);
}

class Player {
	constructor(id) {
		this.id = id;
		this.cards = CARDS_DECK.sort(s => 0.5 > Math.random()).slice(10);
		this.enemy = null;
		this.firstMove = false;
		this.lastMove = null;
	}
}

/**
 * Resolves war between two cards which are sent as arguments.
 * 
 * @param {string} card1	The exact name of the card
 * @param {string} card2    The exact name of the card
 * 
 * @return {true}	if card1 beats card2
 * @return {false} 	if card2 beats card1
 * @return {draw} 	if no card can win
 * @return {error} 	if one of the cards is not found in the deck
 * 
 */
const resolveWar = (card1, card2) => {
	let idx1 = CARDS.findIndex(s => s.name === card1), idx2 = CARDS.findIndex(s => s.name === card2);
	if(idx1 < 0 || idx2 < 0) return 'draw';
	else if(idx1 < 0) return false;
	else if(idx2 < 0) return true;
	if(GRAPH[idx1][idx2 - idx1] !== undefined) return GRAPH[idx1][idx2 - idx1];
	else return !GRAPH[idx2][idx1];

}

const play = (player, card) => {
	player.cards.splice(player.cards.indexOf(card), 1);
	player.lastMove = card.name;
	return `You played ${card.name}.`;
}

const clientIDS = [];

class Card {
	constructor(name, tier) {
		this.name = name;
		this.tier = tier;
	}
}

const NUM_CARDS = 20, NUM_CARDS_HAND = 10;
const TIER_REGULAR = 0, TIER_RARE = 1, TIER_ELITE = 2;
const MULTIPLICITY = {
	0: 1, 1: 1, 2: 1
}
const CARDS = [
	new Card( 'Arjuna', 	TIER_REGULAR ),
	new Card( 'Bhim', 		TIER_REGULAR ),
	new Card( 'Yudhisthira',TIER_REGULAR ),
	new Card( 'Karna', 	TIER_REGULAR ),
	new Card( 'Bhishma', 	TIER_REGULAR ),
	new Card( 'Krishna', 	TIER_ELITE ),
	new Card( 'Duryodhan', 	TIER_REGULAR ),
	new Card( 'Dron', 		TIER_REGULAR ),
	new Card( 'Dron Putra', TIER_REGULAR ),
	new Card( 'Abhimanyu', 	TIER_REGULAR ),
	new Card( 'Bhim Putra', TIER_REGULAR ),
	new Card( 'Balram', 	TIER_REGULAR ),
	new Card( 'Surya', 		TIER_RARE ),
	new Card( 'Mercury', 	TIER_RARE ),
	new Card( 'Venus', 		TIER_RARE ),
	new Card( 'Mars', 		TIER_RARE ),
	new Card( 'Brahaspati', TIER_RARE ),
	new Card( 'Shani', 		TIER_RARE ),
	new Card( 'Chandra', 	TIER_RARE ),
	new Card( 'Shiv', 		TIER_ELITE ) ]
const CARDS_REG = CARDS.filter(s => s.tier === TIER_REGULAR);
const CARDS_RARE = CARDS.filter(s => s.tier === TIER_RARE);
const CARDS_ELITE = CARDS.filter(s => s.tier === TIER_ELITE);

const CARDS_DECK = CARDS.reduce((acc, s) => acc.concat(Array(MULTIPLICITY[s.tier]).fill(s)), []);

const GRAPH = [
['draw',true  ,true  ,'draw',false ,false ,true  ,false ,true  ,true  ,true  ,false ,false ,true  ,true  ,true  ,false ,true  ,true  ,false ],
['draw',false ,false ,false ,false ,false ,false ,true  ,true  ,true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',false ,false ,false ,false ,false ,true  ,true  ,true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',false ,false ,true  ,false ,true  ,true  ,true  ,false ,false ,true  ,true  ,true  ,false ,true  ,true  ,false ],
['draw',false ,true  ,true  ,true  ,true  ,true  ,true  ,false ,true  ,true  ,true  ,false ,false ,true  ,false ],
['draw',true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,true  ,'draw'],
['draw',false ,true  ,true  ,true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',true  ,true  ,true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',true  ,true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',true  ,false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',false ,false ,false ,false ,false ,false ,false ,false ,false ],
['draw',true  ,true  ,true  ,true  ,true  ,true  ,true  ,false ],
['draw',true  ,true  ,true  ,true  ,true  ,true  ,false ],
['draw',false ,false ,false ,false ,true  ,false ],
['draw',false ,false ,false ,true  ,false ],
['draw',false ,true  ,true  ,false ],
['draw',true  ,true  ,false ],
['draw',true  ,false ],
['draw',false ],
['draw']]

const GET = {
	'': (req, res, args) => {
		fs.readFile("index.html", (err, data) => {
			res.write(data);
			res.end();
		});
	},

	'login': (req, res, args) => {
		// Args will be ['', 'login']

		let id = generateNewId();
		clientIDS.push(new Player(id));

		res.write(`M-${id}`);
		res.end();
	},

	'logout': (req, res, args) => {
		// Args will be ['', 'logout', 'M-xxx']
		if(args[2]) {
			let id = String(args[2]).substring(2);
			let idx = getIndexOfId( parseInt(id) );
			if(idx !== -1){
				clientIDS.splice(idx, 1);
				res.write("Removed id: " + id);
			} else res.write("Error: Id not found.");
		} else res.write('Error: Cannot log out Empty ID.');
		res.end();
	},

	'clients': (req, res, args) => {
		res.write(clientIDS.map(s => 
				`\n${s.id} -> [${s.cards.map(x => x.name).toString()}]\n Enemy: ${
					(!s.enemy) ? 'None' : s.enemy.id
				}`
			).toString());
		res.end();
	},

	'war': (req, res, args) => {
		// Args wll be ['', 'war', 'name 1', 'name 2']
		res.write(String(resolveWar(args[2], args[3])));
		res.end();
	},

	'setgame': (req, res, args) => {
		// Args will be ['', 'setgame', 'M-player', 'M-enemy']
		let pid = parseInt( String(args[2]).substring(2) );
		let eid = parseInt( String(args[3]).substring(2) );

		if(pid === NaN || eid === NaN) res.write('Invalid Player or Enemy Id.');
		else  {
			let player = clientIDS[getIndexOfId(pid)];
			let enemy = clientIDS[getIndexOfId(eid)];
			if(!player) res.write('No Player found with id ' + args[2]);
			if(!enemy) res.write('No Enemy found with id ' + args[3]);
			if(player.enemy) res.write('You are already in a game.');
			else if(enemy.enemy) res.write('They are already in a game.');
			else {
				player.enemy = enemy;
				enemy.enemy = player;
				player.firstMove = true;
				res.write(`You have started a game against player Id ${args[3]}, you make the first move.`);
			}
		}
		res.end();
	},

	'getgame': (req, res, args) => {
		// Args will be ['', 'getgame', 'M-player']
		let pid = parseInt( String(args[2]).substring(2) );
		if(pid === NaN ) res.write('Invalid Player Id.');
		else {
			let player = clientIDS[getIndexOfId(pid)];
			if(!player) res.write('No Player found with id ' + args[2]);
			else {
				let cards = player.cards.map(s => ' ' + s.name).sort().toString();
				if(!player.enemy)
					res.write(`Your Cards:${cards}.\nYou are not in a game right now.`);
				else {
					res.write(`Your Cards:${cards}.\nYour enemy has ${player.enemy.cards.length} card(s). `);

					if(player.lastMove !== null && player.enemy.lastMove !== null){
						let result = resolveWar(player.lastMove, player.enemy.lastMove);
						let fight = `${player.lastMove} vs ${player.enemy.lastMove}`
						if(result == true)
							res.write(`You won the last round in ${fight}. `);
						else if (result == false)
							res.write(`Your enemy won the last round in ${fight}. `);
						else 
							res.write(`It was a draw last round in ${fight}. `);
						if(player.firstMove) 
							res.write('It is your turn to play. ');
						else 
							res.write('Wait for your enemy to play. ');
					} else if(player.lastMove !== null) 
						res.write(`You played ${player.lastMove}. Wait for your enemy to play.`);
					else if(player.enemy.lastMove !== null) 
						res.write(`Your Enemy played ${player.enemy.lastMove}. It is yout turn to play.`);
					else {
						if(player.firstMove) 
							res.write('It is your turn to play.');
						else 
							res.write('Wait for your enemy to play.');
					}
				}
			}
		}
		res.end();
	},
	'play': (req, res, args) => {
		// Args will be ['', 'play', 'M-player', 'CardName']
		if(!args[3]) res.write('Invalid card move');
		else {
			let pid = parseInt( String(args[2]).substring(2) );
			if(pid === NaN ) res.write('Invalid Player Id.');
			else {
				let player = clientIDS[getIndexOfId(pid)];
				if(!player) res.write('No Player found with id ' + args[2]);
				else if(!player.enemy) res.write('You are not in a game right now.');
				else {
					let card = player.cards.find(s => s.name === args[3]);
					if(!card) res.write('You do not have card ' + args[3]);
					else {
						if(player.lastMove === null && player.enemy.lastMove === null){
							if(!player.firstMove) res.write('You cannot make the first Move.');
							else res.write(play(player, card));
						}
						else if(player.lastMove !== null && player.enemy.lastMove !== null){
							if(!player.firstMove) res.write('It is not your turn to play.');
							else {
								player.enemy.lastMove = null;
								res.write(play(player, card));
							}
						}
						else if(player.lastMove === null) {
							res.write(play(player, card));
							let result = resolveWar(card, player.enemy.lastMove);
							if(result === true)
								res.write(`Your ${card.name} beats ${player.enemy.lastMove}.`);
							else if (result === 'draw')
								res.write(`Your ${card.name} draws ${player.enemy.lastMove}.`);
							else 
								res.write(`Your ${card.name} loses to ${player.enemy.lastMove}.`);
						}
						else res.write('It is not your turn to play.');
					}
				}
			}
		}
		res.end();
	}

}

try {
	server.on('request', function(req, res) {
		console.log(`HTTP ${req.httpVersion} ${req.method} "${req.url}"`);

		let args = req.url.split('/');
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		if(args[1].toLowerCase() in GET) GET[args[1].toLowerCase()](req, res, args);
		else GET[''](req, res, args);
	});
	server.listen(port);
} catch (err) {
	console.log(err);
}

