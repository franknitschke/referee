function Timer({ time }) {
  return (
    <div className='w-full h-full text-red-600 text-8xl font-semibold'>
      <span className='countdown font-mono'>
        <span style={{ '--value': Math.floor(time / 60) }}></span>:
        <span style={{ '--value': time % 60 }}></span>
      </span>
    </div>
  );
}

export default Timer;
