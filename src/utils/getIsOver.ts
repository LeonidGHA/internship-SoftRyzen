export const getIsOver = (date: Date | null) => {
  if (date === null) {
    return false;
  }
  const deadLine = new Date(date);
  const now = Date.now();

  return now > deadLine.getTime();
};
