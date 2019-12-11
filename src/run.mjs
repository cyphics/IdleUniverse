import { UpgradeManager } from './upgrades/UpgradeManager';
import { ResourcesStock } from './resources/ResourcesStock';
import { resourceId } from './resources/Resource';
import { Simulation, strategyId } from './simulation/Simulation';

const manager = new UpgradeManager();
// manager.buyUpgrade(upgradesId.st_terminal);
const stock = new ResourcesStock();
stock.addResource(resourceId.joule, 10);
stock.addResource(resourceId.steel, 10);
stock.addResource(resourceId.iron, 10);
stock.addResource(resourceId.copper, 20);
stock.addResource(resourceId.lines_of_code, 30);
const simulation = new Simulation(manager, stock, strategyId.cheapest, 100);
simulation.run();
const history = simulation.toString();
console.log(history);
