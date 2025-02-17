import { translateDiscipline } from '../helper/helper';

type Props = {
  competitionData: {
    weight: string;
    discipline: string;
    attempt: string;
    competitionAthlete: {
      firstName: string;
      lastName: string;
    };
  }[];
};

function Attempt({ competitionData }: Props) {
  return (
    <>
      {competitionData && competitionData.length !== 0 ? (
        <div className='w-full grid grid-cols-3 gap-2 items-center text-white text-center text-6xl'>
          <div className='col-span-1 overflow-hidden whitespace-nowrap'>{`${competitionData[0]?.competitionAthlete?.firstName?.slice(
            0,
            1
          )}. ${competitionData[0]?.competitionAthlete?.lastName?.toUpperCase()}`}</div>
          <div className='col-span-1'>{`${
            competitionData[0]?.attempt
          }. ${translateDiscipline(competitionData[0]?.discipline)}`}</div>
          <div className='col-span-1'>{`${competitionData[0]?.weight} KG`}</div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Attempt;
