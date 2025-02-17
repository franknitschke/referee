import Timer from "./Timer";
import Alert from "./Alert";

type Props = {
  breakTimer: BreakTimerObject;
};

function Pause({ breakTimer }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-black text-white"
      style={{ fontSize: "9vw" }}
    >
      <div>
        <h1>Pause</h1>
      </div>
      <div>
        <Timer time={breakTimer?.timer} />
      </div>
      {breakTimer?.note && (
        <div className="p-4">
          <Alert alert="alert-warning" msg={breakTimer?.note} />
        </div>
      )}
    </div>
  );
}

export default Pause;
