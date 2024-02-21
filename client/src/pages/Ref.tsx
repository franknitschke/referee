import { useEffect, useState } from 'react';
import { socket } from '../socket';

import RefButton from '../components/RefButton';

import RefButtonLogin from '../components/RefButtonLogin';
import Timekeeper from '../components/Timekeeper';
import Loading from '../components/Loading';
import Light from '../components/Light';
import OnlineStatus from '../components/OnlineStatus';
import { showRating, checkRatingSubmit } from '../helper/helper';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

type Props = {
  isConnected: boolean;
  rating: RatingObject;
  settings: SettingsObject;
};

function Ref({ rating, isConnected, settings }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [ref, setRef] = useState<RefObject | null>(null);

  /* useEffect(() => {
    ref && socket.emit('users', { user: ref?._id });
  }, [ref]); */

  return (
    <>
      {!ref ? (
        <div className='min-h-full min-w-full flex items-center'>
          <RefButtonLogin setToken={setToken} token={token} setRef={setRef} />
        </div>
      ) : !ref ? (
        <Loading />
      ) : ref?._id === 'timekeeper' ? (
        <Timekeeper isConnected={isConnected} rating={rating} token={token} />
      ) : (
        <div className='h-3/5'>
          <div>
            <OnlineStatus isConnected={isConnected} />
          </div>
          <div className='flex flex-col justify-center space-y-2 m-auto px-6 py-2 h-full'>
            <div className='flex flex-row w-2/4 lg:w-1/2 space-x-6 justify-center border border-gray-400 bg-gray-300 rounded p-1 mx-auto'>
              <div className='flex flex-col items-center justify-center w-full m-auto'>
                <Light
                  color={showRating(rating, 'left')}
                  ratingSubmit={checkRatingSubmit(rating, 'left')}
                  ratingColor={rating?.left}
                />
                <div className='h-4'>
                  <ChevronDoubleUpIcon
                    className={`w-4 h-4 text-center m-auto ${
                      ref?._id !== 'left' && 'hidden'
                    }`}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full m-auto'>
                <Light
                  color={showRating(rating, 'main')}
                  ratingSubmit={checkRatingSubmit(rating, 'main')}
                  ratingColor={rating?.main}
                />
                <div className={`h-4`}>
                  <ChevronDoubleUpIcon
                    className={`w-4 h-4 text-center m-auto ${
                      ref?._id !== 'main' && 'hidden'
                    }`}
                  />
                </div>
              </div>
              <div className='flex flex-col items-center justify-center w-full m-auto'>
                <Light
                  color={showRating(rating, 'right')}
                  ratingSubmit={checkRatingSubmit(rating, 'right')}
                  ratingColor={rating?.right}
                />
                <div className='h-4'>
                  <ChevronDoubleUpIcon
                    className={`w-4 h-4 text-center m-auto ${
                      ref?._id !== 'right' && 'hidden'
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className=' space-y-4'>
              <div className='w-full mb-14 mt-1'>
                <RefButton
                  color={'white'}
                  title={'Weiß'}
                  url={`/api/ref/?token=${token}&light=white`}
                  method={'GET'}
                />
              </div>
              <div className='w-full'>
                <RefButton
                  color={'red'}
                  title={'Rot'}
                  url={`/api/ref/?token=${token}&light=red`}
                  method={'GET'}
                />
              </div>
              <div className='w-full'>
                <RefButton
                  color={'blue'}
                  title={'Blau'}
                  url={`/api/ref/?token=${token}&light=blue`}
                  method={'GET'}
                />
              </div>
              <div className='w-full'>
                <RefButton
                  color={'yellow'}
                  title={'Gelb'}
                  url={`/api/ref/?token=${token}&light=yellow`}
                  method={'GET'}
                />
              </div>
            </div>
            {ref?._id === 'main' && !settings?.timekeeper ? (
              <div className='flex flex-row w-full space-x-6'>
                <div className='w-full flex-grow'>
                  <RefButton
                    color={'gray'}
                    title={'Start'}
                    url={`/api/timer?token=${token}&position=main`}
                    method={'POST'}
                  />
                </div>
                <div className='w-full '>
                  <RefButton
                    color={'gray'}
                    title={'Reset'}
                    url={`/api/ref/reset?token=${token}&position=main`}
                    method={'POST'}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Ref;
