const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	res.redirect('index.html');		
});

io.on('connection', (socket) => {
	console.log('Nuevo usuario: ' + socket.id);
	socket.on('message', (data) => {
		let data2 = socket.id + ": " + data;
		socket.emit('message', {message : data2});
		socket.broadcast.emit('message', {message : data2});
	});
});

http.listen(port, () => {
	console.log("Escuchando en el puerto " + port);
});