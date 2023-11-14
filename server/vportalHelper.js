const { db, dbMemory } = require('./db/db');
const {dbUpdate, dbGet} = require('./helper');

const vportalUrl = 'https://dev.vportal-online.de';
const login = '/account/login';
const getToken = '/auth/token';




async function getVportalToken(credentials) {

  try {
    const loginReq = await fetch(vportalUrl + login, {
      method: 'POST',
      headers: {
        'Accept-Language': 'de',
      },
      redirect: 'manual',
      body: credentials
    });
  
    const cookie = loginReq.headers.getSetCookie().pop().split(';')[0];
    //const cookie = loginReq.headers.get('set-cookie').split(';')[0];
  
    //console.log('Cookie: ', cookie);
  
    const loginTokenReq = await fetch(vportalUrl + getToken, {
      method: 'GET',
      headers: {
        'Accept-Language': 'de',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': cookie,
      },
    });

    //console.log('Res: ', await loginTokenReq.json());
    //console.log('Res Status: ', loginTokenReq.status);

    
    const loginTokenRes = await loginTokenReq.json();
    console.log('Token: ', loginTokenRes)
    const saveToken = await dbUpdate(db, 'vportalToken', loginTokenRes);
    //const test = await dbGet(db, 'settings');
    console.log('Test: ', saveToken)

    //console.log('Save in DB: ', saveToken);
    return loginTokenRes
  
    
  } catch (error) {
    console.error('Error: ', error)
    return null;
    
  }
  
}

module.exports = {
  getVportalToken
}

//getVportalToken();