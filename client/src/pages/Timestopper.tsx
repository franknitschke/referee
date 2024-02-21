import Timer from '../components/Timer';
import OnlineStatus from '../components/OnlineStatus';

type Props = {
  isConnected: boolean;
  rating: RatingObject;
};

function timerColor(time: number): string {
  switch (true) {
    case time <= 15:
      return 'progress-error';

    case time < 30:
      return 'progress-warning';

    default:
      return '';
  }
}

function Timestopper({ isConnected, rating }: Props) {
  return (
    <>
      <div className=' items-end justify-end'>
        <OnlineStatus isConnected={isConnected} />
      </div>
      <div className='flex flex-col w-11/12 m-auto items-center py-6 gap-6'>
        <div className='mb-10'>
          <h1 className='text-3xl font-bold'>Zeitnehmer</h1>
        </div>
        <div className='text-6xl rounded-md p-6 bg-gray-300'>
          <Timer time={rating?.timer} />
        </div>

        <div className=' w-10/12'>
          <progress
            className={`progress w-full ${timerColor(rating?.timer || 0)}`}
            value={rating?.timer || 0}
            max='60'
          ></progress>
          <button className='btn btn-outline w-full text-xl font-bold'>
            START / STOP
          </button>
        </div>
        <div className=' w-10/12'>
          <button className='btn btn-outline w-full text-xl font-bold'>
            RESET
          </button>
        </div>
      </div>
    </>
  );
}

export default Timestopper;
