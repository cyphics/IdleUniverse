import { expect } from 'chai';
import { describe } from 'mocha';
import { Simulation, strategyId } from '../../src/simulation/Simulation';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { resourceId } from '../../src/resources/Resource';


describe('run simulations', () => {
  it('cheapest', () => {
    const manager = new UpgradeManager();
    // manager.buyUpgrade(upgradesId.st_terminal);
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 110);
    stock.addResource(resourceId.steel, 170);
    stock.addResource(resourceId.iron, 15);
    stock.addResource(resourceId.copper, 20);
    stock.addResource(resourceId.lines_of_code, 40);
    stock.addResource(resourceId.knowledge, 60);
    const simulation = new Simulation(manager, stock, strategyId.cheapest, 1000);
    simulation.run();
    const history = simulation.toString();
    console.log(history);
    // expect(history).to.eql(1);
  });
});
