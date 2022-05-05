import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDate from 'date-fns/getDate';
import getISODay from 'date-fns/getISODay';
import isValid from 'date-fns/isValid';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import startOfMonth from 'date-fns/startOfMonth';
import subDays from 'date-fns/subDays';

export interface Day {
  date: Date;
  dayOfMonth: number;
  isWeekendDay: boolean;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
  formattedDate: string;
}

export interface DayOptions {
  format: string;
}

export function getWeeks(
  date: Date,
  options: DayOptions = { format: 'MM/dd/yyyy' }
): Day[][] {
  if (!date) {
    throw new Error('A date is required');
  } else if (!isValid(date)) {
    console.warn(`Invalid date - setting to today`, date);
    date = new Date();
  }

  const daysInMonth = getDaysInMonth(date);
  let day = startOfMonth(date);
  let offset = getDay(day);
  const numOfWeeks = Math.ceil((daysInMonth + offset) / 7);

  // @ts-ignore
  const weeks: Day[][] = Array.apply(null, {
    length: numOfWeeks
  }).map(() => []);

  const current = new Date();

  const [firstWeek] = weeks;
  for (let i = offset; i > 0; i--) {
    const offsetDay = subDays(day, i);
    firstWeek.push({
      date: offsetDay,
      dayOfMonth: getDate(offsetDay),
      isWeekendDay: getISODay(offsetDay) > 5,
      isPreviousMonth: true,
      isNextMonth: false,
      isToday: false,
      formattedDate: format(offsetDay, options.format)
    });
  }

  for (let i = 0, week = weeks[i]; i < numOfWeeks; i++, week = weeks[i]) {
    for (let dayOfWeek = offset; dayOfWeek < 7; dayOfWeek++) {
      week.push({
        date: day,
        dayOfMonth: getDate(day),
        isPreviousMonth: false,
        isToday: isSameDay(day, current),
        isNextMonth: !isSameMonth(day, date),
        isWeekendDay: getISODay(day) > 5,
        formattedDate: format(day, options.format)
      });
      day = addDays(day, 1);
    }
    offset = 0;
  }

  return weeks;
}
