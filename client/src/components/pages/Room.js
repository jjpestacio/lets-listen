import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

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
			currentView: 'Playing'
		}

		this.socket = this.props.socket;

		this.getView = this.getView.bind(this);
		this.view = this.view.bind(this);
	}

	getView() {
		const { client, currentSong, DJ } = this.props;
		const { currentView } = this.state;

		if (currentView === 'Playing')
			return client.userId === DJ
				? <Player socket={this.socket} song={currentSong} />
				: <CurrentSong song={currentSong} />
		else if (currentView === 'Queue')
			return <Queue />;
		else if (currentView === 'Users')
			return <UserList socket={this.socket} />;
	}

	view(e) {
		this.setState({ currentView: e.target.value });
	}

	render() {
		const { roomId } = this.props.params;
		const { client, currentSong, DJ } = this.props;
		const { currentView } = this.state;

		// Mobile version
		if (320 < screen.width && screen.width < 480) {
			return (
				<div className="page">
					<div className="row">
						<div className='titleBar'>
							<select className='title menu' onChange={this.view}>
								<option key={currentView} value={currentView}>
									{ currentView }
								</option>
								{ ['Playing', 'Queue', 'Users']
									.filter(view => view !== currentView)
									.map(view => 
										<option key={view} value={view}>
											{ view }
										</option>
									)
								}
							</select>
							<span className='title roomNumber'>
								Room: { roomId }
							</span>
							<span className='title appName'>
								Let's Listen
							</span>
						</div>
					</div>
					<div className="row">
						<div className="view">
							{ this.getView() }
						</div>
					</div>
				</div>
			);
		}
		
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