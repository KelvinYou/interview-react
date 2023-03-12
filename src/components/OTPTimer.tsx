import React, { useState, useEffect } from "react";
interface TimerProps {
  initialMinutes: number;
}

const OTPTimer: React.FC<TimerProps> = ({ initialMinutes }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(intervalId);
          setIsTimeUp(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  const handleReset = () => {
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsTimeUp(false);
  };

  // chickable when reach below 3
  const disableResetButton = minutes > 3 || (minutes === 3 && seconds !== 0) || isTimeUp;


  return (
    <div>
      {isTimeUp ? "Your OTP has expired." : `Your OTP is expiring in ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      
      
      <br />
      <button onClick={handleReset} disabled={disableResetButton}>
        Resent OTP
      </button>
    </div>
  );
};

export default OTPTimer;
