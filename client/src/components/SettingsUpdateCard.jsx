import React, { useEffect, useState } from 'react';
import { getData } from '../helper/helper';
import useSubmit from '../hooks/useSubmit';
import Loading from './Loading';

function SettingsUpdateCard({ accessToken }) {
  const [updates, setUpdates] = useState(null);

  const { loading, error, success, fetchData } = useSubmit();

  async function getUpdateData() {
    const data = await getData('/api/update/status', 'GET', accessToken);
    setUpdates(data);
  }

  useEffect(() => {
    getUpdateData();
  }, []);
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
          <div className='py-4 font-semibold text-lg'>{`Die Durchführung des Updates kann einige Zeit dauern.
          Nach dem Update müssen Sie den PI neu starten!`}</div>
          <div>
            <button
              tabIndex={0}
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
      {/*  {JSON.stringify(updates)} */}
    </>
  );
}

export default SettingsUpdateCard;
