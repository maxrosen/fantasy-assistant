import React from 'react';
// import SearchRes from './search_results';
import PlayerSelRow from './player_sel_row';
import Form from 'react-bootstrap/Form';

let filteredPosts = [];

// async function getPlayers(name) {
// 	let route = `http://localhost:3001/api/player_select?name=${name}`;
// 	fetch(route)
// 		.then((res) => res.json())
// 		.then((res) => {
// 			console.log('Res: ' + res);
// 			return res;
// 		});
// }

const SearchBar = ({
	searchQuery,
	setSearchQuery,
	setFilteredPosts,
	setSelected,
}) => (
	<div>
		<form action='http://localhost:3001/api/player_select' method='get'>
			<label htmlFor='header-search'>
				<span className='visually-hidden'>Enter player name</span>
			</label>
			<Form.Control
				type='text'
				value={searchQuery}
				onInput={(e) => {
					setSelected(false);
					setSearchQuery(e.target.value);
				}}
				type='text'
				id='header-search'
				placeholder='Enter player name'
				name='name'
			/>
		</form>
		<ul style={{ listStyle: 'none' }}>
			{filteredPosts.map((post) => (
				<PlayerSelRow
					id={post.id}
					name={post.name}
					position={post.position}
					team={post.team}
				/>
			))}
		</ul>
	</div>
);

export default SearchBar;
