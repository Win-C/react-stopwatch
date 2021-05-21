import { useState, useEffect, useRef } from 'react';

/** Stopwatch Component renders stopwatch and buttons
 * 
 *  App -> Stopwatch
 */
function Stopwatch({ defaultTime = 10 }) {
  const [timer, setTimer] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const countRef = useRef(null);

  useEffect(function clearIntervalTimesUp(){
    if (timer < 1){
      clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(true);
    }
  }, [timer]);

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
  }

  function handlePause() {
    setIsPaused(true);
    clearInterval(countRef.current);
  }

  function handleResume() {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer(timer => timer - 1)
    }, 1000);
  }

  function handleReset() {
    setIsActive(false);
    setIsPaused(true);
    clearInterval(countRef.current);
    setTimer(defaultTime);
  }

  function formatTime() {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }

  return (
    <div className="Stopwatch">
      <p>{formatTime()}</p>
      <div className="Stopwatch buttons">
        {!isActive && isPaused
          ? <button onClick={handleStart}>Start</button>
          : (!isPaused
            ? <button onClick={handlePause}>Pause</button>
            : <button onClick={handleResume}>Resume</button>
          )
        }
        <button onClick={handleReset} disabled={!isActive}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch;