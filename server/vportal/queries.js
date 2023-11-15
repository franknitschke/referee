//Get Competition ID
const queryCompetitionId = JSON.stringify({
  query: `
    {
      profile {
        competition {
          id
        }
      }
    }
    `,
});

//Send Ref Result
const mutate = JSON.stringify({
  query: `
          mutation updateCompetitionAthleteAttempt($competitionAthleteAttemptId: ID!, $input: CompetitionAthleteAttemptUpdate!) {
              updateCompetitionAthleteAttempt(
                  competitionAthleteAttemptId: $competitionAthleteAttemptId
                  input: $input
                  ) {
                      id
                      discipline
                      attempt
                      weight
                      status
                      __typename
                  }
              }
              `,
  variables: {
    competitionAthleteAttemptId: '35296',
    input: {
      status: 'valid',
    },
  },
});

//Get Athletes
const queryAthlets = JSON.stringify({
  query: `
          query competitionAthleteAttemptList($competitionId: ID!, $competitionAthleteAttemptListParams: CompetitionAthleteAttemptListParams) {
              competitionAthleteAttemptList(
                  competitionId: $competitionId
                  params: $competitionAthleteAttemptListParams
                  ) {
                      total
                      competitionAthleteAttempts {
                          id
                          index
                          attempt
                          discipline
                          weight
                          status
                          competitionAthlete {
                              id
                              firstName
                              lastName
                              club {
                                  id
                                  name
                                  __typename
                              }
                              team {
                                  id
                                  name
                                  __typename
                              }
                              squatRackHeight
                              squatRackSetup
                              benchPressRackHeight
                              benchPressSafetyHeight
                              benchPressLiftIn
                              benchPressBlocks
                              squatTotal
                              benchPressTotal
                              deadliftTotal
                              calcTotal
                              competitionGroup {
                                  id
                                  name
                                  __typename
                              }
                              competitionAthleteAttempts {
                                  id
                                  index
                                  attempt
                                  discipline
                                  weight
                                  status
                                  __typename
                              }
                              bodyWeightCategory {
                                  id
                                  name
                                  __typename
                              }
                              ageCategory {
                                  id
                                  name
                                  __typename
                              }
                              __typename
                          }
                          __typename
                      }
                      __typename
                  }
              }
              `,
  variables: {
    competitionId: '231',
    competitionAthleteAttemptListParams: {
      filter: {
        competitionGroupId: ['672'],
        competitionStageId: '227',
      },
      limit: 1,
    },
  },
});

//Get Groups
const queryGroups = JSON.stringify({
  query: `
          query competitionGroupList($competitionId: ID!, $competitionGroupListParams: CompetitionGroupListParams) {
              competitionGroupList(
                  competitionId: $competitionId
                  params: $competitionGroupListParams
                  ) {
                      total
                      competitionGroups {
                          id
                          insert
                          update
                          name
                          sortId
                          active
                          __typename
                      }
                      __typename
                  }
              }
              `,
  variables: {
    competitionId: '231',
    competitionAthleteAttemptListParams: {
      filter: {
        competitionGroupId: ['672'],
        competitionStageId: '227',
      },
      limit: 10,
    },
  },
});

//Query Stages
function queryStages(competitionId) {
    return JSON.stringify({
        query: `
              query ($competitionId: ID!, $params: CompetitionStageListParams) {
                  competitionStageList(competitionId: $competitionId, params: $params) {
                      total
                      competitionStages {
                          id
                          insert
                          update
                          name
                          competitionClub {
                              id
                              name
                              __typename
                          }
                          __typename
                      }
                      __typename
                  }
              }
              `,
        variables: {
          competitionId: competitionId,
          params: {
            limit: 25,
            start: 0,
          },
        },
      });

}
/* const getStages = JSON.stringify({
  query: `
        query ($competitionId: ID!, $params: CompetitionStageListParams) {
            competitionStageList(competitionId: $competitionId, params: $params) {
                total
                competitionStages {
                    id
                    insert
                    update
                    name
                    competitionClub {
                        id
                        name
                        __typename
                    }
                    __typename
                }
                __typename
            }
        }
        `,
  variables: {
    competitionId: '266',
    params: {
      limit: 25,
      start: 0,
    },
  },
}); */

module.exports = {
  queryAthlets,
  queryCompetitionId,
  queryGroups,
  queryStages,
  mutate,
};
