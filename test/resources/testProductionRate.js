import { expect } from 'chai';
import { describe } from 'mocha';
import { ResourcesComputer } from '../../src/resources/ResourcesComputer';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { resourceId } from '../../src/resources/Resource';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { gameValues } from '../../src/ship/gameValues';


describe('ResourcesComputer getProductionRate', () => {
  it('empty rate', () => {
    const computer = new ResourcesComputer(new UpgradeManager());
    const rate = computer.getProductionRate(resourceId.kinetic_energy);
    expect(rate).to.be.eql(0);
  });
  it('buy first upgrade', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil);
    const computer = new ResourcesComputer(manager);
    const rate = computer.getProductionRate(resourceId.kinetic_energy);
    expect(rate).to.be.eql(gameValues.coil_kinetic_gain);
  });
  it('buy first upgrade twice', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil);
    manager.buyUpgrade(upgradesId.i_quantum_coil);
    const computer = new ResourcesComputer(manager);
    const rate = computer.getProductionRate(resourceId.kinetic_energy);
    expect(rate).to.be.eql(gameValues.coil_kinetic_gain * 2);
  });
});
