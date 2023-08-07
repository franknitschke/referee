import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Loading from '../components/Loading';
import SettingsTokenCard from '../components/SettingsTokenCard';
import SettingsAdminCard from '../components/SettingsAdminCard';
import SettingsUpdateCard from '../components/SettingsUpdateCard';

type Props = {
  ip: string | null;
  settings: SettingsObject;
};

type Data = {
  position: RatingKeys;
  token: string;
  role: string;
  _id: string;
};

const refTitle = {
  left: 'Seitenkampfrichter links',
  main: 'Hauptkampfrichter',
  right: 'Seitenkampfrichter rechts',
};

function Settings({ ip, settings }: Props) {
  const [data, setData] = useState<Data[] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getToken(token: string) {
      const req = await fetch('/api/settings?field=role&value=ref', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!req.ok) return navigate('/login');
      const res = await req.json();
      setData(res);
    }
    const token = localStorage.getItem('token');
    if (token) {
      setAccessToken(token);
      getToken(token);
    } else {
      navigate('/login');
    }
  }, []);

  function handleChange(e: any) {
    fetch('/api/settings', {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: JSON.stringify({
        [e.target.name]: `${
          e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }`,
      }),
    });
    console.log('Läuft');
  }

  return (
    <div className='min-h-screen'>
      {!data ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-3 gap-4 p-4 justify-center m-auto'>
          {data?.map((el) => (
            <div
              key={el._id}
              className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'
            >
              <SettingsTokenCard
                data={el.token}
                title={refTitle[el.position]}
                position={el.position}
                ip={ip}
                accessToken={accessToken}
              />
            </div>
          ))}
          <div className='col-span-3 bg-white rounded-lg p-8'>
            <div className='text-xl font-medium text-center py-2'>Settings</div>
            <div className='grid grid-cols-6 gap-12'>
              <div className='col-span-6 lg:col-span-2'>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Ref Menu anzeigen</span>
                    <input
                      type='checkbox'
                      className='toggle toggle-accent'
                      checked={settings?.refMenu}
                      name={'refMenu'}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className='col-span-6 lg:col-span-2'>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Wertung auto Reset</span>
                    <input
                      type='checkbox'
                      name={'autoReset'}
                      className='toggle toggle-accent'
                      checked={settings?.autoReset}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className='col-span-6 lg:col-span-2'>
                <input
                  type='range'
                  min='5'
                  max='45'
                  defaultValue={`${settings?.autoResetTimer}`}
                  onChange={handleChange}
                  name={'autoResetTimer'}
                  className='range range-accent range-xs'
                  step='5'
                />
                <div className='w-full flex justify-between text-xs'>
                  <span>05</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                  <span>40</span>
                  <span>45</span>
                </div>
                <div className='text-center text-xs'>
                  Auto Reset in Sekunden
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'>
            <SettingsAdminCard accessToken={accessToken} />
          </div>
          <div className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'>
            <SettingsUpdateCard accessToken={accessToken} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
