import Timer from "../components/Timer";
import Alert from "../components/Alert";
import Pause from "../components/Pause";

import type {
  RatingObject,
  BreakTimerObject,
  SettingsObject,
} from "../types/types";

type Props = {
  isConnected: boolean;
  rating: RatingObject;
  breakTimer: BreakTimerObject;
  settings: SettingsObject;
};

function Countdown({ isConnected, rating, breakTimer, settings }: Props) {
  if (settings?.pauseModus) return <Pause breakTimer={breakTimer} />;

  return (
    <div
      className="h-screen w-full bg-black text-red-600 font-semibold justify-center flex items-center px-4 cursor-none overflow-hidden"
      style={{ fontSize: "31vw" }}
    >
      {isConnected ? (
        <div className="m-auto">
          <Timer time={rating?.timer} />
        </div>
      ) : (
        <div className="w-3/4 text-4xl">
          <Alert />
        </div>
      )}
    </div>
  );
}

export default Countdown;
