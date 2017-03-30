'use strict';

const assert = require('assert');
const flow = require('../rules/getFacts-compiled')();

describe('compiled - getFacts from action', () => {
    it('should get all facts', () => {
        const session = flow.getSession().focus('get-facts');
        const facts = [
            {},
            1,
            'hello',
            true,
            new Date(),
        ];
        for (let i = 0; i < facts.length; i++) {
            session.assert(facts[i]);
        }
        let called = 0;
        return session
            .on('get-facts', (gottenFacts) => {
                assert.deepEqual(gottenFacts, facts);
                called += 1;
            })
            .match()
            .then(() => {
                assert.equal(called, 1);
            });
    });

    it('should get facts by type', () => {
        const session = flow.getSession().focus('get-facts-by-type');
        const facts = [
            1,
            'hello',
            true,
            new Date(),
        ];
        for (let i = 0; i < facts.length; i++) {
            session.assert(facts[i]);
        }
        let called = 0;
        return session
            .on('get-facts-number', (fact) => {
                assert.deepEqual(fact, [facts[0]]);
                called += 1;
            })
            .on('get-facts-string', (fact) => {
                assert.deepEqual(fact, [facts[1]]);
                called += 1;
            })
            .on('get-facts-boolean', (fact) => {
                assert.deepEqual(fact, [facts[2]]);
                called += 1;
            })
            .on('get-facts-date', (fact) => {
                assert.deepEqual(fact, [facts[3]]);
                called += 1;
            })
            .match()
            .then(() => {
                assert.equal(called, 4);
            });
    });
});
