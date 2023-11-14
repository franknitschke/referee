const vportalUrl = 'https://dev.vportal-online.de';
const login = '/account/login';
const getToken = '/auth/token';

//EVENT ID: 968
const loginData = {
  identity: '54uvMU',
  credential: 'nQSWW3',
};

async function getVportalToken() {
  const loginReq = await fetch(vportalUrl + login, {
    method: 'POST',
    headers: {
      'Accept-Language': 'de',
    },
    body: JSON.stringify(loginData),
  });

  const cookie = loginReq.headers.get('set-cookie').split(';')[0];

  console.log('Cookie: ', cookie);

  const loginTokenReq = await fetch(vportalUrl + getToken, {
    method: 'GET',
    headers: {
      'Accept-Language': 'de',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cookie': cookie,
      
    },
  });

  const loginTokenRes = await loginTokenReq.text();

  console.log('Res: ', loginTokenRes);
  console.log('Res Status: ', loginTokenReq.status);
}

getVportalToken();
