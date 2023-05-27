import React from 'react';

function Test({ competitionData }) {
  return <div>{JSON.stringify(competitionData, null, 4)}</div>;
}

export default Test;
