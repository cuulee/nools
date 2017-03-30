'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 85', () => {
    it('should allow multiple not clauses in an or condition', () => {
        const flowSrc = ` rule MultiNotOrRule {
               when {
                   or (
                       not(n1: Number n1 == 1),
                       not(s1: String s1 == 'hello'),
                       not(d1: Date d1.getDate() == now().getDate())
                   )
               }
               then{
                   emit('called', n1, s1, d1)
               }
            }`;
        const flow = nools.compile(flowSrc, {name: 'issue85'});
        let called = 0;
        return flow.getSession()
            .on('called', () => {
                called += 1;
            }).match()
            .then(() => {
                assert.equal(called, 3);
                called = 0;
                return flow.getSession(1).on('called', () => {
                    called += 1;
                }).match();
            })
            .then(() => {
                assert.equal(called, 2);
                called = 0;
                return flow.getSession('hello').on('called', () => {
                    called += 1;
                }).match();
            })
            .then(() => {
                assert.equal(called, 2);
                called = 0;
                return flow.getSession(new Date()).on('called', () => {
                    called += 1;
                }).match();
            })
            .then(() => {
                assert.equal(called, 2);
                called = 0;
                return flow.getSession(1, 'hello', new Date()).on('called', () => {
                    called += 1;
                }).match();
            })
            .then(() => {
                assert.equal(called, 0);
                return flow.getSession(1, 'hello', new Date()).on('called', () => {
                    called += 1;
                }).match();
            });
    });
});
