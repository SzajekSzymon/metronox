import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetTime: number; // Target time in milliseconds
  onTimeout: () => void; // Callback to run when the countdown reaches zero
}

export const Countdown: React.FC<CountdownProps> = ({ targetTime, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState<number>(targetTime);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(countdownInterval);
          onTimeout(); // Execute the callback when the countdown reaches zero
          return 0;
        }
        return prevTimeLeft - 1000; // Subtract one second from the time left
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [targetTime, onTimeout]);

  // Convert the time left in milliseconds to a user-friendly format (e.g., minutes:seconds)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${+seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <div>{formatTime(timeLeft)}</div>;
};

export default Countdown;