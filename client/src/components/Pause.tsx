import Timer from "./Timer";
import Alert from "./Alert";

function Pause() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-black text-white"
      style={{ fontSize: "9vw" }}
    >
      <div>
        <h1>Pause</h1>
      </div>
      <div>
        <Timer time={1200} />
      </div>
      <div className="p-4">
        <Alert
          alert="alert-warning"
          msg="Hier können Infos stehen - Test Test"
        />
      </div>
    </div>
  );
}

export default Pause;
