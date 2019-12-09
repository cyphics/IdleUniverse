import { upgradesId } from '../upgrades/Upgrade';
import { gameValues } from '../ship/gameValues';

class ResourcesComputer {
  constructor(upgradesManager) {
    this.manager = upgradesManager;
  }

  getProductionRate(resourceId) {
    const coilLevel = this.manager.getAmountBought(upgradesId.i_quantum_coil);
    // const levelACells = this.manager.getAmountBought(upgradesId.i_energy_cell_a);

    let productionRate = 0;
    switch (resourceId.value) {
      case resourceId.kinetic_energy:
        productionRate = coilLevel * gameValues.coil_kinetic_gain;
        // if (this.manager.getAmountBought(upgradesId.))
        break;
      case resourceId.dark_matter:
        break;
      default:
        break;
    }
    return productionRate;
  }
}

export { ResourcesComputer };
