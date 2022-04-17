import dayjs from 'dayjs';

export function formatUnix(unix: number, format?: string) {
  return dayjs.unix(unix).format(format || 'MMM D, YYYY h:mm A	');
}

export function dateToUnix(date: Date | string) {
  return dayjs(date).unix();
}

export function unixToDate(unix: number) {
  return dayjs.unix(unix).format(`YYYY-MM-DD`);
}
