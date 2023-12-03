const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { db, dbMemory } = require('../db/db');
const {
  dbFind,
  dbUpdate,
  cleanSettingsBody,
  middleware,
} = require('../helper');

const getCompetitionData = require('../vportal/getCompetitionData');

//protect routes
router.use(middleware);

//settings
router.get('/', async (req, res) => {
  const { field, value } = req.query;
  const data = await dbFind(dbMemory, `${field}`, `${value}`);

  res.header({ 'content-type': 'application/json' });
  res.status(200).send(JSON.stringify(data, null, 4));
});

// change settings
router.post('/', async (req, res) => {
  const body = req.body;

  //set sendRating to false if !getVportalData to send no rating if there is no fetching
  if (!body?.getVportalData) body.sendRating = false;

  //activate intervall fetch if getVportalData
  if (body?.getVportalData) getCompetitionData();
  
  cleanSettingsBody(body);
  const updatedDoc = await dbUpdate(db, 'settings', body);

  if (!updatedDoc) return res.status(500).send({ msg: 'Error' });
  res.io.emit('settings', updatedDoc);
  res.status(200).send({ msg: 'OK' });
});

//edit ref tokens
router.post('/update/ref', async (req, res) => {
  const { id, token } = req.body;

  if (token.length < 4)
    return res.status(500).send({ msg: 'Token to short! Min. 4 Chars!' });
  const payload = { token: `${token?.trim()}` };

  //check if token allready exists - for each ref we need unique token
  const tokenExists = await dbFind(dbMemory, 'token', `${token}`);
  if (tokenExists)
    return res.status(500).send({ msg: 'Token allready exists!' });

  const data = await dbUpdate(db, `${id}`, payload);
  if (!data)
    return res.status(500).send({ msg: 'Es ist ein Fehler aufgetreten' });

  res.header({ 'content-type': 'application/json' });
  res.status(200).send(data);
});

//edit admin account
router.post('/update/admin', async (req, res) => {
  const { name, password } = req.body;

  if (name.length < 4 || password.length < 6) {
    return res.status(500).send({ msg: 'Error' });
  }
  const hashPassword = await bcrypt.hash(password.trim(), saltRounds);
  const payload = { name: name.trim(), password: hashPassword };

  const updateAdmin = await dbUpdate(db, 'admin', payload);
  if (!updateAdmin) return res.status(500).send({ msg: 'Error' });

  res.header({ 'content-type': 'application/json' });
  res.status(200).send({ msg: 'Admin updated!' });
});

module.exports = router;
