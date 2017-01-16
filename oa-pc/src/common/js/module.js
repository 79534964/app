export default {
  getDateTime(date, type) {
    let str = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
    str = type === 'start' ? `${str} 00:00` : `${str} 23:59`;
    return str;
  }
};
