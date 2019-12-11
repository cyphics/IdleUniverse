import { numToString } from './physicsUtils';
import { timeStandard } from './timeStandard';

class Time {
  constructor(value = 0, unit = timeStandard.millisecond) {
    this.absoluteValue = value * unit.value;
    this.value = function (requiredUnit = null) {
      if (requiredUnit === null) return this.absoluteValue;
      return this.absoluteValue / requiredUnit.value;
    };
  }

  toString() {
    let total = this.absoluteValue;

    let output = '';
    let millisec = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    let years = 0;
    const galac = (total / timeStandard.galactic_year.value);

    if (galac > 1) return `${numToString(galac)} galactic year`;

    years = Math.floor(total / timeStandard.year.value);
    total %= timeStandard.year.value;
    days = Math.floor(total / timeStandard.day.value);
    total %= timeStandard.day.value;
    hours = Math.floor(total / timeStandard.hour.value);
    total %= timeStandard.hour.value;
    minutes = Math.floor(total / timeStandard.minute.value);
    total %= timeStandard.minute.value;
    seconds = Math.floor(total / timeStandard.second.value);
    total %= timeStandard.second.value;
    millisec = total;

    /*
        Build the output string. The return statements ensure we only give 2
        units of time maximum. Printing "2 days, 3 hours" is enough. Printing
        "2 days, 3 hours, 25 minutes" is too much.
         */
    output = addTimeInString(output, years, 'year');
    output = addTimeInString(output, days, 'day');
    if (years > 0) return output;
    output = addTimeInString(output, hours, 'hour');
    if (days > 0) return output;
    output = addTimeInString(output, minutes, 'minute');
    if (hours > 0) return output;
    output = addTimeInString(output, seconds, 'second');
    if (minutes > 0) return output;
    output = addTimeInString(output, millisec, 'millisecond');

    if (output === '') return '0 millisecond';
    return output;
  }

  add(additionalTime) {
    this.absoluteValue += additionalTime.absoluteValue;
  }
}

function addTimeInString(originalOutput, value, valueName) {
  let output = originalOutput;
  if (output !== '' && value > 0) output += ', ';
  if (value > 0) {
    output += `${value} ${valueName}`;
    if (value > 1) output += 's';
  }
  return output;
}


export { Time };
