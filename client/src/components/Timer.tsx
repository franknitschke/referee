type Props = {
  time: number | null | undefined;
}

function Timer({ time }: Props) {
  return (
    <div className='w-full text-white font-semibold'>
      <span className='countdown font-mono'>
        <span style={{ '--value': time ? Math.floor(time / 60) : 0}}></span>:
        <span style={{ '--value': time ? time % 60 : 0}}></span>
      </span>
    </div>
  );
}

export default Timer;
