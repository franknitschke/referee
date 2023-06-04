import React from 'react';

function Home({ ip, isConnected }) {
  return (
    <div className='flex justify-center items-center text-gray-800 text-3xl h-screen'>
      <div className='flex-col m-auto text-center text-gray-600'>
        <div className='text-2xl font-extrabold mb-10'>Wertungsanlage</div>
        <div className='text-base'>{ip}</div>
        <div className='text-base'>
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
