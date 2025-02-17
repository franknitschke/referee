function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col my-10'>
      <div className='text-xl'>Loading...</div>
      <div>
        <progress className='progress w-56'></progress>
      </div>
    </div>
  );
}

export default Loading;
