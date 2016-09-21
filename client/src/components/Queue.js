import React, { Component } from 'react'
import { connect } from 'react-redux'

import SongList from './SongList'

@connect(
	state => ({
		queue: state.queue
	})
)

export default class Queue extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { queue } = this.props;
	
		return (
			<div>
				<SongList songs={queue.slice(1, queue.length)} />
			</div>
		)
	}
}