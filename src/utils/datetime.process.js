const moment = require('moment');

module.exports = class DateTimeProc {
  static dateToJsonixObj(dateString) {
    let date;
    let T00Index = dateString.indexOf('T00');
    if (T00Index > 0)
      date = moment(dateString, 'YYYY-MM-DD').toObject();
    else
      date = moment(dateString).toObject();
    let dateObj = {
      year: date.years,
      month: date.months + 1,
      day: date.date + 1,
      hour: date.hours,
      minute: date.minutes,
      second: date.seconds,
      fractionalSecond: date.milliseconds ? date.milliseconds : 0,
      timezone: (date.milliseconds ? date.milliseconds : 0) / 60,
      date: dateString
    };
    return dateObj;
  }
};