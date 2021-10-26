import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PlayerSearch from './player_search';

class AddSel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			add: true,
		};
	}

	handleClickAdd = () => {
		this.setState({ add: !this.state.add });
		this.props.addPlayer(this.props.num);
	};

	handleClickDelete = () => {
		this.setState({ add: !this.state.add });
		this.props.deletePlayer(this.props.num);
	};

	render() {
		let thing;
		let message = `Remove player`;
		// if (this.props.threeActive && this.props.num === 3) {
		// 	message = `Remove players`;
		// }
		if (this.state.add) {
			thing = (
				<Button
					variant='success'
					type='submit'
					className='submit-button'
					onClick={this.handleClickAdd}>
					Add player
				</Button>
			);
		} else {
			thing = (
				<div>
					<PlayerSearch setID={this.props.setID} num={this.props.num} />
					<Button
						variant='danger'
						type='submit'
						className='submit-button'
						onClick={this.handleClickDelete}>
						{message}
					</Button>
				</div>
			);
		}
		return <Col>{thing}</Col>;
	}
}

// let add = true;
// let AddSel;

// let addButton = () => (
// <Button
// 	variant='primary'
// 	type='submit'
// 	className='submit-button'
// 	onClick={handleClick}>
// 	+
// </Button>
// );

// let search = (setID, num) => <PlayerSearch setID={setID} num={num} />;

// const handleClick = () => {
// 	add = false;
// 	AddSel = ({ setID, num }) => <Col>{search(setID, num)}</Col>;
// 	console.log(add);
// };

export default AddSel;
