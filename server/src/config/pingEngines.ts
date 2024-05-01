// 5 minutes

const pingEngines = async () => {
  setInterval(() => {
    ping();
  }, 1000 * 60 * 5);

  if(process.env.NODE_ENV === "development") return console.log("Pinging engines disabled in development mode");

  const ping = async () => {
    const engines = [
      "https://excompiler.onrender.com",
      "https://scriptopia-code-ml-engine.onrender.com",
    ];

    for (const engine of engines) {
      try {
        fetch(engine).catch(() => {
          console.log(`Error pinging ${engine}`);
        });
      } catch (err) {
        console.log(`Error pinging ${engine}`);
      }
    }
  };
};

export default pingEngines;
