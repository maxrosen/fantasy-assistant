var express = require('express');
var router = express.Router();
const weeklyProjRouter = require('./controllers/weekly_projections');
const playerSelectRouter = require('./controllers/player_selection');
const playerPicRouter = require('./controllers/player_pic');

module.exports = function () {
	router.use('/weekly_proj', weeklyProjRouter());
	router.use('/player_select', playerSelectRouter());
	router.use('/player_pic', playerPicRouter());

	return router;
};
