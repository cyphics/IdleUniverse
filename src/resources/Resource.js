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
  joule: 'Joule',
  steel: 'Steel',
  iron: 'Iron',
  copper: 'Copper',
  dark_matter: 'Dark matter',
  lines_of_code: 'Lines of code',
  knowledge: 'Scientific knowledge',
  traveled_distance: 'distance',
  ship_speed: 'speed',
};

const resourcesIdList = [
  resourceId.joule,
  resourceId.steel,
  resourceId.iron,
  resourceId.copper,
  resourceId.lines_of_code,
  resourceId.knowledge,
  resourceId.dark_matter,
];

export { resourceId, resourcesIdList, Resource };
