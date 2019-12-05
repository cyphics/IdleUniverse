import { expect } from 'chai';

import {distanceUnit, DistanceUnit, Distance} from '../../src/physics/distance'
import {describe} from "mocha";

describe('distance units', () => {
    it('create DistanceUnit', () => {
        let dist = new DistanceUnit(1, "unit name");
        expect(dist.value).to.eql(1);
        expect(dist.name).to.eql("unit name");
    });
    it('use distanceUnit', () => {
        let dist = distanceUnit.yoctometer;
        expect(dist.value).to.eql(1);
        expect(dist.name).to.eql("yoctometer");
    });
    it('meter', () => {
        let astro = distanceUnit.meter;
        expect(astro.value).to.eql(distanceUnit.yoctometer.value * 1e+24);
    });
    it('astro unit', () => {
        let astro = distanceUnit.astro_unit;
        expect(astro.value).to.be.closeTo(distanceUnit.meter.value * 149597870700, 0.0001);
    });
    it('lightyear', () => {
        let lightyear = distanceUnit.lightyear.value.toPrecision(7);
        expect(lightyear).to.eql(((distanceUnit.kilometer.value * 9460730472580.8).toPrecision(7)));
    });
    it('proton radius', () => {
        let under_test = distanceUnit.radius_proton;
        expect(under_test.value).to.eql(distanceUnit.femtometer.value * 0.833, 0.0001);
    });
    it('gold nucleus radius', () => {
        let under_test = distanceUnit.radius_gold_nucleus;
        expect(under_test.value).to.be.closeTo(distanceUnit.femtometer.value * 8.45, 0.0001);
    });
    it('hydrogen radius', () => {
        let under_test = distanceUnit.radius_hydrogen;
        expect(under_test.value).to.eql(distanceUnit.picometer.value * 25, 0.0001);
    });
    it('carbon radius', () => {
        let under_test = distanceUnit.radius_carbon;
        expect(under_test.value).to.eql(distanceUnit.picometer.value * 60, 0.0001);
    });
    it('angstrom', () => {
        let under_test = distanceUnit.angstrom;
        expect(under_test.value).to.eql(distanceUnit.meter.value * Math.pow(10, -10));
    });
    it('red lightwave', () => {
        let under_test = distanceUnit.red_lightwave;
        expect(under_test.value).to.eql(distanceUnit.nanometer.value * 700);
    });
    it('adn helix diameter', () => {
        let under_test = distanceUnit.diameter_adn_helix;
        expect(under_test.value).to.eql(distanceUnit.nanometer.value * 2);
    });
    it('hair diameter', () => {
        let under_test = distanceUnit.diameter_hair;
        expect(under_test.value).to.eql(distanceUnit.micrometer.value * 75);
    });
    it('galaxy diameter', () => {
        let under_test = distanceUnit.milky_way_diameter;
        expect(under_test.value).to.eql(distanceUnit.lightyear.value * 105700);
    });
    it('universe diameter', () => {
        let under_test = distanceUnit.diameter_universe;
        expect(under_test.value).to.eql(distanceUnit.lightyear.value * 93000000000);
    });
});

describe('Distances creation', () => {

    it('build Distance object', () => {
        let under_test = new Distance(1, distanceUnit.yoctometer);
        expect(under_test.getValue(distanceUnit.yoctometer)).to.eql(1);
    });
    it('absolute absolute_value', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.getValue(distanceUnit.yoctometer)).to.eql(1e+9);
    });
    it('default absolute_value', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.getValue()).to.eql(1);
    });
    it('smaller unit', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.getValue(distanceUnit.attometer)).to.eql(1000);
    });
    it('bigger unit', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.getValue(distanceUnit.picometer)).to.eql(0.001);
    });
});

describe('Distances toString', () => {
    it('1, yoctometer', () => {
        let under_test = new Distance(1, distanceUnit.yoctometer);
        expect(under_test.toString()).to.eql("1 yoctometer");
    });
    it('1, femtometer', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.toString()).to.eql("1 femtometer");
    });
    it('1 billion yoctometer', () => {
        let under_test = new Distance(1, distanceUnit.femtometer);
        expect(under_test.toString(distanceUnit.yoctometer)).to.eql("1 billion yoctometer");
    });
    it('scientific notation', () => {
        let under_test = new Distance(1, distanceUnit.meter);
        expect(under_test.toString(distanceUnit.yoctometer)).to.eql("1e+24 yoctometer");
    });
    it('scientific notation 2', () => {
        let under_test = new Distance(1, distanceUnit.nanometer);
        expect(under_test.toString(distanceUnit.yoctometer)).to.eql("1e+15 yoctometer");
    });
    it('meter', () => {
        let under_test = new Distance(1, distanceUnit.meter);
        expect(under_test.toString()).to.eql("1 meter");
    });
    it('thousand millimeters', () => {
        let under_test = new Distance(1000, distanceUnit.millimeter);
        expect(under_test.toString()).to.eql("1 meter");
    });
    it('thousand kilometers', () => {
        let under_test = new Distance(1000, distanceUnit.kilometer);
        expect(under_test.toString()).to.eql("1 thousand kilometer");
    });
    it('a lot of kilometers', () => {
        let under_test = new Distance(1.496e+8, distanceUnit.kilometer);
        expect(under_test.toString()).to.eql("1 astronomical unit");
    });
    it('a lot of astro unit', () => {
        let under_test = new Distance(9.461e+15, distanceUnit.meter);
        expect(under_test.toString()).to.eql("1 lightyear");
    });

});