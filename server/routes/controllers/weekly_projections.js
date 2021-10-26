var express = require('express');
var router = express.Router();
const https = require('https');
const axios = require('axios').default;
var qs = require('qs');
const pic = require('./getPic');

module.exports = function () {
	let players;
	let projs;

	axios
		.get('https://api.fantasynerds.com/v1/nfl/weekly-projections?apikey=TEST')
		.then(function (response) {
			projs = response.data;
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {});

	axios
		.get('https://api.fantasynerds.com/v1/nfl/players?apikey=TEST')
		.then(function (response) {
			players = response.data;
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(function () {});

	function generateProjPoints(proj) {
		let points = 0;
		if (proj.position === 'K') {
			if (proj.field_goals_made === undefined) {
			} else {
				points += proj.field_goals_made * 3;
				points -= proj.field_goals_attempted - proj.field_goals_made;
				points += proj.extra_points_made * 1;
			}
		} else if (proj.position === 'QB') {
			if (proj.passing_yards === undefined) {
			} else {
				points += proj.passing_yards * 0.04;
				points += proj.passing_touchdowns * 4;
				points -= proj.passing_interceptions * 1;
				points += proj.rushing_yards * 0.1;
				points += proj.rushing_touchdowns * 6;
				points -= proj.fumbles_lost * 1;
			}
		} else if (
			proj.position === 'WR' ||
			proj.position === 'RB' ||
			proj.position === 'TE'
		) {
			if (proj.rushing_yards === undefined) {
			} else {
				points += proj.rushing_yards * 0.1;
				points += proj.rushing_touchdowns * 6;
				points -= proj.fumbles_lost * 1;
				points += proj.receptions * 1;
				points += proj.receiving_yards * 0.1;
				points += proj.receiving_touchdowns * 6;
			}
		} else if (proj.position === 'DEF') {
			if (proj.interceptions === undefined) {
			} else {
				points += proj.interceptions * 2;
				points += proj.fumbles_recovered * 2;
				points += proj.sacks * 1;
				points += proj.defensive_touchdowns * 6;
				points += proj.safeties * 2;
				let pa = proj.points_allowed;
				if (pa === 0) {
					points += 5;
				} else if (pa >= 1 && pa <= 6) {
					pa += 4;
				} else if (pa >= 7 && pa <= 13) {
					pa += 3;
				} else if (pa >= 14 && pa <= 17) {
					pa += 1;
				} else if (pa >= 18 && pa <= 27) {
					pa += 0;
				} else if (pa >= 28 && pa <= 34) {
					pa -= 1;
				} else if (pa >= 35 && pa <= 45) {
					pa -= 3;
				} else if (pa >= 46) {
					pa -= 5;
				}
			}
		} else {
			return 0;
		}
		return Math.round(points * 100) / 100;
	}

	async function getPlayerProj(id) {
		let p = players.filter((obj) => {
			return obj.playerId === id;
		});
		if (p[0] === undefined) {
			console.log('player not found with id: ' + id);
			return {};
		}
		let pos = p[0].position;
		let proj = projs.players[`${pos}`].filter((obj) => obj.playerId === id)[0];

		if (proj === undefined) {
			proj = {
				name: p[0].name,
				position: p[0].position,
				team: p[0].team,
			};
		}

		proj.headshot = await pic.getPlayerPic(proj.team, proj.name, proj.position);
		proj.logo = await pic.getTeamLogo(proj.team);
		// console.log(proj);
		return proj;
	}

	function getBestPlayer(projObj) {
		let bestObj = projObj;
		let proj_points = {};

		for (const [key, value] of Object.entries(projObj)) {
			console.log(value);
			proj_points[`${key}`] = generateProjPoints(value);
		}

		let points = Object.values(proj_points);
		let most_points = Math.max(...points);
		let worst_percentage = (Math.min(...points) / most_points) * 100;

		for (var key in bestObj) {
			var obj = bestObj[key];
			projected_points = generateProjPoints(obj);
			obj.rank = (projected_points / most_points) * 100;
			obj.projected_points = projected_points;
		}

		return bestObj;
	}

	router.route('/').get(async (req, res) => {
		const query = qs.parse(req.query);

		let p1proj = await getPlayerProj(query.id1);
		let p2proj = await getPlayerProj(query.id2);
		projObj = { p1proj, p2proj };
		if (query.id3) {
			let p3proj = await getPlayerProj(query.id3);
			projObj.p3proj = p3proj;
		}
		if (query.id4) {
			let p4proj = await getPlayerProj(query.id4);
			projObj.p4proj = p4proj;
		}
		let best = getBestPlayer(projObj);

		res.send(JSON.stringify(best));
	});

	return router;
};
