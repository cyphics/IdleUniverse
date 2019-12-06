import { expect } from 'chai';
import { describe } from 'mocha';
import { UpgradeStore } from '../../src/upgrades/UpgradeStore';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import {resourceId} from "../../src/resources/Resource";


describe('test getAvailableUpgrades', () => {
  it('nothing baught', () => {
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
    const expected = [upgradesId.sc_quantum_magnetism];
    expect(upgrades).to.eql(expected);
  });
  it('magnetism bought', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.sc_quantum_magnetism);
    const store = new UpgradeStore(manager);
    const upgrades = store.availableUpgrades;
    const expected = [upgradesId.st_terminal, upgradesId.st_quantum_generator];
    expect(upgrades).to.eql(expected);
  });
  it('generator bought', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.st_quantum_generator);
    const store = new UpgradeStore(manager);
    const upgrades = store.availableUpgrades;
    expect(upgrades.includes(upgradesId.i_quantum_coil)).to.be.true;
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
  it('buy first upgrade with available stock', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 10);
    const store = new UpgradeStore(manager, stock);
    const result = store.buyUpgrade(upgradesId.st_terminal);
    expect(result).to.be.true;
  });
  it('buy first upgrade and check available', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 10);
    const store = new UpgradeStore(manager, stock);
    store.buyUpgrade(upgradesId.st_terminal);
    const upgrades = store.availableUpgrades;
    expect(upgrades.includes(upgradesId.sc_quantum_magnetism)).to.be.true;
  });
  it('check stock depleted after purchase', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 20);
    const store = new UpgradeStore(manager, stock);
    store.buyUpgrade(upgradesId.st_terminal);
    const remainingStock = stock.getCurrentAmount(resourceId.kinetic_energy);
    expect(remainingStock).to.eql(10);
  });
});
