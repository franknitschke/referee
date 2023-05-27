const express = require('express');
const router = express.Router();

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

module.exports = router;
