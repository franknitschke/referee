import React, { useEffect, useState } from 'react';
import { getData } from '../helper/helper';
import useSubmit from '../hooks/useSubmit';
import Loading from './Loading';

type Props = {
  accessToken: string | null;
}

function SettingsUpdateCard({ accessToken }: Props) {
  const [updates, setUpdates] = useState<Record<string, string>  | null>(null);
  const [updateMsg, setUpdateMsg] = useState<Record<string, string> | null>(null);

  const { loading, error, success, fetchData } = useSubmit();

  async function getUpdateData() {
    const data: Record<string, string> | null = await getData('/api/update/status', 'GET', accessToken);
    setUpdates(data);
  }

  async function handleSubmit() {
    const update = await fetchData('/api/update', 'POST', {}, accessToken);
    if (update) setUpdateMsg(update);
  }

  useEffect(() => {
    getUpdateData();
  }, [updateMsg]);
  return (
    <>
      {!updates ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <span className='text-xl font-semibold'>Verfügbare Updates</span>
          <div
            className={`${
              updates?.flag ? 'text-yellow-500' : 'text-green-600'
            } text-lg font-semibold py-4`}
          >
            {updates.msg}
          </div>
          <div>{`Version: ${updates.v}`}</div>
          <div className='underline'>
            <a href={updates.link} target='_blank' rel='noreferrer'>
              Versionsbeschreibung ansehen
            </a>
          </div>
          {updates.flag && (
            <>
              <div className='py-4 font-semibold text-lg'>{`Die Durchführung des Updates kann einige Zeit dauern.
          Nach dem Update müssen Sie den PI neu starten!`}</div>
              <div>
                <button
                  onClick={handleSubmit}
                  disabled={loading ? true : false}
                  type='submit'
                  className={`btn btn-outline ${error && 'btn-error'} ${
                    success && 'btn-success'
                  } ${loading && 'loading'}`}
                >
                  {error ? 'Fehler' : 'Update'}
                </button>
              </div>
            </>
          )}
          {updateMsg && (
            <div className='alert alert-success my-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='stroke-current shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>{updateMsg.msg}</span>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SettingsUpdateCard;
