import { expect } from 'chai';
import { describe } from 'mocha';
import { RateComputer } from '../../src/resources/RateComputer';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { resourceId } from '../../src/resources/Resource';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { gameValues } from '../../src/game/gameValues';

require('./testResourcesStock');
require('./testPrice');
require('../upgrades/testUpgradeStore');

describe('ResourcesGenerator getProductionRate', () => {
  it('empty rate', () => {
    const computer = new RateComputer(new UpgradeManager());
    const rate = computer.getProductionRate(resourceId.joule);
    expect(rate).to.be.eql(0);
  });
  it('buy first upgrade', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const computer = new RateComputer(manager);
    const rate = computer.getProductionRate(resourceId.joule);
    expect(rate).to.be.eql(gameValues.coil_kinetic_gain);
  });
  it('buy first upgrade twice', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const computer = new RateComputer(manager);
    const rate = computer.getProductionRate(resourceId.joule);
    expect(rate).to.be.eql(gameValues.coil_kinetic_gain * 2);
  });
  it('test resource not upgraded', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const computer = new RateComputer(manager);
    const rate = computer.getProductionRate(resourceId.dark_matter);
    expect(rate).to.be.eql(0);
  });
});
