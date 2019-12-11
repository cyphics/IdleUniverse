class Timer {
  constructor() {
    this.elapsedTime = 0;
  }

  addTime(additionalTime) {
    this.elapsedTime += additionalTime.absolute_value;
  }
}


export { Timer };
