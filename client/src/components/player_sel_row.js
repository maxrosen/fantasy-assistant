import React from 'react';

const style = {
	color: 'blue',
	backgroundColor: 'coral',
	with: '500px',
};

// function getPlayerPic(name, pos, team) {
// 	let route = `http://localhost:3001/api/player_pic?name=${name}&pos=${pos}&team=${team}`;
// 	fetch(route, {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 		},
// 	}).then((res) => {
// 		console.log(res);
// 		return res;
// 	});
// }

const PlayerSelRow = ({ id, name, position, team, setPlayerID }) => (
	<li
		style={style}
		onClick={async (e) => {
			await setPlayerID(id, name);
		}}>
		{/* <img src={getPlayerPic(name, position, team)} /> */}
		{name} {position} - {team}
	</li>
);

export default PlayerSelRow;
