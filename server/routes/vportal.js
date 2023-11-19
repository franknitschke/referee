const express = require('express');
const router = express.Router();
const getCompetitionData = require('../vportal/getCompetitionData');
const socket = require('../app');//import object



const path = require('path');


//const { fork } = require('child_process');
const { getVportalToken, getEventId, getStages } = require('../vportal/vportalHelper');

/* const myFork = fork(path.join(__dirname, '../vportal/childGetData.js'));
myFork.send('start');
myFork.on('message', (data) => {
    console.log(data)
    io.emit('intervall', data)
}) */

router.use((req, res, next) => {
  res.append('content-type', 'application/json');
  next();
});

router.get('/', async (req, res) => {
   //socket();
   socket.ioObject.sockets.emit("intervall", "how are you");
   //console.log('IO: ', test.io);
   //io.socket.emit('test', {test: 'test'})
  res.status(200).send('hallo welt');
});

router.get('/kill', async (req, res) => {
   //myFork.kill();
    res.status(200).send({msg: 'OK'});
  });

  router.get('/start', async (req, res) => {
   //myFork.send('start');
    res.status(200).send({msg: 'OK'});
  });

router.post('/login', async (req, res) => {
  const body = await req.body;

  const token = await getVportalToken(body);
  const eventId = await getEventId(token?.access_token);
  const stages = await getStages(eventId?.data?.profile?.competition?.id, token?.access_token)

  if (token && eventId) {
    return res.status(200).send({ token, eventId, stages });
  } else {
    res.status(403).send({ msg: 'Unauthorized' });
  }
});

//getCompetitionData();

module.exports = router;