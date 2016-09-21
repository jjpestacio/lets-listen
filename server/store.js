import { createStore } from 'redux'

import reducer from './reducers'

// Skeleton for new user
const user = {
	username: null,
	userId: null
}

// Skeleton for initial state
const initialState = {
	accessToken: null,
	DJ: null, // userId
	queue: [],
	users: [],
}

export const newStore = ( accessToken, userId ) => {
	return createStore(reducer, {
		...initialState,
		accessToken, 
		DJ: userId
	});
}
