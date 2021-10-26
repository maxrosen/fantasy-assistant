import React, { Component } from 'react';
import PlayerSelRow from './player_sel_row';
import SearchBar from './search_bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import SearchRes from './search_results';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

class PlayerSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			pID: null,
			posts: [],
			name: '',
		};
		// this.posts = [];
		this.query = new URLSearchParams(this.search).get('name');
		this.setPlayerID = this.setPlayerID.bind(this);
		this.setSearchQuery = this.setSearchQuery.bind(this);
		this.playerSelected = false;
		this.setSelected = this.setSelected.bind(this);
	}

	async setSearchQuery(q) {
		this.setState({ searchQuery: q }, () => {
			this.getPlayers(
				'http://localhost:3001/api/player_select',
				this.state.searchQuery
			);
			// console.log(`Posts: ` + this.state.posts);
		});
	}

	async setPlayerID(id, name) {
		this.setState({ pID: id }, () => {
			this.props.setID(this.props.num, this.state.pID);
			this.setSearchQuery(name);
			// this.setState({ posts: [] });
			// console.log(this.state.pID);
		});
	}

	getPlayers(url, name) {
		let route = `${url}?name=${name}`;
		fetch(route)
			.then((res) => res.json())
			.then((res) => {
				let n = Math.min(5, res.length);
				this.setState({ posts: res.slice(0, n) });
			});
	}

	setSelected(selected) {
		this.playerSelected = selected;
	}

	async getPlayerPic(name, pos, team) {
		let route = `http://localhost:3001/api/player_pic?name=${name}&pos=${pos}&team=${team}`;
		fetch(route)
			.then((res) => res.text())
			.then((res) => {
				console.log('Res: ' + res);
				return res;
			});
	}

	render() {
		return (
			<Col>
				<Row>
					<Form.Label>Player {this.props.num}</Form.Label>
					<SearchBar
						searchQuery={this.state.searchQuery}
						setSearchQuery={this.setSearchQuery}
						setSelected={this.setSelected}
					/>
				</Row>
				<Row>
					<ListGroup style={{ listStyle: 'none' }}>
						{this.state.posts.map((post) => (
							<PlayerSelRow
								id={post.id}
								name={post.name}
								position={post.position}
								team={post.team}
								setPlayerID={this.setPlayerID}
								activeStatus={this.playerSelected}
								setSelected={this.setSelected}
								url={this.getPlayerPic(post.name, post.position, post.team)}
							/>
						))}
					</ListGroup>
				</Row>
			</Col>
		);
	}
}

export default PlayerSearch;
