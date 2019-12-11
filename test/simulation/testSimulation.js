import { expect } from 'chai';
import { describe } from 'mocha';
import { Simulation, strategyId } from '../../src/simulation/Simulation';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { resourceId } from '../../src/resources/Resource';


describe('test getNextUpgrade', () => {
  it('broken', () => {
    const simulation = new Simulation(new UpgradeManager(), new ResourcesStock());
    const nextUpgrade = simulation.getNextUpgradeToBuy();
    expect(nextUpgrade).to.eql(upgradesId.i_lvl_1_coil);
  });
  it('cheapest', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 10);
    const simulation = new Simulation(
      new UpgradeManager(),
      stock,
      strategyId.cheapest,
      100,
    );
    const nextUpgrade = simulation.getNextUpgradeToBuy();
    expect(nextUpgrade).to.eql(upgradesId.st_terminal);
  });
  it('run boken empty game', () => {
    const simulation = new Simulation(
      new UpgradeManager(),
      new ResourcesStock(),
      strategyId.broken,
      10,
    );
    simulation.run();
    const history = simulation.getHistory();
    expect(history.length).to.eql(0);
  });
  it('run boken first update', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 10);
    const simulation = new Simulation(
      new UpgradeManager(),
      stock,
      strategyId.broken,
      10,
    );
    simulation.run();
    const history = simulation.getHistory();
    const expectedResut = [
      {
        timestamp: 0,
        upgradeId: upgradesId.i_lvl_1_coil,
      },
    ];
    expect(history).to.eql(expectedResut);
  });
  it('run boken second coil', () => {
    const stock = new ResourcesStock();
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.i_lvl_1_coil, 1);
    const simulation = new Simulation(
      manager,
      stock,
      strategyId.broken,
      12,
    );
    simulation.run();
    const history = simulation.getHistory();
    const expectedResut = [
      {
        timestamp: 12,
        upgradeId: upgradesId.i_lvl_1_coil,
      },
    ];
    expect(history).to.eql(expectedResut);
  });
});
