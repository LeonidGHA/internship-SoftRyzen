export default function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Месяцы в JavaScript нумеруются с 0, поэтому добавляем 1
  const year = date.getFullYear();
  const hours = 12;
  const minutes = '00';

  // Добавляем ведущий ноль, если значение состоит из одной цифры
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}.${formattedMonth}.${year} o ${hours}:${minutes}`;

  return formattedDate;
}
