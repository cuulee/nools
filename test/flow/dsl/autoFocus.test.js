'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - auto-focus', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/auto-focus.nools'));
    const State = flow.getDefined('state');

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
