'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - or rule with not conditions', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/orRule-notConditions.nools'));
    const Count = flow.getDefined('count');
    const count = new Count();

    it('should activate for each fact that does not exist', () => {
        return flow.getSession(count).match()
            .then(() => {
                assert.equal(count.called, 3);
                count.called = 0;
                return flow.getSession(count, 1).match();
            })
            .then(() => {
                assert.equal(count.called, 2);
                count.called = 0;
                return flow.getSession(count, 'hello').match();
            })
            .then(() => {
                assert.equal(count.called, 2);
                count.called = 0;
                return flow.getSession(count, new Date()).match();
            })
            .then(() => {
                assert.equal(count.called, 2);
                count.called = 0;
                return flow.getSession(count, 1, 'hello', new Date()).match();
            })
            .then(() => {
                assert.equal(count.called, 0);
            });
    });
});
