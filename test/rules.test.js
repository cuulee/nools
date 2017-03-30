'use strict';

const assert = require('assert');
const patterns = require('../lib/patterns');
const atoms = require('../lib/atoms');
const rules = require('../lib/rule');

function cb() {
}

describe('Rule', () => {
    describe('#createRule', () => {
        describe('with strings', () => {
            it('should create for string', () => {
                let rule = rules.createRule('My Rule', ['String', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['string', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['number', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Number', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['date', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Date', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['array', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Array', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['boolean', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Boolean', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['regexp', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['RegExp', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['object', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Object', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['hash', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', ['Hash', 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [String, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [Number, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [Date, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [
                    [],
                    's',
                ], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [Array, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [Boolean, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [RegExp, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [Object, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [MyObject, 's'], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', [String, 's', customContraint], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
                let rule = rules.createRule('My Rule', {scope: {MyType}}, ['MyType', 's', "s.name === 'X'"], cb);
                assert(rule);
                assert(rule.length === 1);
                rule = rule[0];
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
            let rule = rules.createRule('My Rule', [
                ['string', 's'],
                ['string', 's2', 's2 == s'],
            ], cb);
            assert(rule);
            assert(rule.length === 1);
            rule = rule[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.ObjectPattern);
            assert.equal(pattern.leftPattern.alias, 's');
            assert.equal(pattern.rightPattern.alias, 's2');
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 2);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 2);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should create a not pattern', () => {
            let rule = rules.createRule('My Rule', [
                ['string', 's'],
                ['not', 'string', 's2', 's2 == s'],
            ], cb);
            assert(rule);
            assert(rule.length === 1);
            rule = rule[0];
            assert.equal(rule.name, 'My Rule');
            assert(rule.pattern);
            const pattern = rule.pattern;
            assert(pattern instanceof patterns.CompositePattern);
            assert(pattern.leftPattern instanceof patterns.ObjectPattern);
            assert(pattern.rightPattern instanceof patterns.NotPattern);
            assert.equal(pattern.leftPattern.alias, 's');
            assert.equal(pattern.rightPattern.alias, 's2');
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 2);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 2);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should create a or pattern', () => {
            const ruleArr = rules.createRule('My Rule', [
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
                let constrnts = pattern.leftPattern.constraints;
                assert(constrnts.length === 2);
                assert(constrnts[0] instanceof atoms.ObjectAtom);
                assert(constrnts[1] instanceof atoms.TrueAtom);
                constrnts = pattern.rightPattern.constraints;
                assert(constrnts.length === 2);
                assert(constrnts[0] instanceof atoms.ObjectAtom);
                assert(constrnts[1] instanceof atoms[i === 0 ? 'ReferenceAtom' : 'EqualityAtom']);
                assert.strictEqual(rule.cb, cb);
            }
        });

        it('should include reference store in constraints', () => {
            const ruleArr = rules.createRule('My Rule', [
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
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            assert.strictEqual(rule.cb, cb);
        });

        it('should should include from constraints', () => {
            const ruleArr = rules.createRule('My Rule', [
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
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });

        it('should should include from constraints', () => {
            const ruleArr = rules.createRule('My Rule', [
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
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });

        it('should should include exists constraints', () => {
            const ruleArr = rules.createRule('My Rule', [
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
            let constrnts = pattern.leftPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.TrueAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            constrnts = pattern.rightPattern.constraints;
            assert(constrnts.length === 3);
            assert(constrnts[0] instanceof atoms.ObjectAtom);
            assert(constrnts[1] instanceof atoms.ReferenceAtom);
            assert(constrnts[2] instanceof atoms.HashAtom);
            assert(pattern.rightPattern.from instanceof atoms.FromAtom);
        });
    });
});

