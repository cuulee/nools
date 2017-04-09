'use strict';

const parser = require('../../../../../parser');
const EqualityAtom = require('../equalityAtom');
const InequalityAtom = require('../inequalityAtom');
const ComparisonAtom = require('../comparisonAtom');
const ReferenceAtom = require('../referenceAtom');
const ReferenceEqualityAtom = require('../referenceEqualityAtom');
const ReferenceInequalityAtom = require('../referenceInequalityAtom');
const ReferenceGTAtom = require('../referenceGTAtom');
const ReferenceGTEAtom = require('../referenceGTEAtom');
const ReferenceLTAtom = require('../referenceLTAtom');
const ReferenceLTEAtom = require('../referenceLTEAtom');
const CustomAtom = require('../customAtom');
const definedFunctions = require('./definedFunctions');

const ATOM_CONSTRAINT_TYPES = [
    'composite',
    'or',
    'lt',
    'gt',
    'lte',
    'gte',
    'like',
    'notLike',
    'eq',
    'neq',
    'seq',
    'sneq',
    'in',
    'notIn',
    'prop',
    'propLookup',
    'function',
    'logicalNot',
];

const REFERENCE_ATOMS = {
    eq: ReferenceEqualityAtom,
    seq: ReferenceEqualityAtom,
    neq: ReferenceInequalityAtom,
    sneq: ReferenceInequalityAtom,
    gt: ReferenceGTAtom,
    gte: ReferenceGTEAtom,
    lt: ReferenceLTAtom,
    lte: ReferenceLTEAtom,
};

const ATOMS = {
    eq: EqualityAtom,
    seq: EqualityAtom,
    neq: InequalityAtom,
    sneq: InequalityAtom,
};

function createReferenceAtom(constraintType, constraint, options) {
    if (constraintType in REFERENCE_ATOMS) {
        return new REFERENCE_ATOMS[constraintType](constraint, options);
    }
    return new ReferenceAtom(constraint, options);
}

function createAtom(constraintType, constraint, options) {
    if (constraintType in ATOMS) {
        return new ATOMS[constraintType](constraint, options);
    }
    return new ComparisonAtom(constraint, options);
}

function isReferenceConstraint(constraint, options) {
    const alias = options.alias;
    const scope = options.scope || {};
    return parser.constraint.getIdentifiers(constraint).some((i) => {
        return i !== alias && !(i in definedFunctions) && !(i in scope);
    });
}

function fromConstraints(constraint, options) {
    if (typeof constraint === 'function') {
        return [new CustomAtom(constraint, options)];
    }
    const constraintType = constraint[2];
    if (constraintType === 'and') {
        const leftAtoms = fromConstraints(constraint[0], options);
        const rightAtoms = fromConstraints(constraint[1], options);
        return leftAtoms.concat(rightAtoms);
    } else if (ATOM_CONSTRAINT_TYPES.indexOf(constraintType) !== -1) {
        if (isReferenceConstraint(constraint, options)) {
            return [createReferenceAtom(constraintType, constraint, options)];
        }
        return [createAtom(constraintType, constraint, options)];
    }
    return [];
}

module.exports = fromConstraints;
