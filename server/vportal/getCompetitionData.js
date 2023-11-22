const { dbMemory, db } = require('../db/db');
const {
  getStages,
  getActiveGroups,
  getActiveAthlets,
} = require('./vportalHelper');
const { dbGet } = require('../helper');
const socket = require('../app'); //import object

const competitionData = new Map();

async function getCompetitionData() {
  const shouldFetchData = await dbGet(db, 'settings');

  if (!shouldFetchData?.getVportalData) {
    // change in true
    const vportalAuth = await dbGet(db, 'vportalToken');
    const token = vportalAuth?.access_token;
    const competitionId = vportalAuth?.competition?.id;
    //get default Stage ID - change stage over FE in DB
    const competitionStageId = vportalAuth?.defaultStage;

    //get Stages and save in map => aktive Stage noch in DB speichern, sonst muss man diese immer wieder auswählen
    /* const stages = await getStages(competitionId, token);
        competitionData.set(
          'stages',
          stages?.data?.competitionStageList?.competitionStages
        );
        competitionData.set(
          'stageIds',
          stages?.data?.competitionStageList?.competitionStages?.map(
            (stages) => stages.id
          )
        ); */

    //get active groups and save in map
    /* const groups = await getActiveGroups(
        competitionId,
        competitionStageId,
        token
      );
      competitionData.set('groups', groups);
      competitionData.set(
        'groupIds',
        groups?.data?.competitionGroupList?.competitionGroups?.map(
          (groups) => groups.id
        )
      );

      //get active athlets
      const athlets = await getActiveAthlets(
        competitionId,
        competitionStageId,
        competitionData.get('groupIds'),
        token
      );
      competitionData.set('athlets', athlets);

      socket.ioObject.sockets.emit('intervall', 'how are you');

      console.log('Groups: ', competitionData.get('groups'));
      console.log('Athlets: ', competitionData.get('athlets')); */
    //console.log('Stages: ', competitionData.get('stageIds'));
    //console.log('IO: ', io);

    //io.socket.emit('intervall', {test: 'test'});
    let n = 0;
    let isRunning = false
    const fetchIntervall = setInterval(async () => {
      if (token && competitionId) {
        console.time('Timer 1');
        isRunning = true;
        console.log('isRunning: ', isRunning);

        const [groups, athlets] = await Promise.all([
          getActiveGroups(competitionId, competitionStageId, token),
          getActiveAthlets(
            competitionId,
            competitionStageId,
            competitionData.get('groupIds'),
            token
          ),
        ])
        
        //get active groups and save in map
        /* const groups = await getActiveGroups(
            competitionId,
            competitionStageId,
            token
          );
          competitionData.set('groups', groups);
          competitionData.set(
            'groupIds',
            groups?.data?.competitionGroupList?.competitionGroups?.map(
              (groups) => groups.id
            )
          ); */

        //get active athlets
        /* const athlets = await getActiveAthlets(
            competitionId,
            competitionStageId,
            competitionData.get('groupIds'),
            token
          );
          competitionData.set('athlets', athlets); */
        n++;
        //socket.ioObject.sockets.emit('intervall', 'how are you');

        console.log('Groups: ', competitionData.get('groups'));
        console.log('Athlets: ', competitionData.get('athlets'));

        console.log(
          'athlets',
          athlets?.data?.competitionAthleteAttemptList
            ?.competitionAthleteAttempts
        );
        socket.ioObject.sockets.emit(
          'intervall',
          athlets?.data?.competitionAthleteAttemptList
            ?.competitionAthleteAttempts
        );
        console.log('N: ', n);
        n >= 4 && clearInterval(competitionData.get('intervall'));
        console.timeEnd('Timer 1');
        return athlets;
      }
    }, 10000);
    competitionData.set('intervall', fetchIntervall);

    return;
  }
}

module.exports = getCompetitionData;
