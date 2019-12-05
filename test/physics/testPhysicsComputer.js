import { expect } from 'chai';

import PhysicsComputer from '../../src/physics/physics';
import { Distance } from '../../src/physics/Distance';
import { Speed } from '../../src/physics/speed';
import { Acceleration } from '../../src/physics/Acceleration';
import { Time } from '../../src/physics/time';

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
  // it('distance 0, speed 1, acceleration 1', () => {
  //     expect(PhysicsComputer.getRemainingTime(1, 0, 1)).to.eql(0.5);
  // });
});
