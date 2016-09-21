import { SET_CLIENT, UPDATE_STATE } from '../constants'

export const setClient = user => {
	return {
		type: SET_CLIENT,
		payload: user
	}
}

export const updateState = state => {
	return {
		type: UPDATE_STATE,
		payload: state
	}
}