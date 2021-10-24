import React, { Component } from 'react';
// import Player from './player';
// import SearchBar from './search_bar';
// import PlayerSelRow from './player_sel_row';
import PlayerSearch from './player_search';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import queryString from 'query-string';
// import Col from 'react-bootstrap/Col';

class playerSel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id1: '0',
			id2: '0',
			id3: '0',
			id4: '0',
		};
		this.setID = this.setID.bind(this);
	}

	async setID(num, id) {
		let stateObject = {};
		let key = 'id' + num;
		stateObject[key] = id;
		this.setState(stateObject, () => {
			console.log(this.state);
		});
	}

	render() {
		let p3;
		if (this.state.id3 !== '0') {
			p3 = <input type='hidden' name='id3' value={this.state.id3} />;
		}
		let p4;
		if (this.state.id4 !== '0') {
			p4 = <input type='hidden' name='id4' value={this.state.id4} />;
		}
		return (
			<div>
				<Container>
					<Row>
						<PlayerSearch setID={this.setID} num={1} />
						<PlayerSearch setID={this.setID} num={2} />
						<PlayerSearch setID={this.setID} num={3} />
						<PlayerSearch setID={this.setID} num={4} />
					</Row>
					<Row>
						<form action='http://localhost:3000/comp' method='get'>
							<input type='hidden' name='id1' value={this.state.id1} />
							<input type='hidden' name='id2' value={this.state.id2} />
							{p3}
							{p4}
							<input type='submit' />
						</form>
					</Row>
				</Container>
			</div>
		);
	}
}

export default playerSel;
