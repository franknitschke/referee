import useSubmit from '../hooks/useSubmit';
import { useEffect, useState } from 'react';
import { handelSubmit } from '../helper/helper';

import Alert from './Alert';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type Props = {
  accessToken: string | null;
};

type Vportal = {
  competition: {
    id: string;
  };
  access_token: string;
  defaultStage: string;
};

type Stages = {
  data: {
    competitionStageList: {
      competitionStages: object[];
    };
  };
};

function SettingsVPortalCard({ accessToken }: Props) {
  const [hide, setHide] = useState<boolean>(true);
  const [vportal, setVportal] = useState<Vportal | null>(null);
  const [stages, setStages] = useState<Stages | null>(null);
  const [tab, setTab] = useState('tab1');
  const { loading, error, success, fetchData } = useSubmit();

  async function getData(url: string, state: any): Promise<void> {
    try {
      const req = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const res = await req.json();
      if (req.ok) {
        state(res);
      } else state(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData('/api/vportal', setVportal);
  }, []);

  useEffect(() => {
    if (vportal?.access_token) {
      setTab('tab2');
      getData('/api/vportal/stage', setStages);
    } else setTab('tab1');
  }, [vportal, success]);

  async function handleLogin(e: any): Promise<void> {
    const res: any = await fetchData(
      '/api/vportal/login',
      'POST',
      handelSubmit(e),
      accessToken
    );
    if (res) {
      setVportal(res);
    }
  }

  return (
    <>
      <div role='tablist' className='tabs tabs-bordered mb-4'>
        <button
          role='tab'
          className={`tab ${tab === 'tab1' ? 'tab-active' : ''}`}
          onClick={() => setTab('tab1')}
        >
          VPortal Login
        </button>
        <button
          role='tab'
          className={`tab ${
            tab === 'tab2' ? 'tab-active bg-gray-100 opacity-90' : ''
          }`}
          onClick={() => setTab('tab2')}
          disabled={vportal?.access_token ? false : true}
        >
          VPortal Daten
        </button>
      </div>

      {tab === 'tab1' ? (
        <form
          onSubmit={(e) =>
            /* fetchData(
              '/api/vportal/login',
              'POST',
              handelSubmit(e),
              accessToken
            ) */
            handleLogin(e)
          }
          autoComplete='off'
        >
          <span className='text-xl font-semibold'>{`VPortal Login`}</span>
          <Alert
            msg={
              'Bitte nutzen Sie die Zugangsdaten eines temporären Wettkampf-Accounts. Nicht ihr reguläres Vereinsportal Konto!'
            }
            alert='alert-warning'
          />
          <div className={`grid grid-cols-2 gap-1`}>
            <div className='form-control w-full max-w-xs col-span-2'>
              <label className='label'>
                <span className='label-text'>{`Benutzer`}</span>
              </label>
              <input
                required
                minLength={4}
                id={'identity'}
                name='identity'
                type='text'
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
                id={`credential`}
                name='credential'
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
                {error ? 'Fehler' : 'Einloggen'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          <div className='font-medium text-lg col-span-1'>{`Event ID: `}</div>
          <div className='text-lg col-span-1'>{vportal?.competition?.id}</div>
          <div className='font-medium text-xl text-center col-span-2 badge badge-ghost p-5 m-auto'>{`Bühnen`}</div>

          {stages?.data?.competitionStageList?.competitionStages?.map(
            (stage: any) => (
              <div className='form-control col-span-1' key={stage?.id}>
                <label className='label cursor-pointer'>
                  <span className='label-text'>{stage?.name}</span>
                  <input
                    type='radio'
                    name={stage?.id}
                    id={stage?.id}
                    className='radio radio-accent'
                    onChange={async (e) => {
                      e.preventDefault();
                      const res: any = await fetchData(
                        '/api/vportal/stage',
                        'POST',
                        { defaultStage: stage?.id },
                        accessToken
                      );
                      setVportal(res);
                    }}
                    checked={vportal?.defaultStage === stage?.id ? true : false}
                  />
                </label>
              </div>
            )
          )}

          {stages?.data?.competitionStageList?.competitionStages?.some(
            (e: any) => e.id === vportal?.defaultStage
          ) ?? (
            <div className='col-span-2'>
              <Alert
                msg={
                  'Bitte neue Bühne auswählen, die ausgewählte Bühne wurde gelöscht!'
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SettingsVPortalCard;
