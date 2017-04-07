'use strict';

const assert = require('assert');
const RuleCondition = require('../../../lib/flow/rule/ruleCondition');
const patterns = require('../../../lib/flow/rule/patterns');

describe('RuleCondition', () => {
    describe('.fromConditionArray', () => {
        it('accept a condition array of length 2', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's'], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 'true');
            assert.deepEqual(ruleCondition1.store, {});
            assert.deepEqual(ruleCondition1.from, {});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 3 with a constraint', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', "s == 'hello'"], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, "s == 'hello'");
            assert.deepEqual(ruleCondition1.store, {});
            assert.deepEqual(ruleCondition1.from, {});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 3 with a store', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', {s: '$s'}], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 'true');
            assert.deepEqual(ruleCondition1.store, {s: '$s'});
            assert.deepEqual(ruleCondition1.from, {});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 3 with a from clause', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', 'from random'], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 'true');
            assert.deepEqual(ruleCondition1.store, {});
            assert.deepEqual(ruleCondition1.from, {from: 'random'});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 4 with a constraint and from clause', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', 's == "hello"', 'from random'], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 's == "hello"');
            assert.deepEqual(ruleCondition1.store, {});
            assert.deepEqual(ruleCondition1.from, {from: 'random'});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 4 with a constraint and store', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', 's == "hello"', {s: '$s1'}], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 's == "hello"');
            assert.deepEqual(ruleCondition1.store, {s: '$s1'});
            assert.deepEqual(ruleCondition1.from, {});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 4 with a store and from clause', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', {s: '$s1'}, 'from random'], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 'true');
            assert.deepEqual(ruleCondition1.store, {s: '$s1'});
            assert.deepEqual(ruleCondition1.from, {from: 'random'});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('accept a condition array of length 5 a constraint store and from', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', 's == "hello"', {s: '$s1'}, 'from random'], {});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 's == "hello"');
            assert.deepEqual(ruleCondition1.store, {s: '$s1'});
            assert.deepEqual(ruleCondition1.from, {from: 'random'});
            assert.deepEqual(ruleCondition1.scope, {});
        });

        it('should set the scope', () => {
            const ruleCondition1 = RuleCondition.fromConditionArray([String, 's', 's == hello'], {hello: 'hello'});
            assert.equal(ruleCondition1.type, String);
            assert.equal(ruleCondition1.alias, 's');
            assert.equal(ruleCondition1.constraint, 's == hello');
            assert.deepEqual(ruleCondition1.store, {});
            assert.deepEqual(ruleCondition1.from, {});
            assert.deepEqual(ruleCondition1.scope, {hello: 'hello'});
        });
    });

    describe('#.isFromCondition', () => {
        it('should return true if the rule condition has a from constraint', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, {from: 'random'}, {});
            assert(ruleCondition.isFromCondition);
        });

        it('should return false if the rule condition does not have a from constraint', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, null, {});
            assert(!ruleCondition.isFromCondition);
        });
    });

    describe('#toPattern', () => {
        const VALID_PATTERN_TYPES = [
            patterns.ObjectPattern,
            patterns.NotPattern,
            patterns.ExistsPattern,
            patterns.FromPattern,
            patterns.FromNotPattern,
            patterns.FromExistsPattern,
        ];

        function assertPatternType(pattern, Patterns) {
            VALID_PATTERN_TYPES.forEach((patt) => {
                if (Patterns.indexOf(patt) !== -1) {
                    return assert(pattern instanceof patt, `expected pattern to be an instanceof ${patt.name}`);
                }
                return assert(!(pattern instanceof patt), `expected pattern to not be an instanceof ${patt.name}`);
            });
        }

        it('should return an ObjectPattern if it is not a from and there is no modifier', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, null, {});
            const pattern = ruleCondition.toPattern();
            assertPatternType(pattern, [patterns.ObjectPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });

        it('should return a NotPattern if it is not a from and the modifier == not', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, null, {});
            const pattern = ruleCondition.toPattern('not');
            assertPatternType(pattern, [patterns.ObjectPattern, patterns.NotPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });

        it('should return an ExistsPattern if it is not a from and the modifier == exists', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, null, {});
            const pattern = ruleCondition.toPattern('exists');
            assertPatternType(pattern, [patterns.ObjectPattern, patterns.ExistsPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });

        it('should return a FromPattern if it is a from and there is no modifier', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, {from: 'random'}, {});
            const pattern = ruleCondition.toPattern();
            assertPatternType(pattern, [patterns.ObjectPattern, patterns.FromPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });

        it('should return a FromNotPattern if it is a from and the modifier === not', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, {from: 'random'}, {});
            const pattern = ruleCondition.toPattern('not');
            assertPatternType(
                pattern,
                [patterns.ObjectPattern, patterns.FromPattern, patterns.FromNotPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });

        it('should return a FromExistsPattern if it is a from and the modifier === not', () => {
            const ruleCondition = new RuleCondition(String, 's', 's == "hello"', null, {from: 'random'}, {});
            const pattern = ruleCondition.toPattern('exists');
            assertPatternType(
                pattern,
                [patterns.ObjectPattern, patterns.FromPattern, patterns.FromExistsPattern]);
            assert.equal(pattern.type, ruleCondition.type);
            assert.equal(pattern.alias, ruleCondition.alias);
            assert.equal(pattern.conditions, ruleCondition.parsedConstraint);
            assert.equal(pattern.pattern, ruleCondition.constraint);
        });
    });
});
