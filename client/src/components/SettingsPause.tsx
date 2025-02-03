import Alert from "./Alert";

type Props = {
  settings: SettingsObject;
  handleChange: (e: any) => void;
};

function SettingsPause({ settings, handleChange }: Props) {
  return (
    <div className="col-span-3 bg-white rounded-lg p-8 w-full">
      <div className="text-xl font-medium text-center py-2">Pause Modus</div>
      {settings?.pauseModus && (
        <Alert msg="Der Pause Modus ist aktiv!" alert="alert-error" />
      )}

      <div className="grid grid-cols-6 gap-12">
        <div className="col-span-6 lg:col-span-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pausenzeit in Minuten</span>
            </div>
            <input
              required
              minLength={4}
              id={"pauseTimer"}
              name="pauseTimer"
              step={1}
              type="number"
              defaultValue={settings?.pauseTimer}
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-span-6 lg:col-span-2 items-center m-auto">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span
                className="label-text tooltip"
                data-tip="Pause Modus aktivieren"
              >
                Pause Modus aktivieren
              </span>
              <input
                type="checkbox"
                name={"pauseModus"}
                className="toggle toggle-accent"
                checked={settings?.pauseModus}
                onChange={(e) => {
                  if (
                    window?.confirm(
                      `Pause Modus wirklich ${
                        settings?.pauseModus ? "deaktivieren" : "aktivieren"
                      }?`
                    ) === true
                  )
                    handleChange(e);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPause;
