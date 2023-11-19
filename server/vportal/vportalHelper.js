const { db, dbMemory,  } = require('../db/db');
const { dbUpdate, dbGet, dbRemoveDoc } = require('../helper');

const { queryCompetitionId, queryStages, queryActiveGroup, queryAthlets } = require('./queries');

const vportalUrl = 'https://dev.vportal-online.de';
const login = '/account/login';
const getToken = '/auth/token';
const apiUrl = '/graphql';

async function getEventId(token) {
  try {
    const req = await fetch(vportalUrl + apiUrl, {
      headers: {
        'content-type': 'application/json',
        'Accept-Language': 'de',
        Authorization: `Bearer ${token}`,
      },
      body: queryCompetitionId,
      method: 'POST',
    });

    if (req?.ok) {
      const res = await req.json();
      await dbUpdate(db, 'vportalToken', res?.data?.profile);
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error WK ID: ', error);
    return null;
  }
}

async function getStages(competitionId, token) {
  try {
    const req = await fetch(vportalUrl + apiUrl, {
      headers: {
        'content-type': 'application/json',
        'Accept-Language': 'de',
        Authorization: `Bearer ${token}`,
      },
      body: queryStages(competitionId),
      method: 'POST',
    });

    //console.log('Stages Query: ', req);

    if (req?.ok) {
      const res = await req.json();
      await dbUpdate(db, 'vportalToken', res?.data);
      await dbUpdate(db, 'vportalToken', {defaultStage: res?.data?.competitionStageList?.competitionStages[0]?.id});
      //await dbUpdate(dbCompetition, 'stages', res?.data?.profile);
      //console.log('Stages: ', req.text());
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

}

async function getActiveGroups(competitionId, competitionStageId, token) {
  try {
    const req = await fetch(vportalUrl + apiUrl, {
      headers: {
        'content-type': 'application/json',
        'Accept-Language': 'de',
        Authorization: `Bearer ${token}`,
      },
      body: queryActiveGroup(competitionId, competitionStageId),
      method: 'POST',
    });

    //console.log('Stages Query: ', req);

    if (req?.ok) {
      const res = await req.json();
      //await dbUpdate(dbCompetition, 'stages', res?.data?.profile);
      //console.log('Stages: ', req.text());
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

}

async function getActiveAthlets(competitionId, competitionStageId, competitionGroupId, token) {
  try {
    const req = await fetch(vportalUrl + apiUrl, {
      headers: {
        'content-type': 'application/json',
        'Accept-Language': 'de',
        Authorization: `Bearer ${token}`,
      },
      body: queryAthlets(competitionId, competitionStageId, competitionGroupId),
      method: 'POST',
    });

    //console.log('Stages Query: ', req);

    if (req?.ok) {
      const res = await req.json();
      //await dbUpdate(dbCompetition, 'stages', res?.data?.profile);
      //console.log('Stages: ', req.text());
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

}

async function getVportalToken(body) {
  const loginCredentials = new FormData();
  loginCredentials.append('identity', body?.identity);
  loginCredentials.append('credential', body?.credential);

  //remove existing token in db
  await dbRemoveDoc(db, 'vportalToken')

  try {
    const loginReq = await fetch(vportalUrl + login, {
      method: 'POST',
      headers: {
        'Accept-Language': 'de',
      },
      redirect: 'manual',
      body: loginCredentials,
    });

    const cookie = loginReq.headers.getSetCookie().pop().split(';')[0];

    const loginTokenReq = await fetch(vportalUrl + getToken, {
      method: 'GET',
      headers: {
        'Accept-Language': 'de',
        'Accept-Encoding': 'gzip, deflate, br',
        Cookie: cookie,
      },
    });

    const loginTokenRes = await loginTokenReq.json();

    await dbUpdate(db, 'vportalToken', loginTokenRes);

    return loginTokenRes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getVportalToken,
  getEventId,
  getStages,
  getActiveGroups,
  getActiveAthlets
};
