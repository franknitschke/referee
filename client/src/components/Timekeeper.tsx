import Timer from '../components/Timer';
import OnlineStatus from '../components/OnlineStatus';
import RefButton from './RefButton';

type Props = {
  isConnected: boolean;
  rating: RatingObject;
  token: string | null;
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

function Timekeeper({ isConnected, rating, token }: Props) {
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
              
            </div>
            <div className=' w-10/12'>
              <RefButton color='white' title='Start' url={`/api/timer?token=${token}&position=timekeeper`} method='POST'/>
            </div>
            <div className=' w-10/12'>
              <RefButton color='red' title='Reset' url={`/api/ref/reset?token=${token}&position=timekeeper`} method='POST'/>
            </div>
            
          </div>
        </>
      );
}

export default Timekeeper