import Timer from "./Timer";
import Alert from "./Alert";

import type { BreakTimerObject } from "../types/types";

type Props = {
  breakTimer: BreakTimerObject;
};

function Pause({ breakTimer }: Props) {
  return (
    <div
      className="flex flex-col items-center w-full h-screen bg-black text-white"
      style={{ fontSize: "9vw" }}
    >
      <div>
        <h1>Pause</h1>
      </div>
      <div>
        <Timer time={breakTimer?.timer} />
      </div>
      {breakTimer?.note && (
        <div className="relative h-full p-4 w-full text-8xl">
          <Alert
            fontSize="text-9xl"
            alert="alert-warning"
            msg={breakTimer?.note}
          />
        </div>
      )}
    </div>
  );
}

export default Pause;
