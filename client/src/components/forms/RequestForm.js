import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import '../styles/RequestForm.css'

import BasicForm from './BasicForm'
import SongList from '../SongList'

@connect (
	state => ({
		accessToken: state.accessToken,
	})
)

export default class RequestForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: []
		}

		this.socket = this.props.socket;
	
		this.chooseSong = this.chooseSong.bind(this);
		this.searchYouTube = this.searchYouTube.bind(this);
	}

	chooseSong(song) {
		this.socket.emit('add song', song);
		this.setState({ searchResults: [] });
	}

	searchYouTube(queryString) {
		const { accessToken } = this.props;

		if (!queryString)
			return;

		axios.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				access_token: accessToken,
				maxResults: 10,
				part: 'snippet',
				q: queryString,
				type: 'video'
			}
		}).then(response => {
			this.setState({ searchResults: response.data.items });
		});
	}

	render() {
		const { searchResults } = this.state;

		return (
			<div>
				<BasicForm 
					buttonText={'Search'}
					placeholder={'Search YouTube'}
					buttonStyle={'request'}
					inputStyle={'request'}
					submit={queryString => this.searchYouTube(queryString)}/>
				<SongList 
					songs={searchResults}
					onClick={song => this.chooseSong(song)} />
			</div>
		);
	}
 }