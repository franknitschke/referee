const express = require('express');
const router = express.Router();
const simpleGit = require('simple-git');

const { execFile, spawn } = require('node:child_process');

const { middleware } = require('../helper');

//protect routes
//router.use(middleware);

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

router.get('/status', async (req, res) => {
  const status = await gitStatus();
  console.log(new Date());
  /* const child = execFile('npm', ['install'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    console.log(stderr);
  }); */
  spawn('npm', ['install'], {
    cwd: __dirname, // <---
    shell: true,
    stdio: 'inherit',
  });

  //console.log(npm);

  //console.log(JSON.stringify(process.env.npm_package_version));

  res.header({ 'content-type': 'application/json' });
  res.status(200).send(JSON.stringify(status, null, 4));
});

module.exports = router;
