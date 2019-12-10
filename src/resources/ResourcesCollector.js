import { Time } from '../physics/time';
import { ResourcesGenerator } from './ResourcesGenerator';
import { resourcesIdList } from './Resource';
import { Price, ResourceAmount } from './Price';

class ResourcesCollector {
  constructor(upgradesManager, resourcesStock) {
    this.updatesManager = upgradesManager;
    this.stock = resourcesStock;
    this.computer = new ResourcesGenerator(upgradesManager);
  }

  getGeneratedResources(time) {
    const generatedResources = new Price();
    resourcesIdList.forEach((resId) => {
      const resourceRate = this.computer.getProductionRate(resId);
      const resAmount = resourceRate * time.absolute_value;
      if (resAmount > 0) {
        generatedResources.addResource(new ResourceAmount(resId, resAmount));
      }
    });
    return generatedResources;
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
