import Alert from "./Alert";
import InfoBox from "./InfoBox";

import type { SettingsObject, BreakTimerObject } from "../types/types";

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
        <div className="h-16 mb-4">
          <Alert msg="Der Pause Modus ist aktiv!" alert="alert-error" />
        </div>
      )}

      <div className="form-control w-52 m-auto h-16">
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Pausenzeit in Minuten</legend>
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
              onChange={(e) =>
                handleChange(
                  e,
                  `${import.meta.env.VITE_BASE_URL}/api/break/timeValue`
                )
              }
            />
            <InfoBox msg="Änderungen werden erst nach dem Reset aktiv." />
          </fieldset>
        </div>
        <div className="col-span-6 lg:col-span-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Infotext</legend>
            <input
              required
              minLength={4}
              id={"pauseNote"}
              name="pauseNote"
              type="text"
              defaultValue={breakTimer?.note}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) =>
                handleChange(
                  e,
                  `${import.meta.env.VITE_BASE_URL}/api/break/timeValue`
                )
              }
            />

            <InfoBox msg="Text wird erst nach Reset oder Start / Stop angezeigt." />
          </fieldset>
        </div>
        <div className="col-span-6 lg:col-span-1 m-auto">
          <button
            onClick={(e) =>
              handleChange(
                e,
                `${import.meta.env.VITE_BASE_URL}/api/break/timer`
              )
            }
            className="btn btn-accent btn-outline w-32"
          >
            Start / Stop
          </button>
        </div>
        <div className="col-span-6 lg:col-span-1 m-auto">
          <button
            onClick={(e) => {
              if (window?.confirm(`Zähler wirklich zurück setzen?`) === true)
                handleChange(e);
            }}
            className="btn btn-outline btn-error w-32"
          >
            Reset
          </button>
        </div>
        <div className="col-span-6">
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max m-auto w-full justify-center items-center">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span
                  style={
                    {
                      "--value": breakTimer?.timer
                        ? Math.floor(breakTimer?.timer / 60)
                        : 0,
                    } as React.CSSProperties
                  }
                ></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span
                  style={
                    {
                      "--value": breakTimer?.timer ? breakTimer?.timer % 60 : 0,
                    } as React.CSSProperties
                  }
                ></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPause;
