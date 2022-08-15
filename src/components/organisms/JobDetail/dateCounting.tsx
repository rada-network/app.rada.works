import React, { Fragment } from 'react';
import { useCountdown } from 'src/hooks/useDateCounting';
export const DateCounting = (props: any) => {
  const [days, hours] = useCountdown(props.date);
  return (
    <Fragment>
      <div
        className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
        role="alert"
      >
        <img src="/contest/clock.svg" alt="info" className="w-4 h-4 mr-2" />
        <span className="sr-only">time</span>
        <div>
          {days >= 0
            ? `You have ${days} days, ${hours} hours left to submit art designs`
            : `the contest has ended`}
        </div>
      </div>
    </Fragment>
  );
};
