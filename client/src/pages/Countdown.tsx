import Timer from '../components/Timer';
import Alert from '../components/Alert';

type Props = {
  isConnected: boolean;
  rating: RatingObject;
};

function Countdown({ isConnected, rating }: Props) {
  return (
    <div
      className='h-screen w-full bg-black text-red-600 font-semibold justify-center flex items-center px-4'
      style={{ fontSize: '31vw' }}
    >
      <div className='m-auto'>
        <Timer time={rating?.timer} />
      </div>

      {!isConnected && (
        <div className='absolute bottom-8 left-2'>
          <Alert />
        </div>
      )}
    </div>
  );
}

export default Countdown;
