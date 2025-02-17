import Timer from '../components/Timer';
import Alert from '../components/Alert';

type Props = {
  isConnected: boolean;
  rating: RatingObject;
};

function Countdown({ isConnected, rating }: Props) {
  return (
    <div
      className='h-screen w-full bg-black text-red-600 font-semibold justify-center flex items-center px-4 cursor-none overflow-hidden'
      style={{ fontSize: '31vw' }}
    >
      {isConnected ? (
        <div className='m-auto'>
          <Timer time={rating?.timer} />
        </div>
      ) : (
        <div className='w-3/4 text-4xl'>
          <Alert />
        </div>
      )}
    </div>
  );
}

export default Countdown;
