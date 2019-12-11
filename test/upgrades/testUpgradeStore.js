import { expect } from 'chai';
import { describe } from 'mocha';
import { UpgradeStore } from '../../src/upgrades/UpgradeStore';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { resourceId } from '../../src/resources/Resource';


describe('test getAvailableUpgrades', () => {
  it('nothing bought', () => {
    const store = new UpgradeStore(new UpgradeManager(), new ResourcesStock());
    const upgrades = store.availableUpgrades;
    const expected = [upgradesId.st_terminal];
    expect(upgrades).to.eql(expected);
  });
  it('terminal bought', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.st_terminal);
    const store = new UpgradeStore(manager);
    const upgrades = store.availableUpgrades;
    const expected = [upgradesId.st_lvl_1_generator];
    expect(upgrades).to.eql(expected);
  });
  it('generator bought', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.st_lvl_1_generator);
    const store = new UpgradeStore(manager);
    const upgrades = store.availableUpgrades;
    expect(upgrades.includes(upgradesId.i_lvl_1_coil)).to.be.true;
  });
});

describe('buy upgrades', () => {
  it('buy first upgrade with empty stock', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const store = new UpgradeStore(manager, stock);
    const result = store.buyUpgrade(upgradesId.st_terminal);
    expect(result).to.be.false;
  });
  it('first purchase successful', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 10);
    const store = new UpgradeStore(manager, stock);
    const result = store.buyUpgrade(upgradesId.st_terminal);
    expect(result).to.be.true;
  });
  it('buy first upgrade and check available', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 10);
    const store = new UpgradeStore(manager, stock);
    store.buyUpgrade(upgradesId.st_terminal);
    const upgrades = store.availableUpgrades;
    expect(upgrades.includes(upgradesId.st_lvl_1_generator)).to.be.true;
  });
  it('check stock depleted after purchase', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 20);
    const store = new UpgradeStore(manager, stock);
    store.buyUpgrade(upgradesId.st_terminal);
    const remainingStock = stock.getCurrentAmount(resourceId.joule);
    expect(remainingStock).to.eql(10);
  });
});
