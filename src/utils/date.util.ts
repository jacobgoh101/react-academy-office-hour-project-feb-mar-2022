import dayjs from 'dayjs';

export function formatUnix(unix: number, format?: string) {
  return dayjs.unix(unix).format(format || 'MMM D, YYYY h:mm A	');
}
