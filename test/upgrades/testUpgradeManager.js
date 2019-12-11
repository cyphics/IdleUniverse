import { expect } from 'chai';
import { describe } from 'mocha';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { resourceId } from '../../src/resources/Resource';


describe('UpgradesManager getPrice', () => {
  it('first coil purchase', () => {
    const manager = new UpgradeManager();
    const price = manager.getPrice(upgradesId.i_lvl_1_coil);
    const kinEnergy = price.getAmount(resourceId.copper);
    expect(kinEnergy).to.eql(10);
  });
  it('second coil purchase', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const price = manager.getPrice(upgradesId.i_lvl_1_coil);
    const kinEnergy = price.getAmount(resourceId.copper);
    expect(kinEnergy).to.eql(12);
  });
});
