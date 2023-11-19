const { dbMemory, db } = require('../db/db');
const { getStages, getActiveGroups, getActiveAthlets } = require('./vportalHelper');
const { dbGet } = require('../helper');

const competitionData = new Map();

async function getCompetitionData(io) {
  const vportalAuth = await dbGet(dbMemory, 'vportalToken');
  const token = vportalAuth?.access_token;
  const competitionId = vportalAuth?.competition?.id;

  if (token && competitionId) {
    //get Stages and save in map => aktive Stage noch in DB speichern, sonst muss man diese immer wieder auswählen
    const stages = await getStages(competitionId, token);
    competitionData.set(
      'stages',
      stages?.data?.competitionStageList?.competitionStages
    );
    competitionData.set(
      'stageIds',
      stages?.data?.competitionStageList?.competitionStages?.map(
        (stages) => stages.id
      )
    );

    //get active groups and save in map
    const groups = await getActiveGroups(
      competitionId,
      '274',
      token
    );
    competitionData.set('groups', groups);
    competitionData.set('groupIds', groups?.data?.competitionGroupList?.competitionGroups?.map(groups => groups.id));

    //get active athlets
    const athlets = await getActiveAthlets(competitionId, '274', competitionData.get('groupIds'), token);
    competitionData.set('athlets', athlets);

    console.log('Groups: ', competitionData.get('groups'));
    console.log('Athlets: ', competitionData.get('athlets'));
    console.log('Stages: ', competitionData.get('stageIds'));
    console.log('IO: ', io);

    //io.socket.emit('intervall', {test: 'test'});

    return athlets;
  } else {
    return null;
  }
  /* const stages = await getStages(competitionId, token)
    console.log('token: ', token);
    console.log('ID: ', competitionId); */
}

module.exports = getCompetitionData;
