'use strict';

const helper = require('../helper');
const definedFunctions = require('../definedFunctions');
const atoms = require('../../constraint');

function createReferenceConstraint(constraintType, rule, options) {
    if (constraintType === 'eq' || constraintType === 'seq') {
        return new atoms.ReferenceEqualityConstraint(rule, options);
    }
    if (constraintType === 'neq' || constraintType === 'seq') {
        return new atoms.ReferenceInequalityConstraint(rule, options);
    }
    if (constraintType === 'gt') {
        return new atoms.ReferenceGTConstraint(rule, options);
    }
    if (constraintType === 'gte') {
        return new atoms.ReferenceGTEConstraint(rule, options);
    }
    if (constraintType === 'lt') {
        return new atoms.ReferenceLTConstraint(rule, options);
    }
    if (constraintType === 'lte') {
        return new atoms.ReferenceLTEConstraint(rule, options);
    }
    return new atoms.ReferenceConstraint(rule, options);
}

function createConstraint(constraintType, rule, options) {
    if (constraintType === 'eq' || constraintType === 'seq') {
        return new atoms.EqualityConstraint(rule, options);
    }
    if (constraintType === 'neq' || constraintType === 'seq') {
        return new atoms.InequalityConstraint(rule, options);
    }
    if (constraintType === 'gt' || constraintType === 'gte' || constraintType === 'lt' || constraintType === 'lte') {
        return new atoms.ComparisonConstraint(rule, options);
    }
    return new atoms.ComparisonConstraint(rule, options);
}

function createConstraints(rule, options) {
    let ret = [];
    const alias = options.alias;
    const scope = options.scope || {};
    const constraintType = rule[2];
    if (constraintType === 'and') {
        ret = ret.concat(createConstraints(rule[0], options))
            .concat(createConstraints(rule[1], options));
    } else if (
        constraintType === 'composite' ||
        constraintType === 'or' ||
        constraintType === 'lt' ||
        constraintType === 'gt' ||
        constraintType === 'lte' ||
        constraintType === 'gte' ||
        constraintType === 'like' ||
        constraintType === 'notLike' ||
        constraintType === 'eq' ||
        constraintType === 'neq' ||
        constraintType === 'seq' ||
        constraintType === 'sneq' ||
        constraintType === 'in' ||
        constraintType === 'notIn' ||
        constraintType === 'prop' ||
        constraintType === 'propLookup' ||
        constraintType === 'function' ||
        constraintType === 'logicalNot') {
        const isReference = helper.getIdentifiers(rule).some((i) => {
            return i !== alias && !(i in definedFunctions) && !(i in scope);
        });
        if (isReference) {
            ret.push(createReferenceConstraint(constraintType, rule, options));
        } else {
            ret.push(createConstraint(constraintType, rule, options));
        }
    }
    return ret;
}

function toConstraints(constraint, options) {
    if (typeof constraint === 'function') {
        return [new atoms.CustomConstraint(constraint, options)];
    }
    // constraint.split("&&")
    return createConstraints(constraint, options);
}

module.exports = {
    toConstraints,
};
