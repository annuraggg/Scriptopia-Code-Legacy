const Descriptor = ({ output }: { output: string[] }) => {
  return (
    <div className="h-full bg-secondary p-4 rounded- overflow-auto rounded">
      <p>Console</p>
      <div className="h-[85%]">
        <div className="bg-black rounded-lg p-4 overflow-y-auto mt-4 h-full">
          <p className="text-sm text-gray-500">
            {output?.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Descriptor;
