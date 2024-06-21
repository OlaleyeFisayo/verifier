export function separateDateComponents(dateString) {
  const date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date string");
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
}
