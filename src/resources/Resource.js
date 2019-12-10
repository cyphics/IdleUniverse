class Resource {
  constructor(id) {
    this.id = id;
    this.currentAmount = 0;
  }

  get name() {
    return this.id;
  }

  add(amount) {
    if (amount < 0) return;
    this.currentAmount += amount;
  }

  remove(amount) {
    if (amount < 0) return;
    this.currentAmount -= amount;
    if (this.currentAmount < 0) this.currentAmount = 0;
  }
}

const resourceId = {
  kinetic_energy: 'Kinetic energy',
  dark_matter: 'Dark matter',
};

const resourcesIdList = [
  resourceId.kinetic_energy,
  resourceId.dark_matter,
];

function buildResourcesList() {
  return [
    new Resource(resourceId.kinetic_energy),
    new Resource(resourceId.dark_matter),
  ];
}

export { buildResourcesList, resourceId, resourcesIdList };
