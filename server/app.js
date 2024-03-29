const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const api = require('./routes/api');
const auth = require('./routes/auth');
const settings = require('./routes/settings');
const update = require('./routes/update');
const vportal = require('./routes/vportal');
const cors = require('cors');

const { refValue, users } = require('./const');

const { dbMemory } = require('./db/db');
const { competitionData } = require('./vportal/getCompetitionData');
const { dbGet, cleanObject } = require('./helper');

const ip = require('ip');

const hostIp = process.env.HOST_IP || ip.address();

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
app.use('/api/vportal', vportal);
app.use('/auth', auth);

app.get('/*', (req, res) => {
  res.append('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

io.on('connection', async (socket) => {
  console.log(`🍻 a user connected ID: ${socket.id} - ${new Date()}`);

  //send host ip to clients
  socket.emit('ip', `http://${hostIp}:${port}`);

  //send rating to connecting clients
  socket.emit('rating', cleanObject(refValue));

  //send timer
  socket.emit('timer', refValue?.timer);

  //send settings
  const settings = await dbGet(dbMemory, 'settings');
  socket.emit('settings', settings);

  //send competition data
  socket.emit('intervall', competitionData.get('athletes'));

  socket.on('users', (data) => {
    users.set(socket.id, data);
    const usersOnline = Array.from(users.values());

    io.emit('getUsers', usersOnline);
  });

  socket.on('disconnect', (reason) => {
    users.delete(socket.id);

    const usersOnline = Array.from(users.values());
    io.emit('getUsers', usersOnline);

    console.log(`😪 Disconnect: ${socket.id}`, reason);
  });
});

server.listen(port, () => {
  console.log(`listening on: http://${hostIp}:${port}`);
  console.log(`Node Version: ${process.version}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
