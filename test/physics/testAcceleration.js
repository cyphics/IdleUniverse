import { expect } from 'chai';

import { describe } from 'mocha';
import { Acceleration } from '../../src/physics/Acceleration';

describe('Acceleration values', () => {
  it('empty acceleration', () => {
    const acc = new Acceleration();
    expect(acc.value()).to.eql(0);
  });
});
