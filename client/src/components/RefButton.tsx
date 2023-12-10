import useSubmit from '../hooks/useSubmit';

type propTypes = {
  color: 'red' | 'blue' | 'yellow' | 'white' | 'gray';
  title: 'Weiß' | 'Rot' | 'Gelb' | 'Blau' | 'Start' | 'Reset';
  url: string;
  method: 'POST' | 'GET';
};

function RefButton({ color, title, url, method }: propTypes) {
  const { loading, error, success, fetchData } = useSubmit();
  return (
    <button
      className={`w-full h-full text-3xl text-gray-900 border-2 border-gray-700 hover:opacity-75 disabled:bg-gray-200 ${
        color === 'blue' && 'bg-blue-600'
      } ${color === 'red' && 'bg-red-600'} ${
        color === 'yellow' && 'bg-yellow-600'
      } ${color === 'white' && 'bg-white'} ${
        color === 'gray' && 'bg-gray-300'
      } text-center p-4 rounded-md hover:cursor-pointer ${
        error && 'bg-red-800'
      } ${success && 'bg-green-400'}`}
      onClick={() => fetchData(url, method)}
    >
      <div className='inline-flex items-center justify-center gap-2'>
        {success && (
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </span>
        )}
        {error && (
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </span>
        )}
        {title}
        {loading && <span className='loading loading-dots loading-lg'></span>}
      </div>
    </button>
  );
}

export default RefButton;
