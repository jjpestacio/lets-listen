import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/App.css'

import { API_KEY, CLIENT_ID, SCOPE } from '../constants'
import { setClient, updateState } from '../actions'

@connect (
	state => ({}),
	dispatch => ({
		setClient: client => dispatch(setClient(client)),
		updateState: state => dispatch(updateState(state))
	})
)

export default class App extends Component {
	constructor(props) {
		super(props);

		this.socket = this.props.route.socket;

		this.initAuth = this.initAuth.bind(this);
	}

	componentDidMount() {
		this.initAuth();
	}

	componentWillMount() {
		const { initData } = this.props.route;
		const { setClient, updateState } = this.props;

		if (initData) {
			this.socket.emit('login', { 
				roomId: window.sessionStorage.getItem('roomId'), 
				user: initData.client 
			});

			setClient(initData.client);
			updateState(initData);
		}

		this.socket.on('state updated', state => {
			updateState(state);
		});
	}

	initAuth() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.setApiKey(API_KEY);
			window.gapi.client.load('youtube', 'v3').then(() => console.log('Loaded YouTube API'));
			window.gapi.auth2.init({
				client_id: CLIENT_ID,
				scope: SCOPE
			});
		});	
	}

	render() {
		return (
			<div className='app'>
				{ this.props.children 
					&& React.cloneElement(
						this.props.children,
						{ socket: this.socket }
					)
				}
			</div>
		);
	}
}