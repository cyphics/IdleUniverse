import { resourceId } from '../resources/Resource';
import { Price, ResourceAmount } from '../resources/Price';

const upgradeTypes = {
  incremental: 'upgrade_type_incremental',
  science: 'upgrade_type_science',
  upgrade: 'upgrade_type_upgrade',
  structure: 'ugprade_type_structure',
  software: 'ugprade_type_programming',
};

const upgradesId = {
  st_terminal: 'Terminal',
  st_lvl_1_generator: 'Quantum Generator',
  st_kinetic_pusher: 'Kinetic pusher',
  st_quantum_throttle: 'Quantum Throttle',
  prog_gps: 'GPS firmware',
  sc_quantum_magnetism: 'Quantum Magnetism',
  sc_quantic_expulsion: 'Quantic Expulsion',
  sc_kinetic_power: 'Kinetic Power',
  i_lvl_1_coil: 'Quantic coil',
  i_energy_cell_a: 'Quantum joule cell',
  u_quantun_conductur: 'Quantum conductor',
  u_quantum_synergy: 'Quantum synergy',
  u_dynamo: 'Dynamo',
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

  getPrice(amountLevels = 1) {
    return this.initialPrice.multiply(
      this.increaseFactor ** (this.amount_bought - 1 + amountLevels),
    );
  }

  increaseLevel(amount) {
    this.amount_bought += amount;
  }

  canBeBought() {
    return this.type === upgradeTypes.incremental || this.amount_bought === 0;
  }
}


function getStructuralUpgrades() {
  return [
    new Upgrade(upgradesId.st_terminal,
      upgradeTypes.structure,
      'Monitor actions',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      null,
      []),
    new Upgrade(upgradesId.st_lvl_1_generator,
      upgradeTypes.structure,
      'Emergency generator',
      new Price([
        new ResourceAmount(resourceId.steel, 10),
        new ResourceAmount(resourceId.iron, 10),
        new ResourceAmount(resourceId.copper, 10)]),
      null,
      [upgradesId.st_terminal]),
    new Upgrade(upgradesId.st_kinetic_pusher,
      upgradeTypes.structure,
      'Kinetic pusher',
      new Price([new ResourceAmount(resourceId.steel, 150)]),
      null,
      [upgradesId.sc_kinetic_power]),
    new Upgrade(upgradesId.st_quantum_throttle,
      upgradeTypes.structure,
      'Add quantum engine',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      null,
      [upgradesId.sc_quantic_expulsion]),
  ];
}

function getScienceUpgrades() {
  return [
    // new Upgrade(upgradesId.sc_quantum_magnetism,
    //   upgradeTypes.structure,
    //   'Energy generator',
    //   new Price([new ResourceAmount(resourceId.joule, 10)]),
    //   null,
    //   [upgradesId.st_terminal]),
    new Upgrade(upgradesId.sc_kinetic_power,
      upgradeTypes.structure,
      'Push to move!',
      new Price([new ResourceAmount(resourceId.knowledge, 50)]),
      null,
      [upgradesId.prog_gps]),
    new Upgrade(upgradesId.sc_quantic_expulsion,
      upgradeTypes.structure,
      '',
      new Price([new ResourceAmount(resourceId.knowledge, 1000)]),
      null,
      [upgradesId.sc_kinetic_power]),
  ];
}

function getSoftwareUpgrades() {
  return [
    new Upgrade(upgradesId.prog_gps,
      upgradeTypes.software,
      'Where are we?',
      new Price([
        new ResourceAmount(resourceId.lines_of_code, 20)]),
      null,
      [upgradesId.st_lvl_1_generator]),
  ];
}
function getIncrementalUpgrades() {
  return [
    new Upgrade(upgradesId.i_lvl_1_coil,
      upgradeTypes.incremental,
      'Add joule',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      1.2,
      [upgradesId.st_lvl_1_generator]),

    new Upgrade(upgradesId.i_energy_cell_a,
      upgradeTypes.incremental,
      'Add throttle',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      1.2,
      [upgradesId.st_quantum_throttle]),
  ];
}

function getOneShotUpgrades() {
  return [
    new Upgrade(upgradesId.u_quantun_conductur,
      upgradeTypes.upgrade,
      'Improve coil effect',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      null,
      [upgradesId.sc_quantic_expulsion]),
    new Upgrade(upgradesId.u_quantum_synergy,
      upgradeTypes.upgrade,
      'Cells also generate joule',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      null,
      [upgradesId.u_quantun_conductur]),
    new Upgrade(
      upgradesId.u_dynamo,
      upgradeTypes.upgrade,
      'Speed generates joule',
      new Price([new ResourceAmount(resourceId.joule, 10)]),
      null,
      [upgradesId.u_dynamo],
    ),
  ];
}


function getCompleteUpgradesList() {
  return getStructuralUpgrades()
    .concat(getScienceUpgrades())
    .concat(getSoftwareUpgrades())
    .concat(getIncrementalUpgrades())
    .concat(getOneShotUpgrades());
}

export { getCompleteUpgradesList, upgradesId };
