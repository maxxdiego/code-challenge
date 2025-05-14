import React, { useEffect, useRef, useState } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${s}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#181928] p-1 text-center w-60 rounded-sm">
        <h1 className="text-md font-mono text-gray-400">
          Tempo:
        </h1>
        <div className="text-3xl font-bold text-gray-100">
          {formatTime(seconds)}
        </div>
      </div>
    </div>
  );
};

export default Timer;
