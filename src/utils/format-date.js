import { format } from 'date-fns'

export function formattedDate(date) {
    const timestamp = Number(date) * 1000;
    return format(new Date(timestamp), "dd-MMM-yyyy HH:mm");
}
