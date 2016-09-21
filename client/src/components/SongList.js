import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Song from './Song'

export default class SongList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { songs, onClick } = this.props;

		return (
			<div>
				{ songs.map((song, i) => 
					<Song key = {i}
						onClick={() => onClick(song)} 
						song={song} />
				)}
			</div>
		);
	}
}