const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-adapter-memory'));

const { dbInit } = require('../helper');

//persistent database
const db = new PouchDB('./db/database');

//clone from database above as in memory cache
const dbMemory = new PouchDB('myDB', { adapter: 'memory' });

//db for competition stuff from vportal
//const dbCompetition = new PouchDB('competitionDB', { adapter: 'memory' });

db.replicate.to(dbMemory, {
  live: true,
  retry: true,
});

const doc = [
  {
    _id: 'admin',
    name: 'admin',
    role: 'admin',
    password: '$2a$10$f6DCKDU18EwgNWBPnRVqZu6szCqsMQFXw3OQJYlBDQStdcuzqIoUK',
  },
  {
    _id: 'left',
    position: 'left',
    token: '4711',
    role: 'ref',
  },
  {
    _id: 'right',
    position: 'right',
    token: '6969',
    role: 'ref',
  },
  {
    _id: 'main',
    position: 'main',
    token: '6666',
    role: 'ref',
  },
  {
    _id: 'settings',
    refMenu: false,
    autoReset: true,
    autoResetTimer: 20,
  },
];

//Init DB if empty
dbInit(db, doc);

//init empty in memory db for competition stuff
//dbInit(dbCompetition, []);

module.exports = { db, dbMemory };
