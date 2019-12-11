import { upgradesId } from '../upgrades/Upgrade';
import { gameValues } from '../game/gameValues';
import { resourceId } from './Resource';

class RateComputer {
  constructor(upgradesManager) {
    this.manager = upgradesManager;
  }

  getProductionRate(resId) {
    const coilLevel = this.manager.getAmountBought(upgradesId.i_lvl_1_coil);
    const levelACells = this.manager.getAmountBought(upgradesId.i_energy_cell_a);

    let productionRate = 0;
    switch (resId) {
      case resourceId.joule:
        productionRate = coilLevel * gameValues.coil_kinetic_gain;
        if (this.manager.isBought(upgradesId.u_quantun_conductur)) {
          productionRate *= gameValues.quantum_conductor_gain;
        }
        if (this.manager.isBought(upgradesId.u_quantum_synergy)) {
          productionRate += levelACells * gameValues.level_a_cells_synergy_gain;
        }
        if (this.manager.isBought(upgradesId.u_dynamo)) {
          productionRate += gameValues.dynamo_effect_on_energy; // FIXME add speed()
        }
        break;
      case resourceId.dark_matter:
        break;
      default:
        break;
    }
    return productionRate;
  }

  getCurrentAcceleration() {
    const levelACells = this.manager.getAmountBought(upgradesId.i_energy_cell_a);
    const coilLevel = this.manager.getAmountBought(upgradesId.i_lvl_1_coil);

    let acceleration = levelACells * gameValues.level_a_cells_acceleration_gain;
    if (this.manager.isBought(upgradesId.u_quantum_synergy)) {
      acceleration += coilLevel * gameValues.coil_acceleration_gain;
    }
    return acceleration;
  }
}

export { RateComputer };
