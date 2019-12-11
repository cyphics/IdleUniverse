import { Resource, resourceId, resourcesIdList } from './Resource';

class ResourcesStock {
  constructor() {
    this.resources_list = [];
    resourcesIdList.forEach((resId) => this.resources_list.push(new Resource(resId)));
    this.resources_list.push(new Resource(resourceId.ship_speed));
    this.resources_list.push(new Resource(resourceId.traveled_distance));
  }

  addResource(resourceId, amount) {
    this.resources_list.forEach((resource) => {
      if (resource.id === resourceId) resource.add(amount);
    });
  }

  takeResource(resourceId, amount) {
    this.resources_list.forEach((resource) => {
      if (resource.id === resourceId) resource.remove(amount);
    });
  }

  takePrice(price) {
    const neededResources = price.getResources();
    neededResources.forEach((resAmount) => {
      this.takeResource(resAmount.id, resAmount.amount);
    });
  }

  getCurrentAmount(resourceId) {
    let amount = 0;
    this.resources_list.forEach((resource) => {
      if (resource.id === resourceId) amount = resource.currentAmount;
    });
    return amount;
  }

  canPriceBePayed(price) {
    let isAvailable = true;
    const neededResources = price.getResources();
    neededResources.forEach((resAmount) => {
      if (this.getCurrentAmount(resAmount.id) < resAmount.amount) isAvailable = false;
    });
    return isAvailable;
  }
}

export { ResourcesStock };
