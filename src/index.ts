import moment from 'moment';

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
  options: DayOptions = { format: 'MM/DD/YYYY' }
): Day[][] {
  if (!date) {
    throw new Error('A date is required');
  } else if (!moment(date).isValid()) {
    console.warn(`Invalid date - setting to today`, date);
    date = new Date();
  }

  const daysInMonth = moment(date).daysInMonth();
  const day = moment(date).startOf('month');
  let offset = day.day();
  const numOfWeeks = Math.ceil((daysInMonth + offset) / 7);

  // @ts-ignore
  const weeks: Day[][] = Array.apply(null, {
    length: numOfWeeks
  }).map(() => []);

  const current = new Date();

  const [firstWeek] = weeks;
  for (let i = offset; i > 0; i--) {
    const offsetDay = day.clone().subtract(i, 'd');
    firstWeek.push({
      date: offsetDay.toDate(),
      dayOfMonth: offsetDay.date(),
      isWeekendDay: offsetDay.isoWeekday() > 5,
      isPreviousMonth: true,
      isNextMonth: false,
      isToday: false,
      formattedDate: offsetDay.format(options.format)
    });
  }

  for (let i = 0, week = weeks[i]; i < numOfWeeks; i++, week = weeks[i]) {
    for (let dayOfWeek = offset; dayOfWeek < 7; dayOfWeek++) {
      week.push({
        date: day.toDate(),
        dayOfMonth: day.date(),
        isPreviousMonth: false,
        isToday: day.isSame(current, 'day'),
        isNextMonth: !day.isSame(date, 'month'),
        isWeekendDay: day.isoWeekday() > 5,
        formattedDate: day.format(options.format)
      });
      day.add(1, 'd');
    }
    offset = 0;
  }

  return weeks;
}
