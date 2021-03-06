import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/Title.css'
import './styles/Song.css'
import { NO_IMAGE } from '../constants'

export default class CurrentSong extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { song, onClick } = this.props;

		if (!song)
		return (
			<div>
				<div className="title header">
					Current Song
				</div>
			</div>
		);

		const { channelTitle, title, thumbnails } = song.snippet;
		const artworkUrl = thumbnails.medium.url;

		return (
			<div>
				<div className="title header">
					Current Song
				</div>
				<div className='song currentSong' onClick={onClick}>
					<img className='artwork'
						src={artworkUrl ? artworkUrl : NO_IMAGE } />
					<div className='songInfo'>
						<span className="channelTitle">{ channelTitle }</span>
						<span className="songTitle">{ title }</span>
					</div>
				</div>
			</div>
		);
	}
}