import { expect } from 'chai';
import PhysicsComputer from '../../src/physics/physics';
import { Distance } from '../../src/physics/Distance';
import { Speed } from '../../src/physics/speed';
import { Acceleration } from '../../src/physics/Acceleration';
import { Time } from '../../src/physics/time';
import { distanceStandard } from '../../src/physics/distanceStandard';
import { timeStandard } from '../../src/physics/timeStandard';

require('./testDistance');
require('./testSpeed');
require('./testTime');
require('./testAcceleration');

describe('getTraveledDistance()', () => {
  it('speed 0, duration 0, acceleration 0', () => {
    const speed = new Speed();
    const duration = new Time();
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getTraveledDistance(speed, duration, acceleration).value()).to.eql(0);
  });
  it('speed 1, duration 1, acceleration 0', () => {
    const speed = new Speed(1);
    const duration = new Time(1);
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getTraveledDistance(speed, duration, acceleration).value()).to.eql(1);
  });
  it('speed 100, duration 1, acceleration 0', () => {
    const speed = new Speed(100);
    const duration = new Time(1);
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getTraveledDistance(speed, duration, acceleration).value()).to.eql(100);
  });
  it('speed 0, duration 1, acceleration 1', () => {
    const speed = new Speed();
    const duration = new Time(1);
    const acceleration = new Acceleration(1);
    expect(PhysicsComputer.getTraveledDistance(speed, duration, acceleration).value()).to.eql(0.5);
  });
});

describe('getRemainingTime', () => {
  it('distance 0, speed 0, acceleration 0', () => {
    const distance = new Distance();
    const speed = new Speed();
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).value()).to.eql(0);
  });
  it('distance 1, speed 1, acceleration 0', () => {
    const distance = new Distance(1);
    const speed = new Speed(1);
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).value()).to.eql(1);
  });
  it('distance 100, speed 100, acceleration 0', () => {
    const distance = new Distance(100);
    const speed = new Speed(100);
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).value()).to.eql(1);
  });
  it('infinity', () => {
    const distance = new Distance(1);
    const speed = new Speed();
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).value()).to.eql(-Infinity);
  });
  it('universe, 1, 0', () => {
    const distance = new Distance(1, distanceStandard.diameter_universe);
    const speed = new Speed(1);
    const acceleration = new Acceleration();
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).toString()).to.eql('1.1965965061802576e+32 galactic year');
  });
  it('universe, 1, 1', () => {
    const distance = new Distance(1, distanceStandard.diameter_universe);
    const speed = new Speed(1);
    const acceleration = new Acceleration(1);
    const expected = '5\'705\'042 galactic year';
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).toString()).to.eql(expected);
  });
  it('universe, meter, second', () => {
    const distance = new Distance(1, distanceStandard.diameter_universe);
    const speed = new Speed(1, distanceStandard.meter, timeStandard.second);
    const acceleration = new Acceleration(0);
    const expected = '119\'659\'650\'618 galactic year';
    expect(PhysicsComputer.getRemainingTime(distance, speed, acceleration).toString()).to.eql(expected);
  });
});
