import { expect } from 'chai';
import { describe } from 'mocha';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ShipEngine } from '../../src/game/ShipEngine';
import { upgradesId } from '../../src/upgrades/Upgrade';


describe('test getCurrentAcceleration', () => {
  it('not moving', () => {
    const upgrades = new UpgradeManager();
    const engine = new ShipEngine(upgrades);
    const accel = engine.getCurrentAcceleration();
    expect(accel.value()).to.be.eql(0);
  });
  it('first throttle', () => {
    const upgrades = new UpgradeManager();
    upgrades.buyUpgrade(upgradesId.i_energy_cell_a);
    const engine = new ShipEngine(upgrades);
    const accel = engine.getCurrentAcceleration();
    expect(accel.value()).to.be.eql(1);
  });
});
