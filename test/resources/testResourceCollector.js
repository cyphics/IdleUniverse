import { expect } from 'chai';
import { describe } from 'mocha';
import { ResourcesCollector } from '../../src/resources/ResourcesCollector';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { Price, ResourceAmount } from '../../src/resources/Price';
import { resourceId } from '../../src/resources/Resource';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { Time } from '../../src/physics/time';

require('./testResourcesStock');
require('./testPrice');

describe('ResourceCollector getTimeUntilInStock', () => {
  it('infinite time (no production)', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.joule, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(Infinity);
  });
  it('1 up, 1 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.joule, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(1);
  });
  it('2 up, 2 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 2);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.joule, 2);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(1);
  });
  it('1 up, 2 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 1);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.joule, 2);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(2);
  });
  it('2 up, 1 res', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 2);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    const desiredResource = new ResourceAmount(resourceId.joule, 1);
    const price = new Price([desiredResource]);
    const time = collector.getTimeUntilInStock(price);
    expect(time.absolute_value).to.be.eql(0.5);
  });
});

describe('ResourceCollector getGeneratedResources', () => {
  it('no generation', () => {
    const elapsedTime = new Time();
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    collector.generateResources(elapsedTime);
    const kinenergy = stock.getCurrentAmount(resourceId.joule);
    expect(kinenergy).to.be.eql(0);
  });
  it('one coil', () => {
    const elapsedTime = new Time(1);
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    collector.generateResources(elapsedTime);
    const kinenergy = stock.getCurrentAmount(resourceId.joule);
    expect(kinenergy).to.be.eql(1);
  });
  it('multipe coils', () => {
    const elapsedTime = new Time(1);
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 5);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    collector.generateResources(elapsedTime);
    const kinenergy = stock.getCurrentAmount(resourceId.joule);
    expect(kinenergy).to.be.eql(5);
  });
  it('multiple ticks', () => {
    const elapsedTime = new Time(5);
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 5);
    const stock = new ResourcesStock();
    const collector = new ResourcesCollector(manager, stock);
    collector.generateResources(elapsedTime);
    const kinenergy = stock.getCurrentAmount(resourceId.joule);
    expect(kinenergy).to.be.eql(25);
  });
});
