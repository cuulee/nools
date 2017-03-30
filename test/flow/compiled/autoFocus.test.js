'use strict';

const assert = require('assert');
const flow = require('../rules/auto-focus-compiled')();

const State = flow.getDefined('state');

describe('compiled - auto-focus', () => {
    it('should activate agenda groups in proper order', () => {
        const session = flow.getSession();
        session.assert(new State('A', 'NOT_RUN'));
        session.assert(new State('B', 'NOT_RUN'));
        session.assert(new State('C', 'NOT_RUN'));
        session.assert(new State('D', 'NOT_RUN'));
        const fired = [];
        session.on('fire', (name) => {
            fired.push(name);
        });
        return session.match().then(() => {
            assert.deepEqual(fired, ['Bootstrap', 'A to B', 'B to C', 'B to D']);
        });
    });
});
