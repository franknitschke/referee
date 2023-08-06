type LightProps = {
  color: 'white' | 'red' | '';
  ratingSubmit: boolean | undefined | null;
  ratingColor: any;
  width: number;
  widthSubmit: number;
  paddingBottom: string;
  paddingBottomSubmit: string;
};

function Light({
  color,
  ratingSubmit,
  ratingColor,
  width,
  widthSubmit,
  paddingBottom,
  paddingBottomSubmit,
}: LightProps) {
  return (
    <>
      {ratingSubmit && (
        <div
          style={{
            width: widthSubmit,
            paddingBottom: paddingBottomSubmit,
            position: 'relative',
            margin: 'auto',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              backgroundColor: 'green',
              borderRadius: '50%',
            }}
          ></div>
        </div>
      )}
      <div
        style={{
          width: width,
          paddingBottom: paddingBottom,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundColor: color,
            borderRadius: '50%',
          }}
        ></div>
      </div>
      <div className='w-full h-6 lg:h-20 inline-flex py-2'>
        {!ratingSubmit && ratingColor?.red && (
          <div className='h-full w-1/3 bg-red-600'></div>
        )}
        {!ratingSubmit && ratingColor?.yellow && (
          <div className='h-full w-1/3 bg-yellow-500'></div>
        )}
        {!ratingSubmit && ratingColor?.blue && (
          <div className='h-full w-1/3 bg-blue-600'></div>
        )}
      </div>
    </>
  );
}

export default Light;

Light.defaultProps = {
  color: 'none',
  width: '100%',
  paddingBottom: '100%',
  widthSubmit: '10%',
  paddingBottomSubmit: '10%',
};
