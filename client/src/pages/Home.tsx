import { useState, useEffect } from "react";

type propTypes = {
  ip: null | string;
  isConnected: boolean;
  compData: object | null
};

function Home({ ip, isConnected, compData }: propTypes) {
  const [version, setVersion] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch('/api/app-version');
        if(req.ok) setVersion(await req.json());
        
      } catch (error) {
        
      }
    })()
  }, [])
  return (
    <>
    <div className='flex justify-center items-center text-gray-800 text-3xl h-screen'>
      <div className='flex-col m-auto text-center text-gray-600 gap-2'>
        <div className='text-2xl font-extrabold'>Wertungsanlage</div>
        <div className='mb-10 text-sm font-light'>{version && `V ${version?.appVersion}`}</div>
        <div className='text-base'>{ip}</div>
        <div className='text-base'>
          {isConnected ? (
            'Verbunden'
          ) : (
            <span className='text-red-600'>Nicht Verbunden</span>
          )}
        </div>
        {/* <div className='text-base'>{JSON.stringify(compData)}</div> */}
      </div>
      
    </div>
    
    </>
  );
}

export default Home;
