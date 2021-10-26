import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const pfpStyle = {
	width: '50px',
};

// let activeStatus = false;
let url;
async function getPlayerPic(name, pos, team) {
	let route = `http://localhost:3001/api/player_pic?name=${name}&pos=${pos}&team=${team}`;
	fetch(route)
		.then((res) => res.text())
		.then((res) => {
			console.log('Res: ' + res);
			url = res;
			return res;
		});
}

const PlayerSelRow = ({
	id,
	name,
	position,
	team,
	setPlayerID,
	activeStatus,
	setSelected,
	url,
}) => (
	<ListGroup.Item
		tag='button'
		action
		type='button'
		active={activeStatus}
		onClick={async (e) => {
			console.log(url);
			await setPlayerID(id, name);
			setSelected(true);
		}}
		onLoad={async (e) => {
			await getPlayerPic(name, position, team);
		}}>
		{/* <img style={pfpStyle} src={url} loading='lazy' />  */}
		<Row>
			<Col>{name}</Col>
		</Row>
		<Row>
			<Col>
				{position} - {team}
			</Col>
		</Row>
		{/* {name} {position} - {team} */}
	</ListGroup.Item>
);

export default PlayerSelRow;
