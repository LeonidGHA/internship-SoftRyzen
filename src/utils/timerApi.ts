import { Time } from 'constants/types';

export const convertMinutesToTime = (duration: number): Time => {
  const hours = Math.floor(duration / 60);
  const remainingMinutes = duration % 60;

  return {
    hours,
    minutes: remainingMinutes,
    seconds: 0,
  };
};

export const countTime = (fullTime: Time, timeLeft: Time): Time => {
  const seconds1 = fullTime.hours * 3600 + fullTime.minutes * 60 + fullTime.seconds;
  const seconds2 = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const difference = seconds1 - seconds2;

  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = difference % 60;

  return { hours, minutes, seconds };
};

export const formTime = (
  timerHours: number,
  timerMinutes: number,
  timerSeconds: number
): string => {
  return `${timerHours.toString().padStart(2, '0')}:${timerMinutes
    .toString()
    .padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
};
