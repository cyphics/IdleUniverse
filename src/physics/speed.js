import {timeUnit} from "./time";
import {distanceUnit} from "./distance";

class Speed {
    constructor(value = 1, distanceUnit = distanceUnit.yoctometer, timeUnit = timeUnit.millisecond) {
        this.absolute_value = value * distanceUnit.value;
        this.unit = unit;
        this.getValue = function (unit = this.unit) {
            return this.absolute_value / unit.value
        }
    }
}