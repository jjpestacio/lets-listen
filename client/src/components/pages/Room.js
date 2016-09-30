import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import '../styles/Title.css'
import '../styles/Room.css'

import Player from '../Player'
import Queue from '../Queue'
import RequestForm from '../forms/RequestForm'
import CurrentSong from '../CurrentSong'
import UserList from '../UserList'

@connect (
	state => ({
		client: state.client,
		currentSong: state.queue[0],
		DJ: state.DJ,
	})
)

export default class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentView: 'Queue'
		}

		this.socket = this.props.socket;

		this.getPlayer = this.getPlayer.bind(this);
		this.getView = this.getView.bind(this);
		this.view = this.view.bind(this);
	}

	componentWillUnmount() {
		this.socket.emit('logout');
	}

	getPlayer() {
		const { currentSong } = this.props;

		return (
			<div className="row">
				<div className="col">
					<Player socket={this.socket} song={currentSong} />
				</div>
			</div>
		);
	}

	getView() {
		const { currentView } = this.state;

		if (currentView === 'Queue')
			return <Queue />
		else if (currentView === 'Users')
			return <UserList socket={this.socket} />
	}

	view(e) {
		this.setState({ currentView: e.target.value });
	}

	render() {
		const { client, currentSong, DJ } = this.props;
		const { currentView } = this.state;
		const roomId = window.sessionStorage.getItem('roomId')

		// Mobile version
		if (320 < screen.width && screen.width < 480)
		return (
			<div className='page'>
				<div className='row'>
					<div className='titleBar'>
						<select className='title main menu' onChange={this.view}>
							<option key={currentView} value={currentView}>
								{ currentView }
							</option>
							{ ['Queue', 'Users']
								.filter(view => view !== currentView)
								.map(view => 
									<option key={view} value={view}>
										{ view }
									</option>
								)
							}
						</select>
						<span className='title main roomNumber'>
							Room: { roomId }
						</span>
						<span className='title main appName'>
							Let's Listen
						</span>
					</div>
				</div>
				{ client.userId === DJ
					? this.getPlayer()
					: null
				}
				<div className='row'>
					<div className='col view'>
						<CurrentSong song={currentSong} />
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<RequestForm socket={this.socket} />
					</div>
				</div>
				<div className='row'>
					<div className='col view'>
						{ this.getView() }
					</div>
				</div>
			</div>
		);
		
		// Desktop / Laptop version
		return (
			<div className='page'>
				<div className='row'>
					<div className='titleBar'>
						<span className='title roomNumber'>
							Room: { roomId }
						</span>
						<span className='title appName'>
							Let's Listen
						</span>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<UserList socket={this.socket} />
					</div>
					<div className='col'>
						<div className='row'>
							{ client.userId === DJ
								? <Player socket={this.socket} song={currentSong} />
								: <CurrentSong song={currentSong} />
							}
						</div>
						<div className='row'>
							<RequestForm socket={this.socket} />
						</div>
					</div>
					<div className='col'>
						<Queue />
					</div>
				</div>
			</div>
		);
	}
}