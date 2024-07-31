import { format, getTime, differenceInDays, differenceInHours, differenceInYears, differenceInMonths, formatDistanceToNow, differenceInMinutes, differenceInSeconds } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}


export const getTimeDifference = (date) => {
  const startDate = new Date(date);
  const currentDate = new Date();

  const years = differenceInYears(currentDate, startDate);
  if (years > 0) return `${years}y`;

  const months = differenceInMonths(currentDate, startDate);
  if (months > 0) return `${months}mo`;

  const days = differenceInDays(currentDate, startDate);
  if (days > 0) return `${days}d`;

  const hours = differenceInHours(currentDate, startDate);
  if (hours > 0) return `${hours}h`;

  const minutes = differenceInMinutes(currentDate, startDate);
  if (minutes > 0) return `${minutes}m`;

  const seconds = differenceInSeconds(currentDate, startDate);
  return `${seconds}s`;
};







