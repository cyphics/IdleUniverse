import { distanceStandard } from './distanceStandard';
import { timeStandard } from './timeStandard';

class Speed {
  constructor(
    value = 0,
    currentDistanceUnit = distanceStandard.yoctometer,
    currentTimeUnit = timeStandard.millisecond,
  ) {
    this.absolute_value = value * currentDistanceUnit.value;
    this.distanceUnit = currentDistanceUnit;
    this.timeUnit = currentTimeUnit;
    this.getValue = function (unit = this.distanceUnit) {
      return this.absolute_value / currentDistanceUnit.value;
    };
  }

  toString() {
    return '';
  }
}

export { Speed };
