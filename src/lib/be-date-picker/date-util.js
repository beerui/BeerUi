// 获取指定月份天数
export const getDayCountOfMonth = function(year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  }
 // month 1 是二月份
  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
      return 29;
    } else {
      return 28;
    }
  }

  return 31;
};

export const getFirstDayOfMonth = function(date) {
  const temp = new Date(date.getTime());
  temp.setDate(1);
  return temp.getDay();
};

export const getDateTimestamp = function(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearTime(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearTime(time).getTime();
  } else {
    return NaN;
  }
};
export const getMonthTimestamp = function(time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};
export const clearDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth());
};
export const clearTime = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
export const nextDate = function(date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
};

export const modifyDate = function(date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
};

export const changeYearMonthAndClampDate = function(date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
  return modifyDate(date, year, month, monthDate);
};

export const prevMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1);
};

export const nextMonth = function(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1);
};

export const prevYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year - amount, month);
};

export const nextYear = function(date, amount = 1) {
  const year = date.getFullYear();
  const month = date.getMonth();
  return changeYearMonthAndClampDate(date, year + amount, month);
};
