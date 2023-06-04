import QRCode from 'react-qr-code';
import useSubmit from '../hooks/useSubmit';
import { useState } from 'react';
import { handelSubmit } from '../helper/helper';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function SettingsTokenCard({ data, position, title, ip, accessToken }) {
  const [hide, setHide] = useState(true);
  const { loading, error, success, fetchData } = useSubmit();

  return (
    <form
      onSubmit={(e) =>
        fetchData(
          '/api/settings/update/ref',
          'POST',
          handelSubmit(e),
          accessToken
        )
      }
    >
      <span className='text-xl font-semibold'>
        {title}{' '}
        <button
          onClick={(e) => {
            e.preventDefault();
            setHide(() => !hide);
          }}
        >
          {!hide ? (
            <EyeIcon className='w-8 h-8' />
          ) : (
            <EyeSlashIcon className='w-8 h-8' />
          )}
        </button>
      </span>
      <div className={`grid grid-cols-2 gap-1 ${hide && 'blur opacity-20'}`}>
        <div className='form-control w-full max-w-xs col-span-1'>
          <label className='label'>
            <span className='label-text'>{`Token ${title}`}</span>
          </label>
          <input
            required
            id={position}
            name='token'
            type='text'
            //min={'4'}
            defaultValue={data}
            className=' input input-bordered w-full max-w-xs'
          />
          <input
            id={`id-${position}`}
            name='id'
            type='text'
            defaultValue={position}
            className=' hidden'
          />
        </div>
        <div className='col-span-1 m-auto'>
          <QRCode value={`${ip}/ref?token=${data}`} size={125} level='Q' />
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
  );
}

export default SettingsTokenCard;
