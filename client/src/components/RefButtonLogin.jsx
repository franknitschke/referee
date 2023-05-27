import React from 'react';

function RefButtonLogin({ handleSubmit, setToken }) {
  return (
    <div className='min-w-full min-h-screen flex items-center justify-center'>
      {
        <div className='flex justify-center items-center'>
          <div className='relative h-full items-center'>
            <div className='artboard artboard-horizontal phone-1 bg-white'>
              <div className='m-auto h-3/4 flex flex-col items-center'>
                <input
                  type='text'
                  placeholder='Token eingeben'
                  className='mt-20 input input-bordered w-full max-w-xs m-auto'
                  onInput={(e) => setToken(e.target.value)}
                />

                <button className='btn' onClick={handleSubmit}>
                  Senden
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default RefButtonLogin;
