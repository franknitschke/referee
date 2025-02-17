import Alert from "./Alert";

type Props = {
  settings: SettingsObject;
  breakTimer: BreakTimerObject;
  handleChange: (e: any, route?: string) => void;
};

function SettingsPause({ settings, breakTimer, handleChange }: Props) {
  return (
    <div className="col-span-3 bg-white rounded-lg p-8 w-full">
      <div className="text-xl font-medium text-center py-2">Pause Modus</div>
      {settings?.pauseModus && (
        <Alert msg="Der Pause Modus ist aktiv!" alert="alert-error" />
      )}

      <div className="form-control w-52 m-auto">
        <label className="cursor-pointer label">
          <span
            className="label-text tooltip font-semibold"
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
              defaultValue={
                breakTimer?.defaultTimer ? breakTimer?.defaultTimer / 60 : 0
              }
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e, "/api/break/timeValue")}
            />
          </label>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Infotext</span>
            </div>
            <input
              required
              minLength={4}
              id={"pauseNote"}
              name="pauseNote"
              type="text"
              defaultValue={breakTimer?.note}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChange(e, "/api/break/timeValue")}
            />
          </label>
        </div>
        <div className="col-span-6 lg:col-span-1">
          <button
            onClick={(e) => handleChange(e, "/api/break/timer")}
            className="btn btn-outline w-32"
          >
            Start / Stop
          </button>
        </div>
        <div className="col-span-6 lg:col-span-1">
          <button
            onClick={(e) => handleChange(e, "/api/break/reset")}
            className="btn btn-outline btn-error w-32"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPause;
