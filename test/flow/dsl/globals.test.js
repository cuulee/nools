'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - globals', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/global.nools'));

    it('should call the scoped function', (next) => {
        const session = flow.getSession();
        session.on('globals', (globals) => {
            try {
                assert.equal(globals.assert, assert);
                assert.equal(globals.PI, Math.PI);
                assert.equal(globals.SOME_STRING, 'some string');
                assert.equal(globals.TRUE, true);
                assert.equal(globals.NUM, 1.23);
                assert(globals.DATE instanceof Date);
                assert.deepEqual(globals.globalNools, {hello: 'world'});
                next();
            } catch (e) {
                next(e);
            }
        });
        session.assert('some string');
        session.match();
    }).timeout(1000);
});
