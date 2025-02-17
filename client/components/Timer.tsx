type Props = {
  time: number | null | undefined;
};

function Timer({ time }: Props) {
  return (
    <div className="w-full text-white font-semibold">
      // @ts-ignore
      <span className="countdown font-mono">
        // @ts-ignore
        <span
          style={
            {
              "--value": time ? Math.floor(time / 60) : 0,
            } as React.CSSProperties
          }
        ></span>
        :
        <span
          style={{ "--value": time ? time % 60 : 0 } as React.CSSProperties}
        ></span>
      </span>
    </div>
  );
}

export default Timer;
