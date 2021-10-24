import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function player(props) {
	let player = props.player;

	const logoStyle = {
		width: '100px',
	};
	const pfpStyle = {
		width: '250px',
	};

	let pointsColor;

	// Get points projection color
	switch (true) {
		case player.rank === 100:
			pointsColor = '#309143';
			break;
		case player.rank >= 95:
			pointsColor = '#51b364';
			break;
		case player.rank >= 90:
			pointsColor = '#8ace7e';
			break;
		case player.rank >= 85:
			pointsColor = '#ffda66';
			break;
		case player.rank >= 80:
			pointsColor = '#f0bd27';
			break;
		case player.rank >= 75:
			pointsColor = '#e39802';
			break;
		case player.rank >= 70:
			pointsColor = '#ff684c';
			break;
		case player.rank >= 65:
			pointsColor = '#e03531';
			break;
		default:
			pointsColor = '#b60a1c';
			break;
	}

	return (
		<Col>
			<Container>
				<Row>
					<img
						style={pfpStyle}
						src={player.headshot}
						alt='player headshot'></img>
				</Row>
				<Row>
					<h3>{player.name}</h3>
				</Row>
				{/* <Row>
					<h5>{player.team}</h5>
				</Row> */}
				<Row>
					<span>
						<img style={logoStyle} src={player.logo} alt='team logo'></img>
					</span>
				</Row>
				<Row>
					<span>
						<h5>Projected Points: </h5>
						<h5 style={{ color: pointsColor, fontWeight: 'bolder' }}>
							{player.projected_points}
						</h5>
					</span>
				</Row>
			</Container>
		</Col>
	);
}

export default player;
