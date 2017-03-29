'use strict';

const assert = require('assert');
const nools = require('../../');

describe('not rule', () => {
    describe('with a single fact', () => {
        let called = 0;

        const flow = nools.flow('notRuleSingleFact', (builder) => {
            builder.rule('hello rule', ['not', String, 's', "s == 'hello'"], (facts) => {
                assert(facts.s === undefined);
                called += 1;
            });
        });

        it("should call when a string that does not equal 'hello'", () => {
            return flow.getSession('world').match().then(() => {
                assert.equal(called, 1);
            });
        });

        it("should not call when a string that does equal 'hello'", () => {
            called = 0;
            return flow.getSession('hello').match().then(() => {
                assert.equal(called, 0);
            });
        });

        it("should not call when a string that does equal 'hello' and one that does not", () => {
            called = 0;
            return flow.getSession('hello', 'world').match().then(() => {
                assert.equal(called, 0);
            });
        });
    });

    describe('with multiple facts', () => {
        let called = 0;
        const arr = [];
        const flow1 = nools.flow('notRuleMultiFact', (builder) => {
            builder.rule('order rule', [
                [Number, 'n1'],
                ['not', Number, 'n2', 'n1 != n2 && n1 > n2'],
            ], (facts, engine) => {
                arr.push(facts.n1);
                engine.retract(facts.n1);
                called += 1;
            });
        });

        const flow2 = nools.flow('notRuleMultiFact2', (builder) => {
            builder.rule('order rule reverse', [
                [Number, 'n1'],
                ['not', Number, 'n2', 'n1 < n2'],
            ], (facts, engine) => {
                arr.push(facts.n1);
                engine.retract(facts.n1);
                called += 1;
            });
        });

        it('should fire rules in order', () => {
            return flow1.getSession(3, 1, 5, 2, 4).match().then(() => {
                assert.deepEqual(arr, [1, 2, 3, 4, 5]);
                assert.equal(called, 5);
            }).then(() => {
                arr.length = 0;
                called = 0;
                return flow2.getSession(4, 2, 5, 1, 3).match().then(() => {
                    assert.deepEqual(arr, [5, 4, 3, 2, 1]);
                    assert.equal(called, 5);
                });
            });
        });
    });

    describe('modifying facts', () => {
        class Num {
            constructor(value) {
                this.value = value;
            }
        }

        const flow1 = nools.flow('notRuleModifyFact', (flow) => {
            flow.rule('not rule', [
                [Num, 'n1'],
                ['not', Num, 'n2', 'n1 != n2 && n1.value > n2.value'],
            ], () => {
            });
        });

        it('should handle modifications', () => {
            const num1 = new Num(1);
            const num2 = new Num(2);
            const num3 = new Num(3);
            const num4 = new Num(4);
            const num5 = new Num(5);
            const session = flow1.getSession();
            const activationTree = session.agenda.rules['not rule'].tree;

            session.assert(num1);
            session.assert(num2);
            session.assert(num3);
            session.assert(num4);
            session.assert(num5);
            let activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num1);
            session.modify(num1, (n) => {
                n.value = 6;
            });
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num2);
            session.modify(num2, (n) => {
                n.value = 7;
            });
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num3);
            session.modify(num3, (n) => {
                n.value = 8;
            });
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num4);
            session.modify(num4, (n) => {
                n.value = 9;
            });
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num5);
            session.modify(num5, (n) => {
                n.value = 10;
            });
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num1);

            session.retract(num1);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num2);

            session.retract(num2);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num3);

            session.retract(num3);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num4);

            session.retract(num4);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num5);

            session.retract(num5);
            activations = activationTree.toArray();
            assert(activations.length === 0);

            session.assert(num5);
            session.assert(num4);
            session.assert(num3);
            session.assert(num2);
            session.assert(num1);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num1);
            session.retract(num1);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num2);
            session.assert(num1);
            activations = activationTree.toArray();
            assert(activations.length === 1);
            assert.equal(activations[0].match.factHash.n1, num1);
        });
    });
});
