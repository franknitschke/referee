import { Link } from 'react-router-dom';

import Timer from '../components/Timer';
import Alert from '../components/Alert';
import Light from '../components/Light';

import {
  showRating,
  checkRatingSubmit,
  translateDiscipline,
} from '../helper/helper';

type Props = {
  ip: null | string;
  isConnected: boolean;
  rating: RatingObject;
  settings: SettingsObject;
  competitionData: {
    weight: string;
    discipline: string;
    attempt: string;
    competitionAthlete: {
      firstName: string;
      lastName: string;
      team: string;
      bodyWeightCategory: {
        name: string;
      };
      club: {
        name: string;
      };
      ageCategory: {
        name: string;
      };
    };
  }[];
};

function Attempt({
  isConnected,
  rating,
  ip,
  settings,
  competitionData,
}: Props) {

  console.log(competitionData[0]?.competitionAthlete.team)
  return (
    <div className='h-screen w-full bg-black text-white font-semibold  grid grid-cols-12 gap-2'>
      <div
        className='col-span-6 justify-end text-center items-start align-top'
        style={{ fontSize: '14vw' }}
      >
        <Timer time={rating?.timer} />
        
      </div>
      <div className='col-span-6 bg-gray-800 text-left align-middle p-10 m-auto w-full'>
        <div className='text-6xl font-mono '>{`${competitionData[0]?.attempt}. Versuch`}</div>
        <div className='text-9xl'>{`${translateDiscipline(
          competitionData[0]?.discipline
        )}`}</div>
        {competitionData[0]?.competitionAthlete.team ?? <div className='text-5xl'>{`${competitionData[0]?.competitionAthlete?.bodyWeightCategory?.name} - ${competitionData[0]?.competitionAthlete?.ageCategory?.name}`}</div>}
        {/* <div>{JSON.stringify(competitionData)}</div> */}
      </div>
      <div
        className='col-span-6 text-center align-middle m-auto bg-gray-800 w-full'
        style={{ fontSize: '10vw' }}
      >{`${competitionData[0]?.weight},5 KG`}</div>
      <div className='col-span-6 text-7xl p-10'>
        <div className=''>{`${competitionData[0]?.competitionAthlete?.lastName?.toUpperCase()},`}</div>
        <div className=''>{`${competitionData[0]?.competitionAthlete?.firstName?.toLocaleUpperCase()}`}</div>
        <div className='mt-16 text-5xl'>{`${competitionData[0]?.competitionAthlete.team ? competitionData[0]?.competitionAthlete.team : competitionData[0]?.competitionAthlete?.club?.name}`}</div>
      </div>
    </div>
  );
}

export default Attempt;
