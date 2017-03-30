'use strict';

const assert = require('assert');
const flow = require('../../rules/diagnosis-compiled')();

const Patient = flow.getDefined('patient');

describe('compiled - diagnosis smoketest', () => {
    it('should treat properly', () => {
        const session = flow.getSession();
        const results = [];
        session.assert(new Patient({name: 'Fred', fever: 'none', spots: true, rash: false, soreThroat: false, innoculated: false}));
        session.assert(new Patient({name: 'Joe', fever: 'high', spots: false, rash: false, soreThroat: true, innoculated: false}));
        session.assert(new Patient({name: 'Bob', fever: 'high', spots: true, rash: false, soreThroat: false, innoculated: true}));
        session.assert(new Patient({name: 'Tom', fever: 'none', spots: false, rash: true, soreThroat: false, innoculated: false}));
        session.assert(results);
        // flow.print();
        return session.match().then(() => {
            // session.dispose();
            assert.deepEqual(results, [
                {name: 'Tom', treatment: 'allergyShot'},
                {name: 'Bob', treatment: 'penicillin'},
                {name: 'Joe', treatment: 'bedRest'},
                {name: 'Fred', treatment: 'allergyShot'},
            ]);
        });
    });
});
