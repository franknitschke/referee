import useSubmit from '../hooks/useSubmit';
import { useEffect, useState } from 'react';
import { handelSubmit } from '../helper/helper';

import Loading from './Loading';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function SettingsAdminCard({ accessToken }) {
  const [hide, setHide] = useState(true);
  const [admin, setAdmin] = useState(null);
  const { loading, error, success, fetchData } = useSubmit();

  useEffect(() => {
    async function fetchAdmin() {
      const req = await fetch('/api/settings?field=_id&value=admin', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const res = await req.json();

      if (req.ok) setAdmin(res[0]);
    }

    fetchAdmin();
  }, []);

  return (
    <>
      {!admin ? (
        <div>
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={(e) =>
            fetchData(
              '/api/settings/update/admin',
              'POST',
              handelSubmit(e),
              accessToken
            )
          }
        >
          <span className='text-xl font-semibold'>{'Admin Account'}</span>
          <div className={`grid grid-cols-2 gap-1`}>
            <div className='form-control w-full max-w-xs col-span-2'>
              <label className='label'>
                <span className='label-text'>{`Benutzer`}</span>
              </label>
              <input
                required
                minLength={'4'}
                id={'name'}
                name='name'
                type='text'
                defaultValue={admin?.name}
                className=' input input-bordered w-full max-w-xs'
              />
            </div>
            <div className='form-control w-full max-w-xs col-span-2'>
              <label className='label'>
                <span className='label-text'>
                  {`Passwort`}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setHide(!hide);
                    }}
                  >
                    {hide ? (
                      <EyeSlashIcon className='w-4 h-4' />
                    ) : (
                      <EyeIcon className='w-4 h-4' />
                    )}
                  </button>
                </span>
              </label>

              <input
                required
                minLength={'6'}
                id={`password`}
                name='password'
                type={hide ? 'password' : 'text'}
                className=' input input-bordered w-full max-w-xs'
              />
            </div>

            <div className='my-4 col-span-2'>
              <button
                tabIndex={0}
                disabled={loading ? true : false}
                type='submit'
                className={`btn btn-outline ${error && 'btn-error'} ${
                  success && 'btn-success'
                } ${loading && 'loading'}`}
              >
                {error ? 'Fehler' : 'Speichern'}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default SettingsAdminCard;
