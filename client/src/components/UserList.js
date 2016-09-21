import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/UserList.css'

@connect (
	state => ({
		client: state.client,
		DJ: state.DJ,
		users: state.users
	})
)

export default class UserList extends Component {
	constructor(props) {
		super(props);

		this.socket = this.props.socket;

		this.isDJ = this.isDJ.bind(this);
		this.setDJ = this.setDJ.bind(this);
	}

	isDJ(user) {
		const { DJ } = this.props;

		return user.userId === DJ ? ' DJ' : '';
	}

	setDJ(userId) {
		this.socket.emit('set DJ', userId);
	}

	render() {
		const { client, DJ, users } = this.props;

		return (
			<div>
				{ users.map(user =>
					// <User user={user} />
					<div key={user.username} className={'user' + this.isDJ(user)}>
						{ client.userId === DJ && client.username !== user.username
							? <button className='setDJ'
								onClick={() => this.setDJ(user.userId)}>
								Set DJ
							</button>
							: null
						}
						<span>{ user.username }</span>
					</div>
				)}
			</div>
		);
	}
}