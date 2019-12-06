import { resourceId } from '../resources/Resource';
import {Price, ResourceAmount} from "../resources/Price";

const upgradeTypes = {
  incremental: 'upgrade_type_incremental',
  science: 'upgrade_type_science',
  upgrade: 'upgrade_type_upgrade',
  structure: 'ugprade_type_structure',
};

const upgradesId = {
  st_terminal: 'Terminal',
  sc_quantum_magnetism: 'Quantum Magnetism',
  st_quantum_generator: 'Quantum Generator',
  sc_kinetic_power: 'Kinetic Power',
  i_quantum_coil: 'Quantic coil',
};

class Upgrade {
  constructor(id, type, desc, initialPrice, increaseFactor, dependencies) {
    this.id = id;
    this.type = type;
    this.desc = desc;
    this.initialPrice = initialPrice;
    this.increaseFactor = increaseFactor;
    this.dependencies = dependencies;
    this.amount_bought = 0;
  }

  getPrice() {
    return this.initialPrice;
  }

  increaseLevel(amount) {
    this.amount_bought += amount;
  }

  canBeBought() {
    return this.type === upgradeTypes.incremental || this.amount_bought === 0;
  }
}


function getCompleteUpgradesList() {
  return [
    new Upgrade(upgradesId.st_terminal,
      upgradeTypes.structure,
      'Monitor actions',
      new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]),
      null,
      []),
    new Upgrade(upgradesId.sc_quantum_magnetism,
      upgradeTypes.structure,
      'Monitor actions',
      null,
      null,
      [upgradesId.st_terminal]),
    new Upgrade(upgradesId.st_quantum_generator,
      upgradeTypes.structure,
      'Energy generator',
      null,
      null,
      [upgradesId.sc_quantum_magnetism]),
    new Upgrade(upgradesId.i_quantum_coil,
      upgradeTypes.incremental,
      'Add energy',
      null,
      1.2,
      [upgradesId.st_quantum_generator]),
  ];
}

export { getCompleteUpgradesList, upgradesId };
