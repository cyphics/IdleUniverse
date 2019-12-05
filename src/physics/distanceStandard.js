
class DistanceUnit {
  constructor(value, name) {
    this.value = value;
    this.name = name;
  }
}

const distanceStandard = {
  // Measurement Units
  yoctometer: new DistanceUnit(1, 'yoctometer'),
  zeptometer: new DistanceUnit(1000, 'zeptometer'),
  attometer: new DistanceUnit(1e+6, 'attometer'),
  femtometer: new DistanceUnit(1e+9, 'femtometer'),
  picometer: new DistanceUnit(1e+12, 'picometer'),
  nanometer: new DistanceUnit(1e+15, 'nanometer'),
  micrometer: new DistanceUnit(1e+18, 'micrometer'),
  millimeter: new DistanceUnit(1e+21, 'millimeter'),
  meter: new DistanceUnit(1e+24, 'meter'),
  kilometer: new DistanceUnit(1e+27, 'kilometer'),
  astro_unit: new DistanceUnit(1.495978707e+35, 'astronomical unit'),
  lightyear: new DistanceUnit(9.4607304725808e+39, 'lightyear'),

  // Relevant distances
  radius_proton: new DistanceUnit(833000000, 'Proton radius'),
  radius_gold_nucleus: new DistanceUnit(8450000000, 'Gold nucleus radius'),
  radius_hydrogen: new DistanceUnit(25000000000000, 'Hydrogen radius'),
  radius_carbon: new DistanceUnit(60000000000000, 'Carbon radius'),
  angstrom: new DistanceUnit(100000000000000, 'angstrom'),
  red_lightwave: new DistanceUnit(700000000000000000, 'Red lightwave'),
  diameter_adn_helix: new DistanceUnit(2000000000000000, 'Diameter of the ADN helix'),
  diameter_hair: new DistanceUnit(75000000000000000000, 'Diameter of a hair'),
  milky_way_diameter: new DistanceUnit(9.999992109517905e+44, 'Diameter of the Milky Way'),
  space_between_galaxies: new DistanceUnit(1, 'Space between galaxies'),
  diameter_universe: new DistanceUnit(8.798479339500144e+50, 'Diameter of the Universe'),
};

export { distanceStandard };
