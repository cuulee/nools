'use strict';

const Pattern = require('./pattern');
const atoms = require('./atoms');
const constraintMatcher = require('../../../constraintMatcher');
const extd = require('../../../extended');

const isEmpty = extd.isEmpty;

class ObjectPattern extends Pattern {
    constructor(type, alias, conditions, store, options) {
        super();
        const opts = options || {};
        this.type = type;
        this.alias = alias;
        this.conditions = conditions;
        this.pattern = opts.pattern;
        const constrnts = constraintMatcher.toConstraints(conditions, Object.assign({alias}, opts));
        let constraints = [new atoms.ObjectAtom(type)];
        if (constrnts.length) {
            constraints = constraints.concat(constrnts);
        } else {
            constraints.push(new atoms.TrueAtom());
        }
        if (store && !isEmpty(store)) {
            const atm = new atoms.HashAtom(store);
            constraints.push(atm);
        }
        constraints.forEach((constraint) => {
            constraint.alias = alias;
        });
        this.constraints = constraints;
    }

    getSpecificity() {
        const constraints = this.constraints;
        let specificity = 0;
        for (let i = 0, l = constraints.length; i < l; i++) {
            if (constraints[i] instanceof atoms.EqualityAtom) {
                specificity += 1;
            }
        }
        return specificity;
    }

    hashCode() {
        return `${this.type}:${this.alias}:${JSON.stringify(this.conditions)}`;
    }

    toString() {
        return JSON.stringify(this.constraints);
    }

    static fromRuleCondition(ruleCondition) {
        return new this(
            ruleCondition.type,
            ruleCondition.alias,
            ruleCondition.parsedConstraint,
            ruleCondition.store,
            {scope: ruleCondition.scope, pattern: ruleCondition.constraint});
    }
}

module.exports = ObjectPattern;
