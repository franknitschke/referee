const { dbMemory } = require('../db/db');
const { getActiveGroups, getActiveAthlets } = require('./vportalHelper');
const { dbGet } = require('../helper');
const socket = require('../app'); //import object
const { refValue } = require('../const');

const competitionData = new Map();

const fetchInterval = +process.env?.FETCH_INTERVAL || 2000;

async function getCompetitionData() {
  //check if there is allready a setIntervall running to prevent multiple intervall functions
  if (competitionData.get('intervall')) return;

  const fetchIntervall = setInterval(async () => {
    const { getVportalData } = await dbGet(dbMemory, 'settings');

    //if !getVportalData clean intervall
    if (!getVportalData) {
      clearInterval(competitionData.get('intervall'));
      competitionData.delete('intervall');
      return;
    }

    const vportalAuth = await dbGet(dbMemory, 'vportalToken');
    const token = vportalAuth?.access_token;
    const competitionId = vportalAuth?.competition?.id;
    //get default Stage ID - change stage over FE in DB
    const competitionStageId = vportalAuth?.defaultStage;

    //fetch only if there is a token and a competition id in DB
    if (token && competitionId && !competitionData.get('fetchIsRunning')) {
      console.time('Timer 1');
      competitionData.set('fetchIsRunning', true); //prevent running multiple fetchs if response is longer than intervall

      const [groups, athlets] = await Promise.all([
        getActiveGroups(competitionId, competitionStageId, token),
        getActiveAthlets(
          competitionId,
          competitionStageId,
          competitionData.get('groupIds'),
          token
        ),
      ]);

      // if promise fail send data from cache???

      competitionData.set(
        'athlets',
        athlets?.data?.competitionAthleteAttemptList?.competitionAthleteAttempts
      );
      competitionData.set(
        'groupIds',
        groups?.data?.competitionGroupList?.competitionGroups?.map(
          (group) => group?.id
        )
      );

      //check if all three judges send decission => block sending next athlets data for sync result and athlet
      !refValue.lock &&
        socket.ioObject.sockets.emit(
          'intervall',
          athlets?.data?.competitionAthleteAttemptList
            ?.competitionAthleteAttempts
        );

      competitionData.set('fetchIsRunning', false);
      console.timeEnd('Timer 1');
      return athlets;
    }
  }, fetchInterval);
  competitionData.set('intervall', fetchIntervall);
}

module.exports = { getCompetitionData, competitionData };
