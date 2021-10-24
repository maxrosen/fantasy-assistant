import React, { Component } from 'react';
import Player from './player';
// import SearchBar from './search_bar';
// import PlayerSelRow from './player_sel_row';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import queryString from 'query-string';
// import Col from 'react-bootstrap/Col';

class playerProj extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p1: '',
			p2: '',
			p3: '',
			p4: '',
			searchQuery: '',
		};
		this.posts = [];
		this.search = window.location;
		this.query = new URLSearchParams(this.search).get('name');
		// [this.searchQuery, this.setSearchQuery] = useState(this.query || '');
		this.filteredPosts = this.filterPosts(this.posts, this.state.searchQuery);
	}

	setSearchQuery = (q) => {
		console.log('setSearchQuery: ' + q);
		this.setState({ searchQuery: q });
		// console.log('updated search query: ' + this.state.searchQuery);
		this.getPlayers('http://localhost:3001/api/player_select', q);

		this.filteredPosts = this.filterPosts(this.posts, q);
		console.log(`Posts: ` + this.posts);
	};

	filterPosts = (posts, query) => {
		// console.log('filterPosts');
		if (!query) {
			let n = Math.min(5, posts.length);
			return posts.slice(0, n);
		}

		let filtered = posts.filter((post) => {
			const postName = post.name.toLowerCase();
			return postName.includes(query);
		});
		let n = Math.min(5, filtered.length);
		return filtered.slice(0, n);
	};

	callProjAPI(url, id1, id2, id3, id4) {
		let route = `${url}?id1=${id1}&id2=${id2}`;
		if (id3) {
			route += `&id3=${id3}`;
		}
		if (id4) {
			route += `&id4=${id4}`;
		}
		fetch(route)
			.then((res) => res.json())
			.then((res) => {
				this.setState({ p1: res.p1proj });
				this.setState({ p2: res.p2proj });
				if (id3) {
					this.setState({ p3: res.p3proj });
					this.setState({ is3: true });
				}
				if (id4) {
					this.setState({ p4: res.p4proj });
					this.setState({ is4: true });
				}
			});
	}

	getPlayers(url, name) {
		let route = `${url}?name=${name}`;
		fetch(route)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				this.posts = res;
			});
	}

	componentDidMount() {
		const query = queryString.parse(window.location.search);
		this.callProjAPI(
			'http://localhost:3001/api/weekly_proj',
			query.id1,
			query.id2,
			query.id3,
			query.id4
		);
	}

	render() {
		let p3;
		if (this.state.p3 !== '') {
			p3 = <Player player={this.state.p3} />;
		}
		let p4;
		if (this.state.p4 !== '') {
			p4 = <Player player={this.state.p4} />;
		}
		return (
			<div>
				<Container>
					<Row>
						<Player player={this.state.p1} />
						<Player player={this.state.p2} />
						{p3}
						{p4}
					</Row>
				</Container>
			</div>
		);
	}
}

export default playerProj;
