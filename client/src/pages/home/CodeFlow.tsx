const CodeFlow = () => {
  const codeFlow = [
    "completed",
    "completed",
    "missed",
    "missed",
    "completed",
    "inprogress",
    "not",
  ];

  const daysIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-primary-foreground w-[25vw] p-5 rounded shadow-md">
      <h3>Your Codeflow</h3>
      <div className="flex gap-2 mt-5">
        {codeFlow.map((status, index) => (
          <div
            key={index}
            className={`${
              status === "completed"
                ? "bg-[#15B8A7]"
                : status === "missed"
                ? "bg-[#EE4445]"
                : status === "inprogress"
                ? "bg-[#EAB209]"
                : "bg-background border-primary border"
            }
            h-20 w-full rounded-sm flex items-center justify-around flex-col            `}
          >
            <p>{daysIndex[index]}</p>
            {status === "completed" ? (
              <i className="fa-regular fa-circle-check"></i>
            ) : status === "missed" ? (
              <i className="fa-regular fa-circle-xmark"></i>
            ) : status === "inprogress" ? (
                <i className="fa-regular fa-clock"></i>
            ) : status === "not" ? (
              <i className="fa-regular fa-circle"></i>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex text-xs mt-5 justify-between">
        <p>Problem Solved: 50</p>
        <p>Time Taken: 360 mins.</p>
      </div>
    </div>
  );
};

export default CodeFlow;
