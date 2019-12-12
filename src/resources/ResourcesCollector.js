import { Time } from '../physics/time';
import { resourcesIdList } from './Resource';

class ResourcesCollector {
  constructor(computer, resourcesStock) {
    this.stock = resourcesStock;
    this.computer = computer;
  }

  generateResources(time) {
    resourcesIdList.forEach((resId) => {
      const resourceRate = this.computer.getProductionRate(resId);
      const resAmount = resourceRate * time;
      if (resAmount > 0) {
        this.stock.addResource(resId, resAmount);
      }
    });
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
