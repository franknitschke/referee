const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const api = require('./routes/api');
const auth = require('./routes/auth');
const settings = require('./routes/settings');
const update = require('./routes/update');
const cors = require('cors');

const { refValue, users } = require('./const');

const { dbMemory } = require('./db/db');
const { dbGet, cleanObject } = require('./helper');

const ip = require('ip');

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*', //'http://localhost:3000',
  },
});

const port = process.env.PORT || 3030;

var corsOptions = {
  origin: '*', //'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use('/api', api);
app.use('/api/settings', settings);
app.use('/api/update', update);
app.use('/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

io.on('connection', async (socket) => {
  console.log(`🍻 a user connected ID: ${socket.id} - ${new Date()}`);
  //console.log('Socket Obj: ', socket);

  //send host ip to clients
  socket.emit('ip', `http://${ip.address()}:${port}`);

  //send rating to connecting clients
  socket.emit('rating', cleanObject(refValue));

  //send timer
  socket.emit('timer', refValue?.timer);

  //send settings
  const settings = await dbGet(dbMemory, 'settings');
  socket.emit('settings', settings);

  socket.on('users', (data) => {
    console.log('Läuft', new Date());
    users.set(socket.id, data);
    const usersOnline = Array.from(users.values());

    io.emit('getUsers', usersOnline);
  });

  //FABIO
  socket.on('competition', (data) => {
    console.log('Competition: ', data);

    io.emit('competitionData', data);
  });

  socket.on('disconnect', (reason) => {
    users.delete(socket.id);
    //console.log('Map: ', Array.from(users.entries()));
    console.log(`😪 Disconnect: ${socket.id}`, reason);
  });
});

io.on('disconnect', (socket) => {
  users.delete(socket.id);
  console.log(`Client disconnected - ID: ${socket.id} - ${new Date()}`);
});

server.listen(port, () => {
  console.log(`listening on: http://${ip.address()}:${port}`);
});
