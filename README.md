# Caltils
Utility functions for building calendar components.

## Usage
```
yarn add caltils
```

...then import and invoke...

```ts
import { getWeeks } from 'caltils';

const weeksWithDays: Day[][] = getWeeks(new Date());
```

...then you can render something like this...

```tsx
import React, { FC } from 'react';
import { getWeeks } from 'caltils';

interface CalendarProps {
  date: Date;
}

const Calendar: FC<CalendarProps> = ({ date }) => {
  const weeksWithDays: Day[][] = getWeeks(date);
  return (
    <>
      {weeks.map((week, i) => (
        <div>
          {week.map((day, ii) => (
            <button>{day.dayOfMonth}</button>
          )}
        </div>
      )}
    </>
  );
};
```

## API
```ts
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
): Day[][] {}
```
