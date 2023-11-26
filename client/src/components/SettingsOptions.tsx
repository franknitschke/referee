type Props = {
    settings: SettingsObject;
    handleChange: (e: any) => void
}

function SettingsOptions({settings, handleChange}: Props) {
  return (
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
              <div className='col-span-6 lg:col-span-2'>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Timer ausblenden</span>
                    <input
                      type='checkbox'
                      name={'hideCountdown'}
                      className='toggle toggle-accent'
                      checked={settings?.hideCountdown}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
              <div className='col-span-6 lg:col-span-2'>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>VPortal Daten abrufen</span>
                    <input
                      type='checkbox'
                      name={'getVportalData'}
                      className='toggle toggle-accent'
                      checked={settings?.getVportalData}
                      onChange={handleChange}//Wertung abrufen api Request
                    />
                  </label>
                </div>
              </div>
              <div className='col-span-6 lg:col-span-2'>
                <div className='form-control w-52'>
                  <label className='cursor-pointer label'>
                    <span className='label-text'>Wertung senden</span>
                    <input
                      type='checkbox'
                      name={'sendRating'}
                      className='toggle toggle-accent'
                      checked={settings?.sendRating}
                      onChange={handleChange}// ohne api call wird immer vor dem senden gecheckt
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
  )
}

export default SettingsOptions