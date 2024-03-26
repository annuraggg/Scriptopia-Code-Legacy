import { useEffect, useState } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100 && loading) {
          return prevProgress + 1;
        } else {
          clearInterval(progressInterval);
          return 100; // Ensure progress stops at 100%
        }
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [loading]);

  return { loading, setLoading, progress };
};
