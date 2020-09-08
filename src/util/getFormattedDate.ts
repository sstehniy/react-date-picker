export const getFormattedDate = (date: number) => {
  return date < 10 ? `0${date}` : date.toString();
};
