const express = require('express');
const router = express.Router();
const simpleGit = require('simple-git');

const path = require('path');

const { exec, execFile, spawn } = require('node:child_process');

const { middleware } = require('../helper');
//const { error } = require('node:console');
//const { stdout, stderr } = require('node:process');

//protect routes
//router.use(middleware);

router.use((req, res, next) => {
  res.append('content-type', 'application/json');
  next();
});

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git = simpleGit(options);

async function gitStatus() {
  try {
    return await git.status();
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function gitPull() {
  try {
    return await git.pull();
  } catch (error) {
    console.error(error);
    return error;
  }
}

router.get('/status', async (req, res) => {
  const status = await gitStatus();

  if (status.behind === 0) {
    return res.status(200).send({
      msg: 'Keine Updates Verfügbar',
      v: process.env.npm_package_version,
      link: 'https://github.com/franknitschke/referee/releases',
    });
  } else {
    return res.status(200).send({
      msg: 'Neues Updates Verfügbar',
      v: process.env.npm_package_version,
      link: 'https://github.com/franknitschke/referee/releases',
    });
  }

  //GEHT
  /* exec('npm i', (error, stdout, stderr) => {
    if (error) console.log(`Error: ${error}`);
    if (stdout) console.log(`Konsole: ${stdout}`);
    if (stderr) console.log(`Error: ${stderr}`);
  }); */

  //console.log(JSON.stringify(process.env.npm_package_version));

  //GEHT
  /* exec(path.join(__dirname, '..', 'script.sh'), function (err, stdout, stderr) {
    if (err) console.log(`Error: `, err);
    if (stdout) console.log(`Konsole: `, stdout);
    if (stderr) console.log(`Error: `, stderr);
  }); */

  //res.status(200).send(JSON.stringify(status.behind, null, 4));
});

router.post('/', async (req, res) => {
  const status = await gitPull();
  console.log('Git Pull: ', status);

  if (status) {
    exec('npm i', (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error}`);
        return res.status(500).send({ msg: 'Es ist ein Fehler aufgetreten!' });
      }
      if (stdout) {
        console.log(`Konsole: ${stdout}`);
        return res.status(200).send({ msg: 'Update erfolgreich!' });
      }
      if (stderr) {
        console.log(`Error: ${stderr}`);
        return res.status(500).send({ msg: 'Es ist ein Fehler aufgetreten!' });
      }
    });
  }

  res.status(500).send({ msg: 'Es ist ein Fehler aufgetreten' });
});

module.exports = router;
