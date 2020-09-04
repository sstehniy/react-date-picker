export const getFormattedDate = (date: number) => {
  if (date.toString().length === 4) {
    return date.toString().substring(2);
  }
  return date < 10 ? `0${date}` : date.toString();
};
