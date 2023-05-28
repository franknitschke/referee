const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { db, dbMemory } = require('../db/db');
const {
  dbFind,
  dbGet,
  dbAll,
  dbUpdate,
  cleanObject,
  cleanSettingsBody,
} = require('../helper');

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
  cleanSettingsBody(body);
  const updatedDoc = await dbUpdate(db, 'settings', body);

  if (!updatedDoc) return res.status(500).send('Error');
  res.io.emit('settings', updatedDoc);
  res.status(200).send('OK');
});

//edit ref tokens
router.post('/update/ref', async (req, res) => {
  const { id, token } = req.body;
  const payload = { token: token };
  //check if token allready exists - sanitize
  const data = await dbUpdate(db, id, payload);
  if (!data) return res.status(403).send('Unauthorized');

  res.header({ 'content-type': 'application/json' });
  res.status(200).send(JSON.stringify(data, null, 4));
});

//edit admin account
router.post('/update/admin', async (req, res) => {
  const { name, password } = req.body;
  if (name.length < 4 || password.length < 6)
    return res.status(500).send('Error');
  const hashPassword = await bcrypt.hash(password.trim(), saltRounds);
  const payload = { name: name.trim(), password: hashPassword };
  //console.log('Payload: ', payload);
  const updateAdmin = await dbUpdate(db, 'admin', payload);
  if (!updateAdmin) return res.status(500).send('Error');

  console.log('Admin Update: ', updateAdmin);
  res.status(200).send('Admin updated!');
});

module.exports = router;
