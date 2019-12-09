import { Time } from '../physics/time';
import { ResourcesComputer } from './ResourcesComputer';

class ResourcesCollector {
  constructor(upgradesManager, resourcesStock) {
    this.updatesManager = upgradesManager;
    this.stock = resourcesStock;
    this.computer = new ResourcesComputer(upgradesManager);
  }

  getGeneratedResources(time) {
    let generatedResources = new Price();

  }

  getTimeUntilInStock(price) {
    let requiredTime = new Time();
    price.getResources().forEach((resource) => {
      const resourceTime = this.getTimeUntileResourceInStock(resource);
      if (resourceTime > requiredTime) requiredTime = resourceTime;
    });
    return requiredTime;
  }

  getTimeUntileResourceInStock(resource) {
    let requiredTime = new Time();
    const resourceId = resource.id;
    const requiredAmount = resource.amount;

    const currentAmount = this.stock.getCurrentAmount(resourceId);
    const neededAmount = requiredAmount - currentAmount;

    if (neededAmount > 0) {
      const resourcesPerSeconds = this.computer.getProductionRate(resourceId);
      if (resourcesPerSeconds === 0) requiredTime = new Time(Infinity);
      else requiredTime = new Time(neededAmount / resourcesPerSeconds);
    }

    return requiredTime;
  }
}

export { ResourcesCollector };
