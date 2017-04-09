'use strict';

const assert = require('assert');
const parser = require('../../../../../../lib/parser');
const atoms = require('../../../../../../lib/flow/rule/patterns/atoms');

const fromConstraints = atoms.utils.fromConstraints;

describe('atoms', () => {
    describe('.fromConstraints', () => {
        const VALID_ATOM_TYPES = [
            atoms.ComparisonAtom,
            atoms.EqualityAtom,
            atoms.InequalityAtom,
            atoms.ReferenceAtom,
            atoms.ReferenceEqualityAtom,
            atoms.ReferenceInequalityAtom,
            atoms.ReferenceGTAtom,
            atoms.ReferenceGTEAtom,
            atoms.ReferenceLTAtom,
            atoms.ReferenceLTEAtom,
        ];

        function assertAtomType(atom, Atoms) {
            VALID_ATOM_TYPES.forEach((atm) => {
                if (Atoms.indexOf(atm) !== -1) {
                    return assert(atom instanceof atm, `expected pattern to be an instanceof ${atm.name}`);
                }
                return assert(!(atom instanceof atm), `expected pattern to not be an instanceof ${atm.name}`);
            });
        }

        it('should create ComparisonAtoms by default for function constraints', () => {
            const parsedAtoms = fromConstraints([['isFalse', null, 'identifier'], ['a', null, 'identifier'], 'function'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'comparison');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom]);
        });

        it('should create ComparisonAtoms if the constraint type is gt', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'gt'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'comparison');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom]);
        });

        it('should create ComparisonAtoms if the constraint type is gte', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'gte'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'comparison');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom]);
        });

        it('should create ComparisonAtoms if the constraint type is lt', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'lt'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'comparison');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom]);
        });

        it('should create ComparisonAtoms if the constraint type is lte', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'lte'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'comparison');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom]);
        });

        it('should create EqualityAtom if the constraint type is eq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'eq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'equality');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom, atoms.EqualityAtom]);
        });

        it('should create EqualityAtom if the constraint type is seq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'seq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'equality');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom, atoms.EqualityAtom]);
        });

        it('should create an InequalityAtom if the constraint type is neq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'neq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'inequality');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom, atoms.InequalityAtom]);
        });

        it('should create an InequalityAtom if the constraint type is sneq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], [1, null, 'number'], 'sneq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assertAtomType(parsedAtoms[0].type, 'inequality');
            assertAtomType(parsedAtoms[0], [atoms.ComparisonAtom, atoms.InequalityAtom]);
        });

        it('should create a ReferenceAtom if there is a reference and the constraint type is function', () => {
            const parsedAtoms = fromConstraints([['isFalse', null, 'identifier'], ['b', null, 'identifier'], 'function'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference');
            assertAtomType(parsedAtoms[0], [atoms.ReferenceAtom]);
        });

        it('should create a ReferenceEqualityAtom if there is a reference and the constraint type is eq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'eq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_equality');
            assertAtomType(parsedAtoms[0], [atoms.ReferenceAtom, atoms.ReferenceEqualityAtom]);
        });

        it('should create a ReferenceEqualityAtom if there is a reference and the constraint type is seq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'seq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_equality');
            assertAtomType(parsedAtoms[0], [atoms.ReferenceAtom, atoms.ReferenceEqualityAtom]);
        });

        it('should create a ReferenceInequalityAtom if there is a reference and the constraint type is neq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'neq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_inequality');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceInequalityAtom,
            ]);
        });

        it('should create a ReferenceInequalityAtom if there is a reference and the constraint type is sneq', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'sneq'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_inequality');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceInequalityAtom,
            ]);
        });

        it('should create a ReferenceGTAtom if there is a reference and the constraint type is gt', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'gt'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_gt');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceGTAtom,
            ]);
        });

        it('should create a ReferenceGTEAtom if there is a reference and the constraint type is gte', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'gte'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_gte');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceGTEAtom,
            ]);
        });

        it('should create a ReferenceLTAtom if there is a reference and the constraint type is lt', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'lt'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_lt');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceLTAtom,
            ]);
        });

        it('should create a ReferenceLTEAtom if there is a reference and the constraint type is lte', () => {
            const parsedAtoms = fromConstraints([['a', null, 'identifier'], ['b', null, 'identifier'], 'lte'], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference_lte');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
                atoms.ReferenceLTEAtom,
            ]);
        });

        it('should create a multiple atoms if there is an and', () => {
            const parsedAtoms = fromConstraints([
                [['isTrue', null, 'identifier'], ['b', null, 'identifier'], 'function'],
                [['isFalse', null, 'identifier'], ['a', null, 'identifier'], 'function'],
                'and',
            ], {alias: 'a'});
            assert(parsedAtoms.length === 2);
            assert.equal(parsedAtoms[0].type, 'reference');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
            ]);
            assert.equal(parsedAtoms[1].type, 'comparison');
            assertAtomType(parsedAtoms[1], [
                atoms.ComparisonAtom,
            ]);

            const parsedAtoms2 = fromConstraints([
                [
                    [[['a', null, 'identifier'], ['name', null, 'identifier'], 'prop'], ['bob', null, 'string'], 'eq'],
                    [[['a', null, 'identifier'], ['flag', null, 'identifier'], 'prop'], null, 'logicalNot'],
                    'and',
                ],
                [['b', null, 'identifier'], [1, null, 'number'], 'eq'],
                'and',
            ], {alias: 'a'});
            assert(parsedAtoms2.length === 3);
            assert.equal(parsedAtoms2[0].type, 'equality');
            assertAtomType(parsedAtoms2[0], [
                atoms.ComparisonAtom,
                atoms.EqualityAtom,
            ]);
            assert.equal(parsedAtoms2[1].type, 'comparison');
            assertAtomType(parsedAtoms2[1], [
                atoms.ComparisonAtom,
            ]);
            assert.equal(parsedAtoms2[2].type, 'reference_equality');
            assertAtomType(parsedAtoms2[2], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
            ]);

            const parsedAtoms3 = fromConstraints([
                [
                    [[['a', null, 'identifier'], ['name', null, 'identifier'], 'prop'], ['bob', null, 'string'], 'eq'],
                    [['isFalse', null, 'identifier'], [['a', null, 'identifier'], ['flag', null, 'identifier'], 'prop'], 'function'],
                    'and',
                ],
                [['b', null, 'identifier'], [1, null, 'number'], 'eq'],
                'and',
            ], {alias: 'a'});
            assert(parsedAtoms3.length === 3);
            assert.equal(parsedAtoms3[0].type, 'equality');
            assertAtomType(parsedAtoms3[0], [
                atoms.ComparisonAtom,
                atoms.EqualityAtom,
            ]);
            assert.equal(parsedAtoms3[1].type, 'comparison');
            assertAtomType(parsedAtoms3[1], [
                atoms.ComparisonAtom,
            ]);
            assert.equal(parsedAtoms3[2].type, 'reference_equality');
            assertAtomType(parsedAtoms3[2], [
                atoms.ReferenceAtom,
                atoms.ReferenceEqualityAtom,
            ]);
        });

        it('should create a single Atom if the constraint type is or', () => {
            const parsedAtoms = fromConstraints([
                [['isTrue', null, 'identifier'], ['b', null, 'identifier'], 'function'],
                [['isFalse', null, 'identifier'], ['a', null, 'identifier'], 'function'],
                'or',
            ], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'reference');
            assertAtomType(parsedAtoms[0], [
                atoms.ReferenceAtom,
            ]);

            const parsedAtoms2 = fromConstraints([
                [['isNumber', null, 'identifier'], ['b', null, 'identifier'], 'function'],
                [
                    [['isFalse', null, 'identifier'], ['a', null, 'identifier'], 'function'],
                    [['b', null, 'identifier'], [1, null, 'number'], 'eq'],
                    'and',
                ],
                'or',
            ], {alias: 'a'});
            assert(parsedAtoms2.length === 1);
            assert.equal(parsedAtoms2[0].type, 'reference');
            assertAtomType(parsedAtoms2[0], [
                atoms.ReferenceAtom,
            ]);
        });

        it('should return a single atom if the and is in a group', () => {
            const parsedAtoms = fromConstraints([
                [
                    [
                        [['a', null, 'identifier'], ['bool', null, 'identifier'], 'prop'],
                        [['a', null, 'identifier'], ['bool2', null, 'identifier'], 'prop'],
                        'and',
                    ],
                    null,
                    'composite',
                ],
                null,
                'logicalNot',
            ], {alias: 'a'});
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'comparison');
        });

        it('should create correct pattern depending on scope', () => {
            const parsedAtoms = fromConstraints([['isEmail', null, 'identifier'], ['a', null, 'identifier'], 'function'], {
                alias: 'a',
                scope: {
                    isEmail() {
                    },
                },
            });
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'comparison');

            const parsedAtoms2 = fromConstraints([['isEmail', null, 'identifier'], ['a', null, 'identifier'], 'function'], {alias: 'a'});
            assert(parsedAtoms2.length === 1);
            assert.equal(parsedAtoms2[0].type, 'reference');
        });

        it('should return a custom CustomConstraint if called with a function', () => {
            const parsedAtoms = fromConstraints(() => {
                return true;
            });
            assert(parsedAtoms.length === 1);
            assert.equal(parsedAtoms[0].type, 'custom');
        });
    });
});
