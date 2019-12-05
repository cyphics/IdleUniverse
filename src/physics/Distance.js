import { numToString } from './physicsUtils';
import { distanceStandard } from './distanceStandard';

class Distance {
  constructor(value = 0, currentUnit = distanceStandard.yoctometer) {
    this.value = value * currentUnit.value;
    this.unit = currentUnit;
    this.getValue = function (unit = this.unit) {
      return this.value / unit.value;
    };
  }

  toString(askedUnit = null) {
    let usedUnit = distanceStandard.lightyear;

    if (askedUnit != null) usedUnit = askedUnit;
    else if (this.value < distanceStandard.zeptometer.value) usedUnit = distanceStandard.yoctometer;
    else if (this.value < distanceStandard.attometer.value) usedUnit = distanceStandard.zeptometer;
    else if (this.value < distanceStandard.femtometer.value) usedUnit = distanceStandard.attometer;
    else if (this.value < distanceStandard.picometer.value) usedUnit = distanceStandard.femtometer;
    else if (this.value < distanceStandard.nanometer.value) usedUnit = distanceStandard.picometer;
    else if (this.value < distanceStandard.micrometer.value) usedUnit = distanceStandard.nanometer;
    else if (this.value < distanceStandard.millimeter.value) usedUnit = distanceStandard.micrometer;
    else if (this.value < distanceStandard.meter.value) usedUnit = distanceStandard.millimeter;
    else if (this.value < distanceStandard.kilometer.value) usedUnit = distanceStandard.meter;
    else if (this.value < distanceStandard.astro_unit.value / 10) usedUnit = distanceStandard.kilometer;
    else if (this.value < distanceStandard.lightyear.value / 10) usedUnit = distanceStandard.astro_unit;
    else if (this.value < distanceStandard.lightyear.value / 10) usedUnit = distanceStandard.astro_unit;

    return `${numToString(this.getValue(usedUnit))} ${usedUnit.name}`;
  }
}

export { Distance };
