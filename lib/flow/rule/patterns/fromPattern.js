'use strict';

const ObjectPattern = require('./objectPattern');
const atoms = require('./atoms');

class FromPattern extends ObjectPattern {
    constructor(type, alias, conditions, store, from, options) {
        super(type, alias, conditions, store, options);
        this.from = new atoms.FromAtom(from, options);
    }

    getSpecificity() {
        return super.getSpecificity() + 1;
    }

    hashCode() {
        return `${super.hashCode()}:${this.from.from}`;
    }

    toString() {
        return `${JSON.stringify(this.constraints)} from ${this.from.from}`;
    }

    /**
     * Creates a new FromPattern from RuleCondition
     * @param {RuleCondition} ruleCondition
     */
    static fromRuleCondition(ruleCondition) {
        return new this(
            ruleCondition.type,
            ruleCondition.alias,
            ruleCondition.parsedConstraint,
            ruleCondition.store,
            ruleCondition.parsedFromConstraint,
            {scope: ruleCondition.scope, pattern: ruleCondition.constraint});
    }
}

module.exports = FromPattern;
