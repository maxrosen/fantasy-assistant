var express = require('express');
var router = express.Router();
const https = require('https');
const axios = require('axios').default;
var qs = require('qs');
const pic = require('./getPic');

module.exports = function () {
	async function getPlayers(name) {
		let players;

		await axios
			.get(
				'https://api.fantasynerds.com/v1/nfl/players?apikey=TEST&include_inactive='
			)
			.then(function (response) {
				players = response.data;
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {});

		let namerArr = name.split(' ');
		let fName = namerArr[0].toLowerCase();
		let lName;
		if (name.includes(' ')) {
			lName = namerArr[1].toLowerCase();
		}

		let p = players.filter((obj) => {
			let nameOArr = obj.name.split(' ');
			let fOName = nameOArr[0].toLowerCase();
			let lOName = nameOArr[1].toLowerCase();
			if (lName) {
				let lName = namerArr[1].toLowerCase();
				return (
					((fOName.includes(fName) && lOName.includes(lName)) ||
						(fOName.includes(lName) && lOName.includes(fName))) &&
					(obj.position === 'QB' ||
						obj.position === 'WR' ||
						obj.position === 'RB' ||
						obj.position === 'TE' ||
						obj.position === 'DEF')
				);
			} else {
				return (
					(fOName.includes(fName) || lOName.includes(fName)) &&
					(obj.position === 'QB' ||
						obj.position === 'WR' ||
						obj.position === 'RB' ||
						obj.position === 'TE' ||
						obj.position === 'DEF')
				);
			}
		});

		let p_min = [];

		await p.forEach(async (player) => {
			// await pic
			// 	.getPlayerPic(player.team, player.name, player.position)
			// 	.then((res) => (headshot = res))
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
			p_min.push({
				id: player.playerId,
				name: player.name,
				position: player.position,
				team: player.team,
				// pic: headshot,
			});
		});

		return p_min;
	}

	router.route('/').get(async (req, res) => {
		const query = qs.parse(req.query);
		let name = query.name;

		let players = await getPlayers(name);

		// for (const p in players) {
		// 	console.log(players[p]);
		// 	let headshot = await pic.getPlayerPic(
		// 		players[p].team,
		// 		players[p].name,
		// 		players[p].position
		// 	);

		// 	players[p].pic = headshot;
		// }

		res.send(players);
	});

	return router;
};
