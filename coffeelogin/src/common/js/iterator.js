export default class Iterator {
  constructor(list) {
    this.list = list;
    this.current = -1;
  }

  next() {
    this.current += 1;
    return {
      isDone: this.current >= this.list.length,
      getCurData: this.list[this.current]
    };
  }

  back() {
    this.current -= 1;
    return {
      isDone: this.current < 0,
      getCurData: this.list[this.current]
    };
  }

  getCurrent() {
    return this.current + 1;
  }
}
