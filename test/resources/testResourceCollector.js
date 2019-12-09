import { expect } from 'chai';
import { describe } from 'mocha';
import { ResourcesCollector } from '../../src/resources/ResourcesCollector';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { Price, ResourceAmount } from '../../src/resources/Price';
import { resourceId } from '../../src/resources/Resource';
import { upgradesId } from '../../src/upgrades/Upgrade';


describe('ResourceCollector getTimeUntilInStock', () => {
  it('infinite time (no production)', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.kinetic_energy, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(Infinity);
  });
  it('1 up, 1 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.kinetic_energy, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(1);
  });
  it('2 up, 2 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil, 2);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.kinetic_energy, 2);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(1);
  });
  it('1 up, 2 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil, 1);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.kinetic_energy, 2);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(2);
  });
  it('2 up, 1 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_quantum_coil, 2);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.kinetic_energy, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(0.5);
  });
});
