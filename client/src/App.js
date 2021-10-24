import React, { Component } from 'react';
import './App.css';
import PlayerProj from './components/player_proj';
import PlayerSel from './components/player_sel';
// import queryString from 'query-string';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		return (
			<Router>
				<div className='App'>
					<Switch>
						<Route path='/comp'>
							<PlayerProj />
						</Route>
						<Route path='/'>
							<PlayerSel />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
