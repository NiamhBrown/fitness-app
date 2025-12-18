import { useState, useEffect, useRef, useCallback } from "react";

interface TimerProps {
  seconds: number;
  setSeconds: (value: number | ((prev: number) => number)) => void;
}
// this was so fun to do
export const Timer = ({ seconds, setSeconds }: TimerProps) => {
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hours, minutes, secs]
      .map((v) => String(v).padStart(2, "0"))
      .join(":");
  };

  // Start the timer when the component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [setSeconds]);

  const toggleStatus = useCallback(() => {
    if (paused) {
      setPaused(false);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [paused, setSeconds]);

  const text = paused ? "resume" : "pause";

  return (
    <div className="text-primary flex max-w-md flex-col items-center">
      <p className="text-4xl">{formatTime(seconds)}</p>
      <button className="bg-hivis rounded px-8 py-1" onClick={toggleStatus}>
        {text}
      </button>
    </div>
  );
};
