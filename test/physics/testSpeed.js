import { expect } from 'chai';

import { describe } from 'mocha';
import { Speed } from '../../src/physics/speed';
import { distanceStandard } from '../../src/physics/distanceStandard';
import { timeStandard } from '../../src/physics/timeStandard';

describe('Speed values', () => {
  it('empty speed', () => {
    const speed = new Speed();
    expect(speed.value()).to.eql(0);
  });
  it('basic speed', () => {
    const speed = new Speed(1);
    expect(speed.value()).to.eql(1);
  });
  it('dist + time', () => {
    const speed = new Speed(1, distanceStandard.yoctometer, timeStandard.millisecond);
    expect(speed.value()).to.eql(1);
  });
  it('bigger time', () => {
    const speed = new Speed(1, distanceStandard.yoctometer, timeStandard.second);
    expect(speed.value()).to.eql(0.001);
  });
  it('bigger distance', () => {
    const speed = new Speed(1, distanceStandard.attometer, timeStandard.millisecond);
    expect(speed.value()).to.eql(1000000);
  });
  it('bigger both', () => {
    const speed = new Speed(1, distanceStandard.zeptometer, timeStandard.second);
    expect(speed.value()).to.eql(1);
  });
  it('compare m/s and km/h', () => {
    const speed1 = new Speed(1, distanceStandard.meter, timeStandard.second);
    const speed2 = new Speed(3.6, distanceStandard.kilometer, timeStandard.hour);
    expect(speed1.value().toPrecision(7)).to.eql(speed2.value().toPrecision(7));
  });
});
