import { distanceStandard } from './distanceStandard';
import { timeStandard } from './timeStandard';

class Speed {
  constructor(
    value = 0,
    currentDistanceUnit = distanceStandard.yoctometer,
    currentTimeUnit = timeStandard.millisecond,
  ) {
    this.absoluteValue = (value * currentDistanceUnit.value) / currentTimeUnit.value;
    this.value = function (askedDistanceUnit = null) {
      if (askedDistanceUnit === null) return this.absoluteValue;
      return this.absoluteValue;
    };
  }

  toString() {
    return '';
  }
}

export { Speed };
