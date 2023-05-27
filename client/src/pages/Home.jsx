import React from 'react';

function Home({ ip, isConnected }) {
  return (
    <div className='flex justify-center items-center text-gray-800 text-3xl h-screen'>
      <div className='flex-col m-auto text-center'>
        <div>{ip}</div>
        <div>
          {isConnected ? (
            'Verbunden'
          ) : (
            <span className='text-red-600'>Nicht Verbunden</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
