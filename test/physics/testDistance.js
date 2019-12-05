import { expect } from 'chai';

import { describe } from 'mocha';
import { Distance } from '../../src/physics/Distance';
import { distanceStandard } from '../../src/physics/distanceStandard';

describe('distance units', () => {
  it('use distanceStandard', () => {
    const dist = distanceStandard.yoctometer;
    expect(dist.value).to.eql(1);
    expect(dist.name).to.eql('yoctometer');
  });
  it('meter', () => {
    const astro = distanceStandard.meter;
    expect(astro.value).to.eql(distanceStandard.yoctometer.value * 1e+24);
  });
  it('astro unit', () => {
    const astro = distanceStandard.astro_unit;
    expect(astro.value).to.be.closeTo(distanceStandard.meter.value * 149597870700, 0.0001);
  });
  it('lightyear', () => {
    const lightyear = distanceStandard.lightyear.value.toPrecision(7);
    expect(lightyear).to.eql(((distanceStandard.kilometer.value * 9460730472580.8).toPrecision(7)));
  });
  it('proton radius', () => {
    const actual = distanceStandard.radius_proton;
    expect(actual.value).to.eql(distanceStandard.femtometer.value * 0.833, 0.0001);
  });
  it('gold nucleus radius', () => {
    const actual = distanceStandard.radius_gold_nucleus;
    expect(actual.value).to.be.closeTo(distanceStandard.femtometer.value * 8.45, 0.0001);
  });
  it('hydrogen radius', () => {
    const actual = distanceStandard.radius_hydrogen;
    expect(actual.value).to.eql(distanceStandard.picometer.value * 25, 0.0001);
  });
  it('carbon radius', () => {
    const actual = distanceStandard.radius_carbon;
    expect(actual.value).to.eql(distanceStandard.picometer.value * 60, 0.0001);
  });
  it('angstrom', () => {
    const actual = distanceStandard.angstrom;
    expect(actual.value).to.eql(distanceStandard.meter.value * Math.pow(10, -10));
  });
  it('red lightwave', () => {
    const actual = distanceStandard.red_lightwave;
    expect(actual.value).to.eql(distanceStandard.nanometer.value * 700);
  });
  it('adn helix diameter', () => {
    const actual = distanceStandard.diameter_adn_helix;
    expect(actual.value).to.eql(distanceStandard.nanometer.value * 2);
  });
  it('hair diameter', () => {
    const actual = distanceStandard.diameter_hair;
    expect(actual.value).to.eql(distanceStandard.micrometer.value * 75);
  });
  it('galaxy diameter', () => {
    const actual = distanceStandard.milky_way_diameter;
    expect(actual.value).to.eql(distanceStandard.lightyear.value * 105700);
  });
  it('universe diameter', () => {
    const actual = distanceStandard.diameter_universe;
    expect(actual.value).to.eql(distanceStandard.lightyear.value * 93000000000);
  });
});

describe('Distances creation', () => {
  it('build Distance object', () => {
    const actual = new Distance(1, distanceStandard.yoctometer);
    expect(actual.getValue(distanceStandard.yoctometer)).to.eql(1);
  });
  it('absolute absolute_value', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.getValue(distanceStandard.yoctometer)).to.eql(1e+9);
  });
  it('default absolute_value', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.getValue()).to.eql(1);
  });
  it('smaller unit', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.getValue(distanceStandard.attometer)).to.eql(1000);
  });
  it('bigger unit', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.getValue(distanceStandard.picometer)).to.eql(0.001);
  });
});

describe('Distances toString', () => {
  it('empty distance', () => {
    const actual = new Distance();
    expect(actual.toString()).to.eql('0 yoctometer');
  });
  it('1, yoctometer', () => {
    const actual = new Distance(1, distanceStandard.yoctometer);
    expect(actual.toString()).to.eql('1 yoctometer');
  });
  it('1, femtometer', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.toString()).to.eql('1 femtometer');
  });
  it('1 billion yoctometer', () => {
    const actual = new Distance(1, distanceStandard.femtometer);
    expect(actual.toString(distanceStandard.yoctometer)).to.eql('1 billion yoctometer');
  });
  it('scientific notation', () => {
    const actual = new Distance(1, distanceStandard.meter);
    expect(actual.toString(distanceStandard.yoctometer)).to.eql('1e+24 yoctometer');
  });
  it('scientific notation 2', () => {
    const actual = new Distance(1, distanceStandard.nanometer);
    expect(actual.toString(distanceStandard.yoctometer)).to.eql('1e+15 yoctometer');
  });
  it('meter', () => {
    const actual = new Distance(1, distanceStandard.meter);
    expect(actual.toString()).to.eql('1 meter');
  });
  it('thousand millimeters', () => {
    const actual = new Distance(1000, distanceStandard.millimeter);
    expect(actual.toString()).to.eql('1 meter');
  });
  it('thousand kilometers', () => {
    const actual = new Distance(1000, distanceStandard.kilometer);
    expect(actual.toString()).to.eql('1 thousand kilometer');
  });
  it('a lot of kilometers', () => {
    const actual = new Distance(1.496e+8, distanceStandard.kilometer);
    expect(actual.toString()).to.eql('1 astronomical unit');
  });
  it('a lot of astro unit', () => {
    const actual = new Distance(9.461e+15, distanceStandard.meter);
    expect(actual.toString()).to.eql('1 lightyear');
  });
});
