import {numToString} from "./physicsUtils";

class Distance {
    constructor(value = 1, unit = distanceUnit.yoctometer) {
        this.value = value * unit.value;
        this.unit = unit;
        this.getValue = function (unit = this.unit) {
            return this.value / unit.value
        }
    }

    toString(given_unit = null) {
        let used_unit = distanceUnit.lightyear;

        if (given_unit != null)
            used_unit = given_unit;
        else if (this.value < distanceUnit.zeptometer.value)
            used_unit = distanceUnit.yoctometer;
        else if (this.value < distanceUnit.attometer.value)
            used_unit = distanceUnit.zeptometer;
        else if (this.value < distanceUnit.femtometer.value)
            used_unit = distanceUnit.attometer;
        else if (this.value < distanceUnit.picometer.value)
            used_unit = distanceUnit.femtometer;
        else if (this.value < distanceUnit.nanometer.value)
            used_unit = distanceUnit.picometer;
        else if (this.value < distanceUnit.micrometer.value)
            used_unit = distanceUnit.nanometer;
        else if (this.value < distanceUnit.millimeter.value)
            used_unit = distanceUnit.micrometer;
        else if (this.value < distanceUnit.meter.value)
            used_unit = distanceUnit.millimeter;
        else if (this.value < distanceUnit.kilometer.value)
            used_unit = distanceUnit.meter;
        else if (this.value < distanceUnit.astro_unit.value / 10)
            used_unit = distanceUnit.kilometer;
        else if (this.value < distanceUnit.lightyear.value / 10)
            used_unit = distanceUnit.astro_unit;
        else if (this.value < distanceUnit.lightyear.value / 10)
            used_unit = distanceUnit.astro_unit;

        return numToString(this.getValue(used_unit)) + " " + used_unit.name;
    }
}


class DistanceUnit {
    constructor(value, name) {
        this.value = value;
        this.name = name;
    }
}

const distanceUnit = {
    // Measurement Units
    yoctometer: new DistanceUnit(1, "yoctometer"),
    zeptometer: new DistanceUnit(1000, "zeptometer"),
    attometer: new DistanceUnit(1e+6, "attometer"),
    femtometer: new DistanceUnit(1e+9, "femtometer"),
    picometer: new DistanceUnit(1e+12, "picometer"),
    nanometer: new DistanceUnit(1e+15, "nanometer"),
    micrometer: new DistanceUnit(1e+18, "micrometer"),
    millimeter: new DistanceUnit(1e+21, "millimeter"),
    meter: new DistanceUnit(1e+24, "meter"),
    kilometer: new DistanceUnit(1e+27, "kilometer"),
    astro_unit: new DistanceUnit(1.495978707e+35, "astronomical unit"),
    lightyear: new DistanceUnit(9.4607304725808e+39, "lightyear"),

    // Relevant distances
    radius_proton: new DistanceUnit(833000000, "Proton radius"),
    radius_gold_nucleus: new DistanceUnit(8450000000, "Gold nucleus radius"),
    radius_hydrogen: new DistanceUnit(25000000000000, "Hydrogen radius"),
    radius_carbon: new DistanceUnit(60000000000000, "Carbon radius"),
    angstrom: new DistanceUnit(100000000000000, "angstrom"),
    red_lightwave: new DistanceUnit(700000000000000000, "Red lightwave"),
    diameter_adn_helix: new DistanceUnit(2000000000000000, "Diameter of the ADN helix"),
    diameter_hair: new DistanceUnit(75000000000000000000, "Diameter of a hair"),
    milky_way_diameter: new DistanceUnit(9.999992109517905e+44, "Diameter of the Milky Way"),
    space_between_galaxies: new DistanceUnit(1, "Space between galaxies"),
    diameter_universe: new DistanceUnit(8.798479339500144e+50, "Diameter of the Universe")
};

const distancesList = [
    distanceUnit.yoctometer,
    distanceUnit.zeptometer,
    distanceUnit.attometer,
    distanceUnit.femtometer,
    distanceUnit.picometer,
    distanceUnit.nanometer,
    distanceUnit.micrometer,
    distanceUnit.millimeter,
    distanceUnit.meter,
    distanceUnit.kilometer,
    distanceUnit.astro_unit,
    distanceUnit.lightyear
];

//
export {Distance, DistanceUnit, distanceUnit}