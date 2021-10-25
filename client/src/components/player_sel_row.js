import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

// let activeStatus = false;

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

const PlayerSelRow = ({
	id,
	name,
	position,
	team,
	setPlayerID,
	activeStatus,
	setSelected,
}) => (
	<ListGroup.Item
		tag='button'
		action
		type='button'
		active={activeStatus}
		onClick={async (e) => {
			await setPlayerID(id, name);
			setSelected(true);
		}}>
		{/* <img src={getPlayerPic(name, position, team)} /> */}
		{name} {position} - {team}
	</ListGroup.Item>
);

export default PlayerSelRow;
