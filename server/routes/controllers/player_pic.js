var express = require('express');
var router = express.Router();
const https = require('https');
const axios = require('axios').default;
var qs = require('qs');
const pic = require('./getPic');

module.exports = function () {
	router.route('/').get(async (req, res) => {
		const query = qs.parse(req.query);
		let name = query.name;
		let pos = query.pos;
		let team = query.team;

		if (name && pos && team) {
			res.send(await pic.getPlayerPic(team, name, pos));
		} else {
			res.send(
				'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
			);
		}

		// res.send(200);
	});

	return router;
};
