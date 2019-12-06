import { Acceleration } from '../physics/Acceleration';
import { upgradesId } from '../upgrades/Upgrade';

class ShipEngine {
  constructor(upgradesManager) {
    this.upgrades = upgradesManager;
  }

  getCurrentAcceleration() {
    let acceleration = 0;
    const cellAAmount = this.upgrades.getAmountBought(upgradesId.i_energy_cell_a);
    acceleration = cellAAmount;
    return new Acceleration(acceleration);
  }
}

export { ShipEngine };
