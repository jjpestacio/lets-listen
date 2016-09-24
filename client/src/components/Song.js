import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/Song.css'
import { NO_IMAGE } from '../constants'

export default class Song extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { song, onClick } = this.props;

		if (!song)
			return null;

		const { channelTitle, title, thumbnails } = song.snippet;
		const artworkUrl = thumbnails.medium.url;


		// if (song.suggestedBy)
		// return (
		// 	<div className='song' onClick={onClick}>
		// 		<div className='row'>
		// 			<span className="suggestedByUser">{ song.suggestedBy.username }</span>
		// 			<span className="suggestedBy">Suggested By: </span>
		// 		</div>
		// 		<div className='row'>
		// 			<img className='artwork'
		// 				src={artworkUrl ? artworkUrl : NO_IMAGE } />
		// 			<div className='songInfo'>
		// 				<span className='channelTitle'>{ channelTitle }</span>
		// 				<span className='songTitle'>{ title }</span>
		// 			</div>
		// 		</div>
		// 	</div>
		// );

		return (
			<div className='song' onClick={onClick}>
				<img className='artwork'
					src={artworkUrl ? artworkUrl : NO_IMAGE } />
				<div className='songInfo'>
					<span className='channelTitle'>{ channelTitle }</span>
					<span className='songTitle'>{ title }</span>
				</div>
			</div>
		);
	}
}