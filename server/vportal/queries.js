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
function setResult(competitionAthleteAttemptId, result) {
  return JSON.stringify({
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
      competitionAthleteAttemptId: competitionAthleteAttemptId,
      input: {
        status: result,
      },
    },
  });
}

//Get Athletes competitionGroupId is array
function queryAthlets(competitionId, competitionStageId, competitionGroupId) {
  return JSON.stringify({
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
    competitionId: competitionId,
    competitionAthleteAttemptListParams: {
      filter: {
        competitionGroupId: competitionGroupId,
        competitionStageId: competitionStageId,
      },
      limit: 3,
    },
  },
})};

//Get Groups
function queryGroups(competitionId, competitionStageId) {
  return JSON.stringify({
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
      competitionId: competitionId,
      competitionAthleteAttemptListParams: {
        filter: {
          competitionGroupId: ['672'],
          competitionStageId: competitionStageId,
        },
        limit: 10,
      },
    },
  });
}

//Get active Groups !!!!!!!
function queryActiveGroup(competitionId, competitionStageId) {
  return JSON.stringify({
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
      competitionId: competitionId,
      competitionGroupListParams: {
        filter: {
          competitionStageId: competitionStageId,
          active: true,
        },
      },
    },
  });
}

//Get next athlets
function queryNextAthlet(
  competitionId,
  competitionStageId,
  competitionGroupId
  
) {
  return JSON.stringify({
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
                                  benchPressTotaldeadliftTotal
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
                                      weightstatus
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
      competitionId: competitionId,
      competitionAthleteAttemptListParams: {
        filter: {
          competitionGroupId: competitionGroupId,
          competitionStageId: competitionStageId,
        },
        limit: 10,
      },
    },
  });
}

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

module.exports = {
  queryAthlets,
  queryCompetitionId,
  queryGroups,
  queryStages,
  queryActiveGroup,
  queryNextAthlet,
  queryAthlets,
  setResult
};
