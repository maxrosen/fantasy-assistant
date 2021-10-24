import React, { Component } from 'react';
import PlayerSelRow from './player_sel_row';
import SearchBar from './search_bar';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import SearchRes from './search_results';

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
	}

	async setSearchQuery(q) {
		this.setState({ searchQuery: q }, () => {
			this.getPlayers(
				'http://localhost:3001/api/player_select',
				this.state.searchQuery
			);
			console.log(`Posts: ` + this.state.posts);
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

	render() {
		return (
			<Col>
				<SearchBar
					searchQuery={this.state.searchQuery}
					setSearchQuery={this.setSearchQuery}
				/>
				<ul style={{ listStyle: 'none' }}>
					{this.state.posts.map((post) => (
						<PlayerSelRow
							id={post.id}
							name={post.name}
							position={post.position}
							team={post.team}
							setPlayerID={this.setPlayerID}
						/>
					))}
				</ul>
			</Col>
		);
	}
}

export default PlayerSearch;
