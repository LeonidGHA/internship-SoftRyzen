const getMonthTitle = (month: number) => {
  let text;

  switch (month) {
    case 0:
      text = 'січня';
      break;

    case 1:
      text = 'лютого';
      break;

    case 2:
      text = 'березня';
      break;

    case 3:
      text = 'квітня';
      break;

    case 4:
      text = 'травня';
      break;

    case 5:
      text = 'червня';
      break;

    case 6:
      text = 'липня';
      break;

    case 7:
      text = 'серпня';
      break;

    case 8:
      text = 'вересня';
      break;

    case 9:
      text = 'жовтня';
      break;

    case 10:
      text = 'листопада';
      break;

    case 11:
      text = 'грудня';
      break;

    default:
      text = 'грудня';
  }

  return text;
};

export const getStagesDurationDescription = (startDate: number, endDate: number) => {
  const startDateNum = new Date(startDate).getDate();
  const startMonth = new Date(startDate).getMonth();
  // const startYear = new Date(startDate).getFullYear();

  const endDateNum = new Date(endDate).getDate();
  const endMonth = new Date(endDate).getMonth();
  // const endYear = new Date(endDate).getFullYear();

  if (endMonth === startMonth) {
    return `${startDateNum} - ${endDateNum} ${getMonthTitle(endMonth)}`;
  } else {
    return `${startDateNum} ${getMonthTitle(startMonth)} - ${endDateNum} ${getMonthTitle(
      endMonth
    )}`;
  }

  // як буде виглядати надпис у випадку коли відбір триває на переломі року
  // if (startYear !== endYear) {
  //   return `${startDateNum} - ${endDateNum} ${getMonthTitle(endMonth)}`;
  // }
};
