import {numToString} from "./physicsUtils";

class Time {
    constructor(value = 1, unit = timeUnit.millisecond) {
        this.absolute_value = value * unit.value;
        this.unit = unit;
        this.getValue = function (unit = this.unit) {
            return this.absolute_value / unit.value
        }
    }

    toString() {
        let total = this.absolute_value;

        let output = "";
        let millisec = 0;
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let days = 0;
        let years = 0;
        let galac = (total / timeUnit.galactic_year.value);

        if (galac > 1)
            return numToString(galac) + " " + "galactic year";

        years = Math.floor(total / timeUnit.year.value);
        total %= timeUnit.year.value;
        days = Math.floor(total / timeUnit.day.value);
        total %= timeUnit.day.value;
        hours = Math.floor(total / timeUnit.hour.value);
        total %= timeUnit.hour.value;
        minutes = Math.floor(total / timeUnit.minute.value);
        total %= timeUnit.minute.value;
        seconds = Math.floor(total / timeUnit.second.value);
        total %= timeUnit.second.value;
        millisec = total;

        /*
        Build the output string. The return statements ensure we only give 2
        units of time maximum. Printing "2 days, 3 hours" is enough. Printing
        "2 days, 3 hours, 25 minutes" is too much.
         */
        output = addTimeInString(output, years, "year");
        output = addTimeInString(output, days, "day");
        if (years > 0)
            return output;
        output = addTimeInString(output, hours, "hour");
        if (days > 0)
            return output;
        output = addTimeInString(output, minutes, "minute");
        if (hours > 0)
            return output;
        output = addTimeInString(output, seconds, "second");
        if (minutes > 0)
            return output;
        output = addTimeInString(output, millisec, "millisecond");
        return output;
    }

    add(additionalTime) {
        this.absolute_value += additionalTime.absolute_value
    }
}

function addTimeInString(originalOutput, value, valueName) {
    let output = originalOutput;
    if (output !== "" && value > 0)
        output += ", ";
    if (value > 0) {
        output += value + " " + valueName;
        if (value > 1)
            output += "s";
    }
    return output
}

class TimeUnit {
    constructor(value, name) {
        this.value = value;
        this.name = name;
    }
}

const timeUnit = {
    // Measurement Units
    millisecond: new TimeUnit(1, "millisecond"),
    second: new TimeUnit(1000, "second"),
    minute: new TimeUnit(60000, "minute"),
    hour: new TimeUnit(3600000, "hour"),
    day: new TimeUnit(86400000, "day"),
    year: new TimeUnit(31557600000, "year"),
    galactic_year: new TimeUnit(7352920800000000000, "galactic year")
};

export {Time, TimeUnit, timeUnit}