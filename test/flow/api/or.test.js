'use strict';

let assert = require('assert');
const nools = require('../../../lib');

describe('or rule', () => {
    class Count {
        constructor() {
            this.called = 0;
        }
    }
    const called = new Count();

    describe('or rule with two conditions of the same type', () => {
        const flow = nools.flow('or condition', (builder) => {
            builder.rule('hello rule', [
                ['or',
                    [String, 's', "s == 'hello'"],
                    [String, 's', "s == 'world'"],
                ],
                [Count, 'called', null],
            ], (facts) => {
                facts.called.called += 1;
            });
        });


        it('should should match if one constraints matches', () => {
            return flow.getSession('world', called).match().then(() => {
                assert.equal(called.called, 1);
                called.called = 0;
                return flow.getSession('hello', called).match().then(() => {
                    assert.equal(called.called, 1);
                });
            });
        });

        it('should not call when a a constraint does not match', () => {
            called.called = 0;
            return flow.getSession('hello', 'world', 'test', called).match().then(() => {
                assert.equal(called.called, 2);
            });
        });
    });

    describe('or rule with three conditions', () => {
        const flow = nools.flow('or condition three constraints', (builder) => {
            builder.rule('hello rule', [
                ['or',
                    [String, 's', "s == 'hello'"],
                    [String, 's', "s == 'world'"],
                    [String, 's', "s == 'hello world'"],
                ],
                [Count, 'called', null],
            ], (facts) => {
                facts.called.called += 1;
            });
        });

        it('should should match if one constraints matches', () => {
            called.called = 0;
            return flow.getSession('world', called).match().then(() => {
                assert.equal(called.called, 1);
                called.called = 0;
                return flow.getSession('hello', called).match().then(() => {
                    assert.equal(called.called, 1);
                    called.called = 0;
                    return flow.getSession('hello world', called).match().then(() => {
                        assert.equal(called.called, 1);
                    });
                });
            });
        });

        it('should not call when none constraints match', () => {
            called.called = 0;
            return flow.getSession('hello', 'world', 'hello world', 'test', called).match().then(() => {
                assert.equal(called.called, 3);
            });
        });
    });

    describe('or rule with different types', () => {
        const flow = nools.flow('or condition different types', (builder) => {
            builder.rule('hello rule', [
                ['or',
                    [String, 's', "s == 'hello'"],
                    [String, 's', "s == 'world'"],
                    [Number, 'n', 'n == 1'],
                ],
                [Count, 'called', null],
            ], (facts) => {
                facts.called.called += 1;
            });
        });

        it('should should match if one constraints matches', () => {
            called.called = 0;
            return flow.getSession('world', called).match().then(() => {
                assert.equal(called.called, 1);
                called.called = 0;
                return flow.getSession('hello', called).match().then(() => {
                    assert.equal(called.called, 1);
                    called.called = 0;
                    return flow.getSession(1, called).match().then(() => {
                        assert.equal(called.called, 1);
                    });
                });
            });
        });

        it('should not call when none constraints match', () => {
            called.called = 0;
            return flow.getSession('hello', 'world', 1, 'test', called).match().then(() => {
                assert.equal(called.called, 3);
            });
        });
    });

    describe('or with not conditions', () => {
        const flow = nools.flow('or condition with not conditions', (builder) => {
            builder.rule('hello rule', [
                ['or',
                    ['not', Number, 'n1', 'n1 == 1'],
                    ['not', String, 's1', "s1 == 'hello'"],
                    ['not', Date, 'd1', 'd1.getDate() == now().getDate()'],
                ],
                [Count, 'called', null],
            ], (facts) => {
                facts.called.called += 1;
            });
        });

        it('should activate for each fact that does not exist', () => {
            const count = new Count();
            return flow.getSession(count).match(2, 'world')
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
});
