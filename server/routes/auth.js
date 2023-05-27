const express = require('express');
const router = express.Router();

const { dbMemory } = require('../db/db');
const { dbFind } = require('../helper');

// Home page route.
router.get('/ref', async function (req, res) {
  const { token } = req.query;
  const ref = await dbFind(dbMemory, 'token', token);
  //console.log('log ref: ', ref);
  if (!ref) return res.status(401).send('Unauthorized');
  return res.status(200).send(ref[0]);
});

module.exports = router;
