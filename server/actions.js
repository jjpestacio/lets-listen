import { 
	ADD_USER, REMOVE_USER, SET_DJ,
	ADD_SONG, NEXT_SONG,
} from './constants'

export const addSong = song => {
	return {
		type: ADD_SONG,
		payload: song
	}
}

export const addUser = user => {
	return {
		type: ADD_USER,
		payload: user
	}
}

export const nextSong = () => {
	return {
		type: NEXT_SONG,
		payload: null
	}
}

export const removeUser = socketId => {
	return {
		type: REMOVE_USER,
		payload: socketId
	}
}

export const setDJ = userId => {
	return {
		type: SET_DJ,
		payload: userId
	}
}