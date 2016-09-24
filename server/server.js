import express from 'express'
import http from 'http'
import path from 'path'
import socketio from 'socket.io'

import { newStore } from './store'
import { 
	addUser, removeUser, setDJ,
	addSong, nextSong,
} from './actions'

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

let rooms = {
	// call store with rooms[roomId].store
	// roomId: { store }
}

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', ( req, res ) => { res.sendFile(path.join(__dirname, '../build/index.html')); });

const logout = ( roomId, userId ) => {
	const store = rooms[roomId].store;

	store.dispatch(removeUser(userId));

	// If DJ left the room, set another user as the DJ
	if (userId === store.getState().DJ && store.getState().users.length)
		store.dispatch(setDJ(store.getState().users[0].userId));

	// Last user, remove room after 5 minutes idle time
	if (store.getState().users.length === 0)
		setTimeout(() => {
			if (store.getState().users.length === 0)
				rooms[roomId] = null;
		}, 300000);
}

io.on('connection', socket => {
	const userId = socket.handshake.query['userId'];
	const username = socket.handshake.query['username'];
	let roomId = socket.handshake.query['roomId'];
	let initData = null;

	console.log('A user connected: ', username, 'to room: ', roomId);

	// User reconnects in same session
	// so connect them back to their original room
	if (roomId !== 'null') {
		initData = { ...rooms[roomId].store.getState(), client: { userId, username }};
		socket.join(roomId);
	}

	socket.emit('init', initData);

	socket.on('create room id', roomId => {
		if (rooms[roomId])
			socket.emit('room id auth', false);
		else
			socket.emit('room id auth', true);
	});

	// data = { accessToken, roomId }
	socket.on('create room', data => {
		roomId = data.roomId;
		rooms[roomId] = { store: newStore(data.accessToken, userId) }
		rooms[roomId].store.subscribe(() =>
			io.sockets.in(roomId).emit('state updated', rooms[roomId].store.getState()) 
		);
	});

	socket.on('check room', roomId => {
		if (rooms[roomId])
			socket.emit('room auth', true);
		else
			socket.emit('room auth', false);
	});

	// data = { roomId, username }
	socket.on('check username', data => {
		const { roomId, username } = data;

		const usernameTaken = rooms[roomId].store.getState()
			.users.filter( user => user.username === username ).length;

		if (!usernameTaken)
			socket.emit('username auth', true);
		else
			socket.emit('username auth', false);
	});

	// data = { roomId, user }
	socket.on('login', data => {
		roomId = data.roomId;
		socket.join(roomId);
		rooms[roomId].store.dispatch(addUser(data.user));

		// Person joined an empty room, that he did not create
		if (rooms[roomId].store.getState().users.length === 1)
			rooms[roomId].store.dispatch(setDJ(data.user.userId));
	});

	socket.on('set DJ', userId => rooms[roomId].store.dispatch(setDJ(userId)) );
	socket.on('add song', song => rooms[roomId].store.dispatch(addSong(song)) );
	socket.on('next song', () => rooms[roomId].store.dispatch(nextSong()) );
	
	socket.on('logout', () => logout(roomId, userId));
	socket.on('disconnect', () => {
		if (roomId !== 'null')
			logout(roomId, userId)
	});
});

server.listen(PORT, () => console.log('Server listening on', PORT) );

export default server