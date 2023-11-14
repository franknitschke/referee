const express = require('express');
const router = express.Router();
const { getVportalToken } = require('../vportalHelper');



router.use((req, res, next) => {
  res.append('content-type', 'application/json');
  next();
});

router.get('/', async (req, res) => {
  res.send('OK');
});

router.post('/login', async (req, res) => {
  const body = req.body;
  const token = await getVportalToken(body);

  if (token) {
    return res.status(200).send(token);
  } else {
    res.status(403).send({ msg: 'Unauthorized' });
  }
});

module.exports = router;
