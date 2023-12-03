import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Loading from '../components/Loading';
import SettingsTokenCard from '../components/SettingsTokenCard';
import SettingsAdminCard from '../components/SettingsAdminCard';
import SettingsUpdateCard from '../components/SettingsUpdateCard';
import SettingsOptions from '../components/SettingsOptions';
import SettingsVPortalCard from '../components/SettingsVPortalCard';

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
          <SettingsOptions settings={settings} handleChange={handleChange} />

          

          <div className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'>
            <SettingsAdminCard accessToken={accessToken} />
          </div>
          <div className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'>
            <SettingsVPortalCard accessToken={accessToken} />
          </div>
          {settings?.isDocker ?? <div className='col-span-3 lg:col-span-1 bg-white rounded-lg p-8'>
            <SettingsUpdateCard accessToken={accessToken} />
          </div>}
        </div>
      )}
    </div>
  );
}

export default Settings;
