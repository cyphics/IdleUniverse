import { expect } from 'chai';

import PhysicsComputer from '../../src/physics/physics'
describe('getTraveledDistance()', () => {
    it('speed 0, duration 0, acceleration 0', () => {
        expect(PhysicsComputer.getTraveledDistance(0, 0, 0)).to.eql(0);
    });
    it('speed 1, duration 1, acceleration 0', () => {
        expect(PhysicsComputer.getTraveledDistance(1, 1, 0)).to.eql(1);
    });
    it('speed 100, duration 1, acceleration 0', () => {
        expect(PhysicsComputer.getTraveledDistance(100, 1, 0)).to.eql(100);
    });
    it('speed 0, duration 1, acceleration 1', () => {
        expect(PhysicsComputer.getTraveledDistance(0, 1, 1)).to.eql(0.5);
    });
});

describe('getRemainingTime', () => {
    it('distance 0, speed 0, acceleration 0', () => {
        expect(PhysicsComputer.getRemainingTime(0, 0, 0)).to.eql(0);
    });
    it('distance 1, speed 1, acceleration 0', () => {
        expect(PhysicsComputer.getRemainingTime(1, 1, 0)).to.eql(1);
    });
    it('distance 100, speed 100, acceleration 0', () => {
        expect(PhysicsComputer.getRemainingTime(100, 100, 0)).to.eql(1);
    });
    // it('distance 0, speed 1, acceleration 1', () => {
    //     expect(PhysicsComputer.getRemainingTime(1, 0, 1)).to.eql(0.5);
    // });
});