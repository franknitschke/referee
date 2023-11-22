const express = require('express');
const router = express.Router();
const getCompetitionData = require('../vportal/getCompetitionData');

const socket = require('../app'); //import object

const { middleware, dbUpdate } = require('../helper');
const { db } = require('../db/db');
const {
  getVportalToken,
  getEventId,
  getStages,
} = require('../vportal/vportalHelper');

//run intervall fetch
//getCompetitionData();

//protect routes
//router.use(middleware);

router.use((req, res, next) => {
  res.append('content-type', 'application/json');
  next();
});

router.get('/', async (req, res) => {
  //socket();
  socket.ioObject.sockets.emit('intervall', 'how are you');
  //console.log('IO: ', test.io);
  //io.socket.emit('test', {test: 'test'})
  res.status(200).send('hallo welt');
});

router.post('/settings', async (req, res) => {
  const body = req.body;

  //set sendRating to false if !shouldFetchData to send no rating if there is no fetching
  if (!shouldFetchData) body.sendRating = false;

  //activate intrvall fetch if shouldFetchData
  if (shouldFetchData) getCompetitionData();

  const settings = await dbUpdate(db, 'settings', body);

  res.status(200).send(settings);
});

router.post('/login', async (req, res) => {
  const body = await req.body;

  const token = await getVportalToken(body);
  const eventId = await getEventId(token?.access_token);
  const stages = await getStages(
    eventId?.data?.profile?.competition?.id,
    token?.access_token
  );

  if (token && eventId) {
    return res.status(200).send({ token, eventId, stages });
  } else {
    res.status(403).send({ msg: 'Unauthorized' });
  }
});

module.exports = router;
