/* eslint-disable max-len */
import { numToString } from './physicsUtils';
import { distanceStandard } from './distanceStandard';

class Distance {
  constructor(value = 0, currentUnit = distanceStandard.yoctometer) {
    this.absoluteValue = value * currentUnit.value;
    this.value = function (unit = null) {
      if (unit === null) return this.absoluteValue;
      return this.absoluteValue / unit.value;
    };
  }

  toString(askedUnit = null) {
    let usedUnit = distanceStandard.lightyear;

    if (askedUnit != null) usedUnit = askedUnit;
    else if (this.absoluteValue < distanceStandard.zeptometer.value) usedUnit = distanceStandard.yoctometer;
    else if (this.absoluteValue < distanceStandard.attometer.value) usedUnit = distanceStandard.zeptometer;
    else if (this.absoluteValue < distanceStandard.femtometer.value) usedUnit = distanceStandard.attometer;
    else if (this.absoluteValue < distanceStandard.picometer.value) usedUnit = distanceStandard.femtometer;
    else if (this.absoluteValue < distanceStandard.nanometer.value) usedUnit = distanceStandard.picometer;
    else if (this.absoluteValue < distanceStandard.micrometer.value) usedUnit = distanceStandard.nanometer;
    else if (this.absoluteValue < distanceStandard.millimeter.value) usedUnit = distanceStandard.micrometer;
    else if (this.absoluteValue < distanceStandard.meter.value) usedUnit = distanceStandard.millimeter;
    else if (this.absoluteValue < distanceStandard.kilometer.value) usedUnit = distanceStandard.meter;
    else if (this.absoluteValue < distanceStandard.astro_unit.value / 10) usedUnit = distanceStandard.kilometer;
    else if (this.absoluteValue < distanceStandard.lightyear.value / 10) usedUnit = distanceStandard.astro_unit;
    else if (this.absoluteValue < distanceStandard.lightyear.value / 10) usedUnit = distanceStandard.astro_unit;

    return `${numToString(this.value(usedUnit))} ${usedUnit.name}`;
  }
}

export { Distance };
