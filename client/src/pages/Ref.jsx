import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { socket } from '../socket';

import RefButton from '../components/RefButton';

import RefButtonLogin from '../components/RefButtonLogin';
import Loading from '../components/Loading';
import Light from '../components/Light';
import { showRating, checkRatingSubmit } from '../helper/helper';
import { CheckIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

function Ref({ rating, id }) {
  const [token, setToken] = useState(null);
  const [ref, setRef] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get('token'));
    if (searchParams.get('token')) {
      setToken(searchParams.get('token'));
      //handleSubmit();
    } else if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      //handleSubmit();
    }
    //setToken(localStorage.getItem('token'));
  }, [searchParams]);

  useEffect(() => {
    console.log('Token ', token);
    token && handleSubmit();
  }, [token]);

  useEffect(() => {
    ref && socket.emit('users', { user: ref?._id });
    console.log('socket id: ', id);
    console.log('Ref: ', ref);
  }, [ref]);

  async function handleSubmit() {
    try {
      const req = await fetch(`http://localhost:3030/auth/ref?token=${token}`);
      if (req.ok) {
        const res = await req.json();
        console.log('Res: ', res);
        setRef(res);
        socket.emit('users', { user: ref?._id });
        localStorage.setItem('token', token);
      }
    } catch (error) {}
  }

  return (
    <>
      {!ref ? (
        <div className='min-h-full min-w-full flex items-center'>
          <RefButtonLogin handleSubmit={handleSubmit} setToken={setToken} />
        </div>
      ) : !ref ? (
        <Loading />
      ) : (
        <div className='h-screen'>
          <div className='flex flex-col justify-center space-y-4 m-auto p-6 h-full'>
            {/* <div className='  h-24'>
            <RefControllerPanel rating={rating} position={ref?._id} />
          </div> */}
            <div className='flex flex-row w-full space-x-6 justify-center border border-gray-400 bg-gray-300 rounded p-1'>
              <div className='w-full flex-grow'>
                <Light
                  color={showRating(rating, 'left')}
                  ratingSubmit={checkRatingSubmit(rating, 'left')}
                  ratingColor={rating?.left}
                />
                {ref?._id === 'left' && (
                  <ChevronDoubleUpIcon className='w-6 h-6 text-center m-auto' />
                )}
              </div>
              <div className='w-full flex-grow'>
                <Light
                  color={showRating(rating, 'main')}
                  ratingSubmit={checkRatingSubmit(rating, 'main')}
                  ratingColor={rating?.main}
                />
                {ref?._id === 'main' && (
                  <ChevronDoubleUpIcon className='w-6 h-6 text-center m-auto' />
                )}
              </div>
              <div className='w-full flex-grow'>
                <Light
                  color={showRating(rating, 'right')}
                  ratingSubmit={checkRatingSubmit(rating, 'right')}
                  ratingColor={rating?.right}
                />
                {ref?._id === 'right' && (
                  <ChevronDoubleUpIcon className='w-6 h-6 text-center m-auto' />
                )}
              </div>
            </div>
            <div className='w-full'>
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
            {ref?._id === 'main' && (
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
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Ref;
