'use strict';

const assert = require('assert');
const parser = require('../../lib/parser');
const helper = require('../../lib/constraintMatcher/helper');

describe('constraint matcher helper', () => {

    describe('.getIdentifiers', () => {
        it('should create the correct atoms for and expressions', () => {
            let identifiers = helper.getIdentifiers(parser.parseConstraint('isFalse(a)'), 'a');
            assert(identifiers.length === 2);
            assert.deepEqual(identifiers, ['isFalse', 'a']);

            identifiers = helper.getIdentifiers(parser.parseConstraint('a.b.c == false'), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);

            identifiers = helper.getIdentifiers(parser.parseConstraint('a.b() == false'), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);

            identifiers = helper.getIdentifiers(parser.parseConstraint('b(a) == false'), 'a');
            assert(identifiers.length === 2);
            assert.deepEqual(identifiers, ['b', 'a']);

            identifiers = helper.getIdentifiers(parser.parseConstraint('a in [1,b,c]'), 'a');
            assert(identifiers.length === 3);
            assert.deepEqual(identifiers, ['a', 'b', 'c']);

            identifiers = helper.getIdentifiers(parser.parseConstraint("a.hello.length eq 5 && a.myFunc() eq 'hello world'"), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);
        });
    });

    describe('.equals', () => {
        it('should return true when equal', () => {
            assert(helper.equal(
                parser.parseConstraint("p.soreThroat == true && p.fever in ['mild', 'high']"),
                parser.parseConstraint("p.soreThroat == true && p.fever in ['mild', 'high']")));
            assert(helper.equal(
                parser.parseConstraint('f.value == -1 && (f.sequence == 1 || f.sequence == 2)'),
                parser.parseConstraint('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(helper.equal(parser.parseConstraint('a.hello.length eq 5'),
                parser.parseConstraint('a.hello.length eq 5')));
            assert(helper.equal(parser.parseConstraint('a && b'), parser.parseConstraint('a && b')));
            assert(helper.equal(parser.parseConstraint('[]'), parser.parseConstraint('[]')));
            assert(helper.equal(parser.parseConstraint('a.in == [1,2,3]'), parser.parseConstraint('a.in == [1,2,3]')));
            assert(helper.equal(parser.parseConstraint('a + b'), parser.parseConstraint('a + b')));
            assert(helper.equal(parser.parseConstraint('a > b'), parser.parseConstraint('a > b')));
            assert(helper.equal(parser.parseConstraint('a == b'), parser.parseConstraint('a == b')));
            assert(helper.equal(parser.parseConstraint('a && b || c'), parser.parseConstraint('a && b || c')));
            assert(helper.equal(parser.parseConstraint('hello()'), parser.parseConstraint('hello()')));
            assert(helper.equal(parser.parseConstraint('a.hello(a, b)'), parser.parseConstraint('a.hello(a, b)')));
            assert(helper.equal(parser.parseConstraint('hello(a, b, c, e)'), parser.parseConstraint('hello(a, b, c, e)')));
            assert(helper.equal(parser.parseConstraint("Date('2001-02-01')"), parser.parseConstraint("Date('2001-02-01')")));
        });

        it('should return false when not equal', () => {
            assert(!helper.equal(
                parser.parseConstraint('f.value == 1 && (f.sequence == 1 || f.sequence == 2)'),
                parser.parseConstraint('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(!helper.equal(
                parser.parseConstraint("p.soreThroat == true && p.fever in ['mild', 'high']"),
                parser.parseConstraint('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(!helper.equal(
                parser.parseConstraint('f.value == -1 && (f.sequence == 1 || f.sequence == 2)'),
                parser.parseConstraint("p.soreThroat == true && p.fever in ['mild', 'high']")));
            assert(!helper.equal(parser.parseConstraint('a.hello.length eq 5'), parser.parseConstraint('a && b')));
            assert(!helper.equal(parser.parseConstraint('a && b'), parser.parseConstraint('a.hello.length eq 5')));
            assert(!helper.equal(parser.parseConstraint('[]'), parser.parseConstraint('a.in == [1,2,3]')));
            assert(!helper.equal(parser.parseConstraint('a.in == [1,2,3]'), parser.parseConstraint('[]')));
            assert(!helper.equal(parser.parseConstraint('a + b'), parser.parseConstraint('a > b')));
            assert(!helper.equal(parser.parseConstraint('a > b'), parser.parseConstraint('a + b')));
            assert(!helper.equal(parser.parseConstraint('a == b'), parser.parseConstraint('a && b || c')));
            assert(!helper.equal(parser.parseConstraint('a && b || c'), parser.parseConstraint('a == b')));
            assert(!helper.equal(parser.parseConstraint('hello()'), parser.parseConstraint('a.hello(a, b)')));
            assert(!helper.equal(parser.parseConstraint('a.hello(a, b)'), parser.parseConstraint('hello()')));
            assert(!helper.equal(parser.parseConstraint('hello(a, b, c, e)'), parser.parseConstraint("Date('2001-02-01')")));
            assert(!helper.equal(parser.parseConstraint("Date('2001-02-01')"), parser.parseConstraint('hello(a, b, c, e)')));
        });
    });

    describe('.getIndexableProperties', () => {
        it('should get properties with no functions', () => {
            const operators = ['==', '!=', '>', '>=', '<', '<='];
            for (let i = 0, l = operators.length; i < l; i++) {
                const op = operators[i];
                let props = helper.getIndexableProperties(parser.parseConstraint(`a ${op} b`), 'a');
                assert.deepEqual(props, ['a', 'b']);
                props = helper.getIndexableProperties(parser.parseConstraint(`a.b ${op} b`), 'a');
                assert.deepEqual(props, ['a.b', 'b']);
                props = helper.getIndexableProperties(parser.parseConstraint(`a ${op} b.c`), 'a');
                assert.deepEqual(props, ['a', 'b.c']);
                props = helper.getIndexableProperties(parser.parseConstraint(`a.b.c.d ${op} b.c.d.e `), 'a');
                assert.deepEqual(props, ['a.b.c.d', 'b.c.d.e']);
                props = helper.getIndexableProperties(parser.parseConstraint(`(a ${op} b)`), 'a');
                assert.deepEqual(props, ['a', 'b']);
            }
        });

        it('should not get non indexable constraints', () => {
            let props = helper.getIndexableProperties(parser.parseConstraint('a.b.c.d == b.c.d.e || a.b.c == b.c.d '), 'a');
            assert.deepEqual(props, []);

            props = helper.getIndexableProperties(parser.parseConstraint('a.b.c.d == b.c.d.e || a.b.c == b.c.d && c.d.e == d.e.f '), 'a');
            assert.deepEqual(props, []);
            props = helper.getIndexableProperties(parser.parseConstraint('f3.sequence == s2 + 1'));
            assert.deepEqual(props, []);
        });

        it('should not get properties with functions', () => {
            const props = helper.getIndexableProperties(parser.parseConstraint('a() == b()'), 'a');
            assert.deepEqual(props, []);
        });
    });
});
