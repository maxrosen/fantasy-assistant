const axios = require('axios').default;

async function getTeamRoster(team_abbr, position) {
	let url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team_abbr}/roster`;
	let roster;
	let idx = 0;

	if (position === 'K') {
		idx = 2;
	}

	await axios
		.get(url)
		.then(function (response) {
			roster = response.data.athletes[idx].items;
		})
		.catch(function (error) {
			console.log(error);
		});

	return roster;
}

async function getPlayerPic(team_abbr, player_name, position) {
	if (position == 'DEF') {
		return await getTeamLogo(team_abbr);
	} else if (team_abbr == 'FA') {
		return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
	} else if (team_abbr && player_name && position) {
		let roster = await getTeamRoster(team_abbr, position);

		let player = roster.filter((obj) => {
			return obj.displayName === player_name;
		});

		if (player[0]) {
			let headshot = player[0].headshot.href;
			return headshot;
		} else {
			return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
		}
	} else {
		return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
	}
}

async function getTeamLogo(team_abbr) {
	let url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team_abbr}`;
	let logo;

	await axios
		.get(url)
		.then(function (response) {
			logo = response.data.team.logos[0].href;
		})
		.catch(function (error) {
			console.log(error);
		});

	return logo;
}

module.exports = { getTeamLogo, getPlayerPic, getTeamRoster };
