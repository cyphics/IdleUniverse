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
  joule: 'Kinetic joule',
  steel: 'Steel',
  iron: 'Iron',
  copper: 'Copper',
  dark_matter: 'Dark matter',
  lines_of_code: 'Lines of code',
  knowledge: 'Scientific knowledge',
};

const resourcesIdList = [
  resourceId.joule,
  resourceId.dark_matter,
];

export { resourceId, resourcesIdList, Resource };
