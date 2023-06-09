const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../const');

const bcrypt = require('bcrypt');

const { dbMemory } = require('../db/db');
const { dbFind, dbGet } = require('../helper');

// auth ref by token
router.get('/ref', async function (req, res) {
  const { token } = req.query;
  const ref = await dbFind(dbMemory, 'token', token);

  if (!ref) return res.status(401).send({ msg: 'Unauthorized' });
  return res.status(200).send(ref[0]);
});

// auth admin
router.post('/admin', async function (req, res) {
  const { user, password } = req.body;
  const adminUser = await dbGet(dbMemory, 'admin');

  const passCheck = await bcrypt.compare(password, adminUser?.password);

  if (user === adminUser.name && passCheck) {
    const token = await jwt.sign(
      {
        user: 'admin',
      },
      jwtSecret,
      { expiresIn: '6h' }
    );

    res.header({ 'content-type': 'application/json' });
    return res.status(200).send({ token: token });
  } else {
    return res.status(401).send({ mgs: 'Unauthorized' });
  }
});

module.exports = router;
