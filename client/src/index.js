import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

import { randomString } from './functions'
import { newStore } from './store'

import App from './components'
import JoinRoom from './components/pages/JoinRoom'
import Room from './components/pages/Room'

const store = newStore();

// Session info
let userId = window.sessionStorage.getItem('userId');
const username = window.sessionStorage.getItem('username');
const roomId = window.sessionStorage.getItem('roomId');

if (!userId)
	userId = randomString(10);
	window.sessionStorage.setItem('userId', userId);

const socket = io('/', { 
	'reconnection': true,
	'reconnection': true,
	'reconnectionDelay': 1000,
	'reconnectionDelayMax' : 5000,
	'reconnectionAttempts': 10050,
	query: "userId=" + userId + "&roomId=" + roomId + '&username=' + username
});

socket.on('init', initData => {
	render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route name='app' path='/' component={App} 
					socket={socket} initData={initData}>
					<IndexRoute component={JoinRoom} />
					<Route path=':roomId' component={Room} />
				</Route>
			</Router>
		</Provider>
	, document.getElementById('app'));
});
