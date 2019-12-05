import { expect } from 'chai';

import { describe } from 'mocha';
import { Speed } from '../../src/physics/speed';

describe('Speed objects init', () => {
  it('create Speed()', () => {
    const speed = new Speed();
    expect(speed.getValue()).to.eql(0);
    expect(speed.toString()).to.eql('');
  });
});
