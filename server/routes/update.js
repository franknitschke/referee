const express = require('express');
const router = express.Router();
const simpleGit = require('simple-git');

const { exec } = require('node:child_process');

const { middleware } = require('../helper');

//protect routes
router.use(middleware);

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

async function gitFetch() {
  try {
    return await git.fetch();
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

//check for updates
router.get('/status', async (req, res) => {
  const fetch = await gitFetch();
  console.log('Fetch: ', fetch);
  const status = await gitStatus();
  console.log('Status: ', status);

  if (status.behind === 0) {
    return res.status(200).send({
      msg: 'Keine Updates Verfügbar',
      flag: false,
      v: process.env.npm_package_version,
      link: 'https://github.com/franknitschke/referee/releases',
    });
  } else {
    return res.status(200).send({
      msg: 'Neues Updates Verfügbar',
      flag: true,
      v: process.env.npm_package_version,
      link: 'https://github.com/franknitschke/referee/releases',
    });
  }
});

//update
router.post('/', async (req, res) => {
  const status = await gitPull();
  console.log('Git Pull: ', status);

  try {
    if (status) {
      exec('npm i', (error, stdout, stderr) => {
        if (error) {
          console.log(`Error: ${error}`);
          return res
            .status(500)
            .send({ msg: 'Es ist ein Fehler aufgetreten!' });
        }
        if (stdout) {
          console.log(`Konsole: ${stdout}`);
          return res.status(200).send({ msg: 'Update erfolgreich!' });
        }
        if (stderr) {
          console.log(`Error: ${stderr}`);
          return res
            .status(500)
            .send({ msg: 'Es ist ein Fehler aufgetreten!' });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Es ist ein Fehler aufgetreten' });
  }
});

module.exports = router;
