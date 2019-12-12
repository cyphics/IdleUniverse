class Timer {
  constructor() {
    this.elapsedTime = 0;
  }

  addTime(additionalTime) {
    this.elapsedTime += additionalTime;
  }
}


export { Timer };
