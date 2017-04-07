'use strict';

const assert = require('assert');
const patterns = require('../../lib/patterns');
const atoms = require('../../lib/atoms');
const Rule = require('../../lib/rule');


describe('Rule', () => {
    describe('#createRule', () => {
        function cb() {
        }

        describe('with strings', () => {
            it('should create for string', () => {
                const rules = Rule.createRules('My Rule', ['String', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, String);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for String', () => {
                const rules = Rule.createRules('My Rule', ['string', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, String);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });


            it('should create for number', () => {
                const rules = Rule.createRules('My Rule', ['number', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Number);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Number', () => {
                const rules = Rule.createRules('My Rule', ['Number', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Number);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for date', () => {
                const rules = Rule.createRules('My Rule', ['date', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Date);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Date', () => {
                const rules = Rule.createRules('My Rule', ['Date', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Date);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });


            it('should create for array', () => {
                const rules = Rule.createRules('My Rule', ['array', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Array);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Array', () => {
                const rules = Rule.createRules('My Rule', ['Array', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Array);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for boolean', () => {
                const rules = Rule.createRules('My Rule', ['boolean', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Boolean);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Boolean', () => {
                const rules = Rule.createRules('My Rule', ['Boolean', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Boolean);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for regexp', () => {
                const rules = Rule.createRules('My Rule', ['regexp', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, RegExp);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Regexp', () => {
                const rules = Rule.createRules('My Rule', ['RegExp', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, RegExp);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for object', () => {
                const rules = Rule.createRules('My Rule', ['object', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Object);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Object', () => {
                const rules = Rule.createRules('My Rule', ['Object', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Object);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for hash', () => {
                const rules = Rule.createRules('My Rule', ['hash', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Object);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Hash', () => {
                const rules = Rule.createRules('My Rule', ['Hash', 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Object);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });
        });

        describe('with functions', () => {
            class MyObject {
                constructor() {
                    this.name = 'hi';
                }
            }

            it('should create for String function', () => {
                const rules = Rule.createRules('My Rule', [String, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, String);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Number function', () => {
                const rules = Rule.createRules('My Rule', [Number, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Number);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Date function', () => {
                const rules = Rule.createRules('My Rule', [Date, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Date);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for []', () => {
                const rules = Rule.createRules('My Rule', [
                    [],
                    's',
                ], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Array);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for Array function', () => {
                const rules = Rule.createRules('My Rule', [Array, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Array);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });


            it('should create for Boolean function', () => {
                const rules = Rule.createRules('My Rule', [Boolean, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Boolean);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for RegExp function', () => {
                const rules = Rule.createRules('My Rule', [RegExp, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, RegExp);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });


            it('should create for Object function', () => {
                const rules = Rule.createRules('My Rule', [Object, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, Object);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });

            it('should create for custom functions', () => {
                const rules = Rule.createRules('My Rule', [MyObject, 's'], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, MyObject);
                assert(pattern.constraints[1] instanceof atoms.TrueAtom);
                assert.strictEqual(rule.cb, cb);
            });
        });

        describe('custom function as constraints', () => {
            function customContraint() {
                return true;
            }

            it('should create for String function with custom constraint', () => {
                const rules = Rule.createRules('My Rule', [String, 's', customContraint], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, String);
                assert(pattern.constraints[1] instanceof atoms.CustomAtom);
                assert.strictEqual(rule.cb, cb);
            });
        });

        describe('custom type via scope', () => {
            class MyType {
                constructor(name) {
                    this.name = name;
                }
            }

            it('should create for String function with custom constraint', () => {
                const rules = Rule.createRules('My Rule', {scope: {MyType}}, ['MyType', 's', "s.name === 'X'"], cb);
                assert(rules);
                assert(rules.length === 1);
                const rule = rules[0];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert.equal(pattern.alias, 's');
                assert(pattern.constraints.length === 2);
                assert(pattern.constraints[0] instanceof atoms.ObjectAtom);
                assert.equal(pattern.constraints[0].constraint, MyType);
                assert.strictEqual(rule.cb, cb);
            });
        });

        it('should create a composite rule', () => {
            const rules = Rule.createRules('My Rule', [
                ['string', 's'],
                ['string', 's2', 's2 == s'],
            ], cb);
            assert(rules);
            assert(rules.length === 1);
            const rule = rules[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.ObjectPattern);
            assert.equal(pattern.leftPattern.alias, 's');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 2);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 2);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should create a not pattern', () => {
            const rules = Rule.createRules('My Rule', [
                ['string', 's'],
                ['not', 'string', 's2', 's2 == s'],
            ], cb);
            assert(rules);
            assert(rules.length === 1);
            const rule = rules[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.NotPattern);
            assert.equal(pattern.leftPattern.alias, 's');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 2);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 2);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should create a or pattern', () => {
            const ruleArr = Rule.createRules('My Rule', [
                ['string', 's'],
                ['or',
                    ['string', 's2', 's2 == s'],
                    ['string', 's2', "s2 == 'world'"],
                ],
            ], cb);
            assert(ruleArr);
            assert(ruleArr.length === 2);
            for (let i = 0; i < 2; i++) {
                const rule = ruleArr[i];
                assert.equal(rule.name, 'My Rule');
                assert(rule.pattern);
                const pattern = rule.pattern;
                assert(pattern instanceof patterns.CompositePattern);
                assert(pattern.leftPattern instanceof patterns.ObjectPattern);
                assert(pattern.rightPattern instanceof patterns.ObjectPattern);
                assert.equal(pattern.leftPattern.alias, 's');
                assert.equal(pattern.rightPattern.alias, 's2');
                const leftConstraints = pattern.leftPattern.constraints;
                assert(leftConstraints.length === 2);
                assert(leftConstraints[0] instanceof atoms.ObjectAtom);
                assert(leftConstraints[1] instanceof atoms.TrueAtom);
                const rightConstraints = pattern.rightPattern.constraints;
                assert(rightConstraints.length === 2);
                assert(rightConstraints[0] instanceof atoms.ObjectAtom);
                assert(rightConstraints[1] instanceof atoms[i === 0 ? 'ReferenceAtom' : 'EqualityAtom']);
                assert.strictEqual(rule.cb, cb);
            }
        });

        it('should include reference store in constraints', () => {
            const ruleArr = Rule.createRules('My Rule', [
                ['Hash', 'h', {name: 'name'}],
                ['string', 's2', 's2 == name', {length: 'length'}],
            ], cb);
            assert(ruleArr);
            assert(ruleArr.length === 1);

            const rule = ruleArr[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.ObjectPattern);
            assert.equal(pattern.leftPattern.alias, 'h');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 3);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            assert(leftConstraints[2] instanceof atoms.HashAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 3);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert(rightConstraints[2] instanceof atoms.HashAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should should include from constraints', () => {
            const ruleArr = Rule.createRules('My Rule', [
                ['Hash', 'h', {name: 'name'}],
                ['string', 's2', 's2 == name', {length: 'length'}, 'from name'],
            ], cb);
            assert(ruleArr);
            assert(ruleArr.length === 1);

            const rule = ruleArr[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.FromPattern);
            assert.equal(pattern.leftPattern.alias, 'h');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 3);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            assert(leftConstraints[2] instanceof atoms.HashAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 3);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert(rightConstraints[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });

        it('should should include from constraints', () => {
            const ruleArr = Rule.createRules('My Rule', [
                ['Hash', 'h', {name: 'name'}],
                ['string', 's2', 's2 == name', {length: 'length'}, 'from [1,2,3,4]'],
            ], cb);
            assert(ruleArr);
            assert(ruleArr.length === 1);

            const rule = ruleArr[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.FromPattern);
            assert.equal(pattern.leftPattern.alias, 'h');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 3);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            assert(leftConstraints[2] instanceof atoms.HashAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 3);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert(rightConstraints[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });

        it('should should include exists constraints', () => {
            const ruleArr = Rule.createRules('My Rule', [
                ['exists', 'Hash', 'h', {name: 'name'}],
                ['exists', 'string', 's2', 's2 == name', {length: 'length'}, 'from [1,2,3,4]'],
            ], cb);
            assert(ruleArr);
            assert(ruleArr.length === 1);

            const rule = ruleArr[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ExistsPattern);
            assert(pattern.rightPattern instanceof patterns.FromExistsPattern);
            assert.equal(pattern.leftPattern.alias, 'h');
            assert.equal(pattern.rightPattern.alias, 's2');
            const leftConstraints = pattern.leftPattern.constraints;
            assert(leftConstraints.length === 3);
            assert(leftConstraints[0] instanceof atoms.ObjectAtom);
            assert(leftConstraints[1] instanceof atoms.TrueAtom);
            assert(leftConstraints[2] instanceof atoms.HashAtom);
            const rightConstraints = pattern.rightPattern.constraints;
            assert(rightConstraints.length === 3);
            assert(rightConstraints[0] instanceof atoms.ObjectAtom);
            assert(rightConstraints[1] instanceof atoms.ReferenceAtom);
            assert(rightConstraints[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });
    });

    describe('#fire', () => {
        it('should pass in the factHash', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), (factHash) => {
                assert.deepEqual(factHash, {hello: 'world'});
                return 'called';
            });
            return rule.fire({}, {factHash: {hello: 'world'}}).then(res => assert.equal(res, 'called'));
        });

        it('should pass in the flow', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), (factHash, flow) => {
                assert.deepEqual(flow, {flow: true});
                assert.deepEqual(factHash, {hello: 'world'});
                return 'called';
            });
            return rule.fire({flow: true}, {factHash: {hello: 'world'}}).then(res => assert.equal(res, 'called'));
        });

        it('should pass in a callback function if the cb accepts 3 arguments', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), (factHash, flow, cb) => {
                cb(null, 'called');
            });
            return rule.fire({}, {factHash: {hello: 'world'}}).then(res => assert.equal(res, 'called'));
        });

        it('should pass handle a returned Promise', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), () => {
                return Promise.resolve('promiseCalled');
            });
            return rule.fire({}, {factHash: {hello: 'world'}}).then(res => assert.equal(res, 'promiseCalled'));
        });

        it('should return a rejected promise if an error is thrown', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), () => {
                throw new Error('Oops');
            });
            return rule.fire({}, {factHash: {hello: 'world'}}).then(() => assert.fail(), err => assert.equal(err.message, 'Oops'));
        });

        it('should return a rejected promise if a reject Promise is returned', () => {
            const rule = new Rule('test', {}, new patterns.InitialFactPattern(), () => {
                return Promise.reject(new Error('Oops'));
            });
            return rule.fire({}, {factHash: {hello: 'world'}}).then(() => assert.fail(), err => assert.equal(err.message, 'Oops'));
        });
    });
});

