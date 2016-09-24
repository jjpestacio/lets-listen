import React, { Component } from 'react'
// import { connect } from 'react-redux'
import YouTubePlayer from 'youtube-player'

import './styles/Player.css'

const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;

export default class Player extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isPlaying: false 
		}

		this.socket = this.props.socket;
		this.player = null;

		this.nextSong = this.nextSong.bind(this);
	}

	componentWillReceiveProps(newProps) {
		const { song } = this.props;

		console.log(newProps.song)

		if (!newProps.song)
			return;

		else if (!song)
			this.player.loadVideoById(newProps.song.id.videoId);

		else if (newProps.song.id.videoId !== song.id.videoId)
			this.player.loadVideoById(newProps.song.id.videoId);
	}

	componentDidMount() {
		const { song } = this.props;
		const videoId = song ? song.id.videoId : null;

		this.player = YouTubePlayer('iframe', {
			height: '97%',
			width: '97%',
			videoId,
			playerVars: {
				autoplay: 1,
				controls: 0
			}
		});

		console.log(this.player.getVideoData())

		this.player.on('stateChange', state => {
			const { data } = state;

			if (data === ENDED)
				this.nextSong();
			else if (data === PLAYING)
				this.setState({ isPlaying: true });
			else if (data === PAUSED)
				this.setState({ isPlaying: false });
		});
	}

	componentWillUnmount() {
		if (this.player)
			this.player.destroy();
	}

	nextSong() {
		this.player.stopVideo().then(() => 
			this.socket.emit('next song')
		);
	}

	render() {
		const { isPlaying } = this.state;

		return (
			<div>
				<div id='iframe' />
				<div className='controller'>
					{ isPlaying
						? <button key={'pause'} className='control'
							onClick={() => this.player.pauseVideo()}>
							Pause
						</button>
						: <button key={'play'} className='control'
							onClick={() => this.player.playVideo()}>
							Play
						</button>
					}
					<button key={'next'} className='control'
						onClick={() => this.nextSong()}>
						Next
					</button>
				</div>
			</div>
		);
	}
}