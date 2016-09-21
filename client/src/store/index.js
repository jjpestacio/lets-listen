import { createStore } from 'redux'

import reducer from '../reducers'

const initialState = {
	// Synced
	accessToken: null,
	DJ: null,
	users: [],
	queue: [],
	
	// Local
	client: null, // User Info
}

export const newStore = () => {
	return createStore(reducer, initialState);
}
