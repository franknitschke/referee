const express = require('express');
const router = express.Router();
const { refValue } = require('../const');

const { dbMemory } = require('../db/db');
const { dbFind, dbGet, dbAll, cleanObject } = require('../helper');
const {sendRating} = require('../vportal/vportalHelper');
const { competitionData } = require('../vportal/getCompetitionData');

const version = require('../package.json').version;

//referee submit
router.get('/ref', async (req, res) => {
  const { token, light } = req.query;
  const role = await dbFind(dbMemory, 'token', token);

  const settings = await dbGet(dbMemory, 'settings');
  const position = role[0]?._id;

  if (!role || !position) return res.status(403).send({ msg: 'Unauthorized' });
  if (refValue?.lock) return res.status(200).send({ msg: 'No more changes' });

  switch (light) {
    case 'white':
      refValue.white = position;
      break;
    case 'red':
      refValue.red = position;
      break;
    case 'blue':
      refValue.blue = position;
      break;

    case 'yellow':
      refValue.yellow = position;
      break;

    default:
      return res.status(403).send({ msg: 'Unauthorized' });
  }

  res.io.emit('rating', cleanObject(refValue));
  //send rating to vportal
  if(refValue.lock) {
    sendRating(competitionData, refValue.ratingValid)

  }
  if (settings?.autoReset && refValue.lock) {
    refValue.resetTimerRef = setTimeout(() => {
      console.log('Timeout läuft');
      res.io.emit('lastRating', cleanObject(refValue));
      refValue.clearTimer();
      refValue.reset();

      res.io.emit('rating', cleanObject(refValue));
    }, settings?.autoResetTimer * 1000 || 15000);
  }

  res.status(200).send({ msg: 'OK' });
});

//reset rating
router.post('/ref/reset', async (req, res) => {
  const { token, position } = req.query;
  const ref = await dbGet(dbMemory, position);
  if (ref?.token !== token) {
    return res.status(403).send({ msg: 'Unauthorized' });
  } else {
    refValue.clearTimer();
    refValue.clearResetTimer();
    res.io.emit('lastRating', cleanObject(refValue));
    refValue.reset();
    res.io.emit('rating', cleanObject(refValue));
    res.status(200).send({ msg: 'OK' });
  }
});

// timer
router.post('/timer', async (req, res) => {
  const { token, position } = req.query;
  const ref = await dbGet(dbMemory, position);
  if (ref?.token !== token)
    return res.status(403).send({ msg: 'Unauthorized' });

  //if timer allready running
  if (refValue.timerRef) {
    refValue.clearTimer();
  } else {
    //start timer
    refValue.timerRef = setInterval(() => {
      refValue.startTimer();
      res.io.emit('rating', cleanObject(refValue));
    }, 1000);
  }
  res.status(200).send({ msg: 'OK' });
});

//for testing in dev
router.get('/db', async (req, res) => {
  const data = await dbAll(dbMemory);

  res.header({ 'content-type': 'application/json' });
  res.status(200).send(JSON.stringify(data, null, 4));
});

router.get('/app-version', async (req, res) => {
  res.header({ 'content-type': 'application/json' });
  res.status(200).send({appVersion: version});
});

module.exports = router;