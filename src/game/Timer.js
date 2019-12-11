class Timer {
  constructor() {
    this.elapsedTime = 0;
  }

  addTime(additionalTime) {
    this.elapsedTime += additionalTime.absoluteValue;
  }
}


export { Timer };
