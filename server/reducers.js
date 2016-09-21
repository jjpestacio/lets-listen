import { combineReducers } from 'redux'

import { 
	ADD_USER, REMOVE_USER, SET_DJ,
	ADD_SONG, NEXT_SONG
} from './constants'

const accessToken = ( state=null, action ) => {
	switch (action.type) {
		default:
			return state;
	}
}

const DJ = ( state=null, action ) => {
	switch (action.type) {
		case SET_DJ:
			return action.payload;

		default:
			return state;
	}
}

const queue = ( state=[], action ) => {
	switch (action.type) {
		case ADD_SONG:
			return [ ...state, action.payload ];

		case NEXT_SONG:
			return state.slice(1, state.length);

		default:
			return state;
	}
}

const users = ( state=[], action ) => {
	switch (action.type) {
		case ADD_USER:
			return [ ...state, action.payload ];

		case REMOVE_USER: 
			return state.filter( user => user.userId !== action.payload );

		default:
			return state;
	}
}

export default combineReducers({
	accessToken,
	DJ,
	queue,
	users
});