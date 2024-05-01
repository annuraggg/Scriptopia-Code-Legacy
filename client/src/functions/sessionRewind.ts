import { useEffect } from 'react';

const useSessionRewind = () => {
  useEffect(() => {
    const loadSessionRewindScript = () => {
      const o = {
        apiKey: import.meta.env.VITE_SESSION_REWIND_API_KEY,
        startRecording: false, // Initially set to false, recording will start when startSession is called
      };

      const w = window;
      // @ts-ignore
      w.SessionRewindConfig = o;
      const f = document.createElement("script");
      // @ts-ignore
      f.async = 1;
      f.crossOrigin = "anonymous";
      f.src = "https://rec.sessionrewind.com/srloader.js";
      const g = document.getElementsByTagName("head")[0];
      g.insertBefore(f, g.firstChild);
    };

    loadSessionRewindScript();

    // Clean up function to remove the script when the component unmounts
    return () => {
      const scripts = document.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "https://rec.sessionrewind.com/srloader.js") {
          // @ts-ignore
          scripts[i]?.parentNode.removeChild(scripts[i]);
        }
      }
    };
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  const startSession = () => {
    // @ts-ignore
    window.sessionRewind && window.sessionRewind.startSession();
  };

  const stopSession = () => {
    // @ts-ignore
    window.sessionRewind && window.sessionRewind.stopSession();
  };

  return { startSession, stopSession };
};

export default useSessionRewind;
