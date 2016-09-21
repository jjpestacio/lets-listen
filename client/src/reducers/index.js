import { combineReducers } from 'redux'

import { SET_CLIENT, UPDATE_STATE } from '../constants'

//----------- Synced --------------//
 
const accessToken = ( state=null, action ) => {
	switch (action.type) {
		case UPDATE_STATE: {
			console.log('State updated: ', action.payload)
			return action.payload.accessToken;
		}

		default:
			return state;
	}
}

const DJ = ( state=[], action ) => {
	switch (action.type) {
		case UPDATE_STATE:
			return action.payload.DJ;

		default:
			return state;
	}
}

const queue = ( state=[], action ) => {
	switch (action.type) {
		case UPDATE_STATE:
			return action.payload.queue;

		default:
			return state;
	}
}

const users = ( state=[], action ) => {
	switch (action.type) {
		case UPDATE_STATE:
			return action.payload.users;

		default:
			return state;
	}
}

//----------- Local --------------//

const client = ( state=null, action ) => {
	switch (action.type) {
		case SET_CLIENT:
			return action.payload;

		default:
			return state;
	}
}

export default combineReducers({
	accessToken,
	client,
	DJ,
	queue,
	users,
});