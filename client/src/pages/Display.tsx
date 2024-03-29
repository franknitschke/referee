import { Link } from 'react-router-dom';

import Timer from '../components/Timer';
import Alert from '../components/Alert';
import Light from '../components/Light';
import Attempt from '../components/Attempt';

import { showRating, checkRatingSubmit } from '../helper/helper';

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
    };
  }[];
};

function Display({
  isConnected,
  rating,
  ip,
  settings,
  competitionData,
}: Props) {
  return (
    <div className='h-screen w-full bg-black text-red-600  font-semibold justify-center grid grid-cols-3 gap-2 items-center px-4 overflow-hidden cursor-none'>
      {!settings?.hideCountdown && (
        <>
          <div
            className='col-span-3 m-auto' style={{fontSize: '9vw'}}
          >
            <Timer time={rating?.timer} />
          </div>
          <div className='col-span-3 m-auto w-full'>
            <Attempt competitionData={competitionData} />
          </div>
        </>
      )}

      <div className='col-span-1 z-10'>
        <Light
          color={showRating(rating, 'left')}
          ratingSubmit={checkRatingSubmit(rating, 'left')}
          ratingColor={rating?.left}
        />
      </div>
      <div className='col-span-1 z-10'>
        <Light
          color={showRating(rating, 'main')}
          ratingSubmit={checkRatingSubmit(rating, 'main')}
          ratingColor={rating?.main}
        />
      </div>
      <div className='col-span-1 z-10'>
        <Light
          color={showRating(rating, 'right')}
          ratingSubmit={checkRatingSubmit(rating, 'right')}
          ratingColor={rating?.right}
        />
      </div>

      {!isConnected && (
        <div className='col-span-3 absolute bottom-8 left-2 w-10/12 px-2 text-5xl text-white'>
          <Alert />
        </div>
      )}

      <div className='flex items-center absolute left-0 bottom-0 pb-2 pl-2 w-10/12 z-20 cursor-pointer'>
        <div className='text-base text-gray-200 opacity-25 mr-4'>{ip}</div>

        <div className='text-base text-gray-200 opacity-25'>
          <Link
            to='/'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Display;
