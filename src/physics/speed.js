import {distanceUnit} from "./distance";
import {timeUnit} from "./time";

class Speed {
    constructor(value = 0, distanceUnit = distanceUnit.yoctometer, timeUnit = timeUnit.millisecond) {
        this.absolute_value = value * distanceUnit.value;
        this.distanceUnit = distanceUnit;
        this.timeUnit = timeUnit;
        this.getValue = function (unit = this.distanceUnit) {
            return this.absolute_value / distanceUnit.value
        }
    }

    toString() {
        return ""
    }
}

export {Speed}