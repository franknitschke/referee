import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import Light from '../components/Light';
import { showRating, checkRatingSubmit } from '../helper/helper';

const names = {
  display: 'Anzeige',
  main: 'Haupt KaRi',
  left: 'KaRi links',
  right: 'KaRi rechts',
  settings: 'Einstellungen',
  dashboard: 'Dashboard',
  ref: 'KaRi',
};

function Dashboard({ ip, isConnected, rating }) {
  const [users, setUsers] = useState(null);
  const [lastRating, setLastRating] = useState(null);

  useEffect(() => {
    function getUsers(value) {
      setUsers(value);
    }

    function getLastRating(value) {
      setLastRating(value);
    }

    socket.on('getUsers', getUsers);
    socket.on('lastRating', getLastRating);

    return () => {
      socket.off('getUsers', getUsers);
      socket.off('lastRating', getLastRating);
    };
  }, []);

  return (
    <div className=' grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-1 w-52'>
        <div className='stats shadow'>
          <div className='stat'>
            <div className='stat-title'>Verbindung</div>
            <div className='stat-value'>
              {isConnected ? 'Online' : 'Offline'}
            </div>
            <div className='stat-desc'>{`Server: ${ip}`}</div>
          </div>
        </div>

        <div className='my-4'>Verbundene User</div>
        {users?.map((el, id) => (
          <div key={id} className='stats shadow mb-2'>
            <div className='stat'>
              <div className='stat-title'>Verbunden</div>
              <div className='stat-value'>
                {names[el.user.replace('/', '')]}
              </div>
              <div className='stat-desc'>{`Server: ${ip}`}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='col-span-3'>
        <div className='grid grid-cols-3 gap-4 w-1/2 m-auto justify-center'>
          <div className='col-span-3 text-center text-xl font-black'>
            Aktuelle Wertung
          </div>
          <div className='col-span-1'>
            <Light
              color={showRating(rating, 'left')}
              ratingSubmit={checkRatingSubmit(rating, 'left')}
              ratingColor={rating?.left}
            />
          </div>
          <div className='col-span-1'>
            <Light
              color={showRating(rating, 'main')}
              ratingSubmit={checkRatingSubmit(rating, 'main')}
              ratingColor={rating?.main}
            />
          </div>
          <div className='col-span-1'>
            <Light
              color={showRating(rating, 'right')}
              ratingSubmit={checkRatingSubmit(rating, 'right')}
              ratingColor={rating?.right}
            />
          </div>

          <div className='col-span-3 text-center text-xl font-black text-gray-400'>
            Letzte Wertung
          </div>
          <div className='col-span-1 opacity-50'>
            <Light
              color={showRating(lastRating, 'left')}
              ratingSubmit={checkRatingSubmit(lastRating, 'left')}
              ratingColor={lastRating?.left}
            />
          </div>
          <div className='col-span-1 opacity-50'>
            <Light
              color={showRating(lastRating, 'main')}
              ratingSubmit={checkRatingSubmit(lastRating, 'main')}
              ratingColor={lastRating?.main}
            />
          </div>
          <div className='col-span-1 opacity-50'>
            <Light
              color={showRating(lastRating, 'right')}
              ratingSubmit={checkRatingSubmit(lastRating, 'right')}
              ratingColor={lastRating?.right}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
