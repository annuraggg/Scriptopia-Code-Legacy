const CodeFlow = ({ codeFlow, tsp }: { codeFlow: number[], tsp: number }) => {
  const daysIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getStatusClassName = (status: number) => {
    switch (status) {
      case 1:
        return "bg-[#15B8A7]";
      case 0:
        return "bg-[#EE4445]";
      case -1:
        return "bg-background border-primary border";
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
            {status === 1 ? (
              <i className="fa-regular fa-circle-check"></i>
            ) : status === 0 ? (
              <i className="fa-regular fa-circle-xmark"></i>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex text-xs mt-5 justify-between">
        <p>Problem Solved: {tsp}</p>
      </div>
    </div>
  );
};

export default CodeFlow;
