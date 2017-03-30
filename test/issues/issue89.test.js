'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 89', () => {
    class Person {
        constructor(address) {
            this.address = address;
        }
    }

    const flow = nools.flow('issue 89', (builder) => {
        builder.rule('from with missing property', [
            [Person, 'p'],
            [Number, 'zipcode', 'from p.address.zipcode'],
        ], () => {

        });
    });

    it('should not throw an error on missing properties', () => {
        return flow.getSession(new Person({})).match();
    });

    it('should should throw an error if the from references a property on a value that is undefined', () => {
        assert.throws(() => flow.getSession(new Person()).match());
    });
});
