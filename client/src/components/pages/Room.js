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

		this.socket = this.props.socket;
	}

	render() {
		const { roomId } = this.props.params;
		const { client, currentSong, DJ } = this.props;
		
		return (
			<div className='page'>
				<div className='row'>
					<div className='titleBar'>
						<span className='roomNumber'>
							Room: { roomId }
						</span>
						<span className='appName'>
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