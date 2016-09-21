import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router' 
import { connect } from 'react-redux'

import '../styles/JoinRoom.css'
import { ROOM_ID_LENGTH } from '../../constants'
import { setClient } from '../../actions'
import { randomString } from '../../functions'

import BasicForm from '../forms/BasicForm'

@connect (
	state => ({}),
	dispatch => ({
		setClient: user => dispatch(setClient(user))	
	})
)

export default class JoinRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		}

		this.socket = this.props.socket;

		this.createRoom = this.createRoom.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.googleAuth = this.googleAuth.bind(this);
		this.joinroom = this.joinRoom.bind(this);
		this.setRoom = this.setRoom.bind(this);
		this.signIn = this.signIn.bind(this);
	}

	googleAuth() {
		const { username } = this.state;

		window.gapi.auth2.getAuthInstance().signIn().then(() => {
			const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
			this.createRoom(accessToken);
		});
	}

	createRoom(accessToken) {
		const roomId = randomString(ROOM_ID_LENGTH);

		this.socket.emit('create room id', roomId);

		this.socket.on('room id not available', () => {
			this.createRoom(accessToken);
		});

		this.socket.on('room id available', roomId => {
			this.socket.emit('create room', { accessToken, roomId });
			this.joinRoom(roomId);
		});
	}

	joinRoom(roomId) {
		this.socket.emit('check room', roomId);

		this.socket.on('room not authorized', roomId => {
			alert('Room does not exist.');
			return;
		});

		this.socket.on('room authorized', roomId => {
			this.socket.emit('check username', {
				roomId,
				username: this.state.username
			});

			this.socket.on('username not authorized', username => {
				alert('That username is already taken.');
				return;
			});

			this.socket.on('username authorized', username => { 
				this.setState({ username });
				this.setRoom(roomId);
				this.signIn();
			});
		});
	}

	setRoom(roomId) {
		window.sessionStorage.setItem('roomId', roomId);
	}

	signIn() {
		const { setClient } = this.props;
		const { username } = this.state;
		const userId = window.sessionStorage.getItem('userId');
		const roomId = window.sessionStorage.getItem('roomId');
		
		if (username.length < 2 || username.length > 12) {
			alert('Username must be between 2 and 12 characters.')
			return;
		}

		const user = { userId, username };
		
		setClient(user);
		this.socket.emit('login', { roomId, user });

		browserHistory.push(roomId)
		window.sessionStorage.setItem('username', username);
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	render() {
		const { username } = this.state;

		return (
			<div className='loginBox'>
				<div className='loginGoogle'>
					To create a room, you must sign into your Google account.
				</div>
				<div className='loginForms'>
					<div className='loginForm'>
						<input className='login'
							autoComplete='off'
							type='text'
							placeholder={'Enter a username'}
							value={username}
							onChange={this.handleUsernameChange} />	
						<button className='login'
							onClick={this.googleAuth}>
							Create a Room
						</button>
					</div>
					<div className='loginForm'>
						<BasicForm
							buttonText={'Join'}
							placeholder={'Room Id'}
							minLength={ROOM_ID_LENGTH}
							minLengthWarning={'Room IDs are 6 characters.'}
							maxLength={ROOM_ID_LENGTH}
							buttonStyle={'login'}
							inputStyle={'login join'}
							submit={roomId => this.joinRoom(roomId)} />
					</div>
				</div>
			</div>
		);
	}
}

// JoinRoom.PropTypes = {
// 	socket: PropTypes.object
// }