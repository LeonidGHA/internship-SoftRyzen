import { FC, useState, useEffect } from 'react';

import { Time } from 'constants/types';
import { formTime } from 'utils/timerApi';

interface TimerProps {
  onFinish: () => void;
  hours?: number;
  minutes?: number;
  seconds?: number;
  setTime: (time: Time) => void;
  isTestFinished: boolean;
}

const Timer: FC<TimerProps> = ({
  onFinish,
  hours = 2,
  minutes = 1,
  seconds = 1,
  setTime,
  isTestFinished,
}) => {
  const [timerHours, setTimerHours] = useState(hours);
  const [timerMinutes, setTimerMinutes] = useState(minutes);
  const [timerSeconds, setTimerSeconds] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTestFinished) {
        clearInterval(timer);
      } else if (timerSeconds === 0 && timerMinutes === 0 && timerHours === 0) {
        clearInterval(timer);
        onFinish();
      } else if (timerSeconds === 0 && timerMinutes === 0) {
        setTimerHours((prevHours) => prevHours - 1);
        setTimerMinutes(59);
        setTimerSeconds(59);
      } else if (timerSeconds === 0) {
        setTimerMinutes((prevMinutes) => prevMinutes - 1);
        setTimerSeconds(59);
      } else {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
        setTime({ hours: timerHours, minutes: timerMinutes, seconds: timerSeconds });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerSeconds, timerMinutes, timerHours, onFinish, setTime, isTestFinished]);

  return <p>{formTime(timerHours, timerMinutes, timerSeconds)}</p>;
};

export default Timer;
