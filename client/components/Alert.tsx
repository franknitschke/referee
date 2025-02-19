type AlertProps = {
  msg?: string;
  alert?: "alert-warning" | "alert-error";
  fontSize?:
    | "text-xl"
    | "text-2xl"
    | "text-4xl"
    | "text-6xl"
    | "text-8xl"
    | "text-9xl"
    | "text-base";
};

function Alert({
  msg = "Anzeige nicht verbunden",
  alert = "alert-error",
  fontSize = "text-xl",
}: AlertProps) {
  return (
    <div className={`alert ${alert} shadow-lg h-full w-full overflow-hidden`}>
      {alert === "alert-error" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {alert === "alert-warning" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )}
      <div>
        <div className={fontSize}>{msg}</div>
      </div>
    </div>
  );
}

export default Alert;
{
  /* <div className={`alert ${alert} shadow-lg h-full w-full overflow-hidden`}>
      {alert === "alert-error" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {alert === "alert-warning" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )}
      <div className="flex">
        <div
          className="h-fit w-full whitespace-normal m-auto"
          style={{ fontSize: fontSize }}
        >
          {msg}
        </div>
      </div>
    </div> */
}
