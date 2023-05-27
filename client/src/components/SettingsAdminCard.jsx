import useSubmit from '../hooks/useSubmit';
import { useEffect, useState } from 'react';

import Loading from './Loading';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function SettingsAdminCard({ token, position, title, ip }) {
  const [hide, setHide] = useState(true);
  const [admin, setAdmin] = useState(null);
  const { loading, error, success, fetchData } = useSubmit();

  useEffect(() => {
    async function fetchAdmin() {
      const req = await fetch('/api/settings?field=_id&value=admin');
      const res = await req.json();

      if (req.ok) setAdmin(res[0]);
    }

    fetchAdmin();
  }, []);

  useEffect(() => {
    console.log('admin: ', admin);
  }, [admin]);

  function handelSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {};
    for (let [key, value] of formData.entries()) {
      body[key] = value;
    }
    console.log(body);
    return body;
  }
  return (
    <>
      {!admin ? (
        <div>
          <Loading />
        </div>
      ) : (
        <form
        /* onSubmit={(e) =>
        fetchData('/api/settings/update/ref', 'POST', handelSubmit(e))
      } */
        >
          <span className='text-xl font-semibold'>{'Admin Account'}</span>
          <div className={`grid grid-cols-2 gap-1`}>
            <div className='form-control w-full max-w-xs col-span-2'>
              <label className='label'>
                <span className='label-text'>{`Benutzer`}</span>
              </label>
              <input
                required
                id={position}
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
                placeholder='*******'
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
