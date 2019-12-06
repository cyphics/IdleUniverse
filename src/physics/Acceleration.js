import { distanceStandard } from './distanceStandard';
import { timeStandard } from './timeStandard';

class Acceleration {
  constructor(value = 0,
    distanceUnit = distanceStandard.yoctometer,
    timeUnit = timeStandard.millisecond) {
    this.absoluteValue = value;
  }

  value() {
    return this.absoluteValue;
  }
}

export { Acceleration };
