export const formatStartDate = (startDate: Date | string) => {
  const newStartDate =
    startDate.toString().length > 10 && startDate.toString().endsWith('Z')
      ? startDate.toString().slice(0, 10)
      : startDate.toString();

  const arr = newStartDate.split('-');
  const cutYear = arr[0].slice(2);

  arr.splice(0, 1, cutYear);

  return arr.reverse().join('/');
};
