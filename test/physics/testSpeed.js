import { expect } from 'chai';

import {Speed} from '../../src/physics/speed'
import {describe} from "mocha";

describe('Speed objects init', () => {
    it('create Speed()', () => {
        let speed = new Speed();
        expect(speed.getValue()).to.eql(1);
        expect(speed.toString()).to.eql("unit name");
    });

});