
import fecha from './date.js';

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
export const timeRangeParse = function(date, separator) {
  if (!Array.isArray(date)) {
    date = date.split(separator);
  }
  if (date.length === 2) {
    const range1 = date[0];
    const range2 = date[1];
    return [parseDate(range1, 'HH:mm:ss'), parseDate(range2, 'HH:mm:ss')]
  }
  return []
}
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

export const parseDate = function(string, format) {
  return fecha.parse(string, format || 'yyyy-MM-dd');
};

export const modifyWithTimeString = (date, time) => {
  if (date == null || !time) {
    return date;
  }
  time = parseDate(time, 'HH:mm:ss');
  return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
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
const newArray = function(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
function setRangeData(arr, start, end, value) {
  for (let i = start; i < end; i++) {
    arr[i] = value;
  }
}

export const getRangeHours = function(ranges) {
  const hours = [];
  let disabledHours = [];

  (ranges || []).forEach(range => {
    const value = range.map(date => date.getHours());

    disabledHours = disabledHours.concat(newArray(value[0], value[1]));
  });

  if (disabledHours.length) {
    for (let i = 0; i < 24; i++) {
      hours[i] = disabledHours.indexOf(i) === -1;
    }
  } else {
    for (let i = 0; i < 24; i++) {
      hours[i] = false;
    }
  }

  return hours;
};
export const getRangeMinutes = function(ranges, hour) {
  const minutes = new Array(60);

  if (ranges && ranges.length > 0) {
    ranges.forEach(range => {
      const start = range[0];
      const end = range[1];
      const startHour = start.getHours();
      const startMinute = start.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();
      if (startHour === hour && endHour !== hour) {
        setRangeData(minutes, startMinute, 60, true);
      } else if (startHour === hour && endHour === hour) {
        setRangeData(minutes, startMinute, endMinute + 1, true);
      } else if (startHour !== hour && endHour === hour) {
        setRangeData(minutes, 0, endMinute + 1, true);
      } else if (startHour < hour && endHour > hour) {
        setRangeData(minutes, 0, 60, true);
      }
    });
  } else {
    setRangeData(minutes, 0, 60, true);
  }
  return minutes;
};
export const getRangeSeconds = function(ranges, hour, minutes, disabled) {
  // 默认所有秒都可选
  const seconds = new Array(60)
  // 如果分钟被禁用，所有秒都禁用
  if(!disabled) {
    setRangeData(seconds, 0, 60, true)
  }
  if(ranges && ranges.length > 0) {
      ranges.forEach(range => {
      const start = range[0];
      const end = range[1];
      const startHour = start.getHours();
      const startMinute = start.getMinutes();
      const endHour = end.getHours();
      const endMinute = end.getMinutes();
      const startSecond = start.getSeconds()
      const endSecond = end.getSeconds()
      if(startHour == hour && endHour == hour && startMinute == minutes  && endMinute == minutes) {
        setRangeData(seconds, 0, startSecond, true)
        setRangeData(seconds, endSecond + 1, 60, true)
      } else if(startHour == hour && startMinute == minutes) {
        setRangeData(seconds, 0, startSecond, true)
      } else if(endHour == hour && endMinute == minutes) {
        setRangeData(seconds, endSecond + 1, 60, true)
      }
    })
  }
  return seconds
}
export const modifyTime = function(date, h, m, s) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, s, date.getMilliseconds());
};
