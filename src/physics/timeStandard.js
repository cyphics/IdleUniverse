class TimeUnit {
  constructor(value, name) {
    this.value = value;
    this.name = name;
  }
}

const timeStandard = {
  // Measurement Units
  millisecond: new TimeUnit(1, 'millisecond'),
  second: new TimeUnit(1000, 'second'),
  minute: new TimeUnit(60000, 'minute'),
  hour: new TimeUnit(3600000, 'hour'),
  day: new TimeUnit(86400000, 'day'),
  year: new TimeUnit(31557600000, 'year'),
  galactic_year: new TimeUnit(7352920800000000000, 'galactic year'),
};

export {timeStandard}