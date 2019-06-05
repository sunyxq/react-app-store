import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'mobx-react';
import stores from 'stores/index';
import AppList from './pages/AppList/AppList'

class App extends Component {
	render() {
		return (
			<div className="app">
				<Provider {...stores}>
					<AppList />
				</Provider>
			</div>
		);
	}
}

export default App;
