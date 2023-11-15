const express = require('express');
const router = express.Router();
const { getVportalToken, getEventId, getStages } = require('../vportal/vportalHelper');

router.use((req, res, next) => {
  res.append('content-type', 'application/json');
  next();
});

router.get('/', async (req, res) => {
  const eventId = await getEventId(token);
  res.status(200).send(eventId);
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

module.exports = router;