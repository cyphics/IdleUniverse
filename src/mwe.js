const compId = {
  iron: 1,
  copper: 2,
};

class Mwe {
  getName(resource) {
    switch (resource) {
      case compId.copper:
        return 'Copper';
      case compId.iron:
        return 'Iron';
      default:
        return '';
    }
  }
}

export { Mwe, compId };
