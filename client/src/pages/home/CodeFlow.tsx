const CodeFlow = ({ codeFlow }: { codeFlow: boolean[] }) => {
  const daysIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getStatusClassName = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-[#15B8A7]";
      case false:
        return "bg-[#EE4445]";
      default:
        return "bg-background border-primary border";
    }
  };

  return (
    <div className="bg-primary-foreground w-[25vw] p-5 rounded shadow-md">
      <h3>Your Codeflow</h3>
      <div className="flex gap-2 mt-5">
        {codeFlow.map((status, index) => (
          <div
            key={index}
            className={`${getStatusClassName(status)}
            h-20 w-full rounded-sm flex items-center justify-around flex-col            `}
          >
            <p>{daysIndex[index]}</p>
            {status === true ? (
              <i className="fa-regular fa-circle-check"></i>
            ) : status === false ? (
              <i className="fa-regular fa-circle-xmark"></i>
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
