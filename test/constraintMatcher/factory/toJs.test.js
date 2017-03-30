'use strict';

const assert = require('assert');
const parser = require('../../../lib/parser');
const factory = require('../../../lib/constraintMatcher/factory');

describe('constraintMatcher factory', () => {
    describe('.getMatcher', () => {
        it('should check equality', () => {
            assert(factory.getMatcher(parser.parseConstraint("a == 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a eq 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint('a == 10'))({a: 10}));
            assert(factory.getMatcher(parser.parseConstraint('a eq 10'))({a: 10}));
            assert(factory.getMatcher(parser.parseConstraint('a == true'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a eq true'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a == false'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a eq false'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a == 10'))({a: '10'}));
            assert(factory.getMatcher(parser.parseConstraint('a eq 10'))({a: '10'}));
            assert(factory.getMatcher(parser.parseConstraint('a == null'))({a: null}));
            assert(factory.getMatcher(parser.parseConstraint('a ==null'))({a: null}));
            assert(factory.getMatcher(parser.parseConstraint('a eq null'))({a: null}));

            assert(!factory.getMatcher(parser.parseConstraint("a == 'a'"))({a: 'b'}));
            assert(!factory.getMatcher(parser.parseConstraint("a eq 'a'"))({a: 'b'}));
            assert(!factory.getMatcher(parser.parseConstraint('a == 10'))({a: 11}));
            assert(!factory.getMatcher(parser.parseConstraint('a eq 10'))({a: 11}));
            assert(!factory.getMatcher(parser.parseConstraint('a == false'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a eq false'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a == true'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a eq true'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a == null'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a ==null'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a eq null'))({a: false}));
        });

        it('should check strict equality', () => {
            assert(factory.getMatcher(parser.parseConstraint("a === 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a seq 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint('a === 10'))({a: 10}));
            assert(factory.getMatcher(parser.parseConstraint('a seq 10'))({a: 10}));
            assert(factory.getMatcher(parser.parseConstraint('a === true'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a ===true'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a === false'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a ===false'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a seq false'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a === null'))({a: null}));
            assert(factory.getMatcher(parser.parseConstraint('a ===null'))({a: null}));
            assert(factory.getMatcher(parser.parseConstraint('a seq null'))({a: null}));

            assert(!factory.getMatcher(parser.parseConstraint("a === 'a'"))({a: 'b'}));
            assert(!factory.getMatcher(parser.parseConstraint("a seq 'a'"))({a: 'b'}));
            assert(!factory.getMatcher(parser.parseConstraint('a === 10'))({a: 11}));
            assert(!factory.getMatcher(parser.parseConstraint('a seq 10'))({a: 11}));
            assert(!factory.getMatcher(parser.parseConstraint('a === 10'))({a: '10'}));
            assert(!factory.getMatcher(parser.parseConstraint('a seq 10'))({a: '10'}));
            assert(!factory.getMatcher(parser.parseConstraint('a === false'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a ===false'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a seq false'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a === true'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a ===true'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a seq true'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a === null'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a ===null'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a seq null'))({a: false}));
        });

        it('should check inequality', () => {
            assert(!factory.getMatcher(parser.parseConstraint("a != 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint("a neq 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint('a != 10'))({a: 10}));
            assert(!factory.getMatcher(parser.parseConstraint('a neq 10'))({a: 10}));
            assert(!factory.getMatcher(parser.parseConstraint('a != true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a !=true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a neq true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a != false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a !=false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a neq false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a != 10'))({a: '10'}));
            assert(!factory.getMatcher(parser.parseConstraint('a neq 10'))({a: '10'}));
            assert(!factory.getMatcher(parser.parseConstraint('a != null'))({a: null}));
            assert(!factory.getMatcher(parser.parseConstraint('a !=null'))({a: null}));
            assert(!factory.getMatcher(parser.parseConstraint('a neq null'))({a: null}));

            assert(factory.getMatcher(parser.parseConstraint("a != 'a'"))({a: 'b'}));
            assert(factory.getMatcher(parser.parseConstraint("a neq 'a'"))({a: 'b'}));
            assert(factory.getMatcher(parser.parseConstraint('a != 10'))({a: 11}));
            assert(factory.getMatcher(parser.parseConstraint('a neq 10'))({a: 11}));
            assert(factory.getMatcher(parser.parseConstraint('a != false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a !=false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a neq false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a != true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a !=true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a neq true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a != null'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a !=null'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a neq null'))({a: false}));
        });

        it('should check strict inequality', () => {
            assert(!factory.getMatcher(parser.parseConstraint("a !== 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint("a sneq 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint('a !== 10'))({a: 10}));
            assert(!factory.getMatcher(parser.parseConstraint('a sneq 10'))({a: 10}));
            assert(!factory.getMatcher(parser.parseConstraint('a !== true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a !==true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a sneq true'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a !== false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a !==false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a sneq false'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('a !== null'))({a: null}));
            assert(!factory.getMatcher(parser.parseConstraint('a !==null'))({a: null}));
            assert(!factory.getMatcher(parser.parseConstraint('a sneq null'))({a: null}));

            assert(factory.getMatcher(parser.parseConstraint("a !== 'a'"))({a: 'b'}));
            assert(factory.getMatcher(parser.parseConstraint("a sneq 'a'"))({a: 'b'}));
            assert(factory.getMatcher(parser.parseConstraint('a !== 10'))({a: 11}));
            assert(factory.getMatcher(parser.parseConstraint('a sneq 10'))({a: 11}));
            assert(factory.getMatcher(parser.parseConstraint('a !== 10'))({a: '10'}));
            assert(factory.getMatcher(parser.parseConstraint('a sneq 10'))({a: '10'}));
            assert(factory.getMatcher(parser.parseConstraint('a !== false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a !==false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a sneq false'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('a !== true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a !==true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a sneq true'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a !== null'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a !==null'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a sneq null'))({a: false}));
        });

        it('should check gt operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a > '0'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a gt '0'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint("a > '0'"))({a: '0'}));
            assert(!factory.getMatcher(parser.parseConstraint("a gt '0'"))({a: '0'}));

            assert(factory.getMatcher(parser.parseConstraint('a > 0'))({a: 1}));
            assert(factory.getMatcher(parser.parseConstraint('a gt 0'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('a > 0'))({a: 0}));
            assert(!factory.getMatcher(parser.parseConstraint('a gt 0'))({a: 0}));
        });

        it('should check lt operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a < 'b'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a lt 'b'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint("a < '0'"))({a: '0'}));
            assert(!factory.getMatcher(parser.parseConstraint("a lt '0'"))({a: '0'}));

            assert(factory.getMatcher(parser.parseConstraint('a < 2'))({a: 1}));
            assert(factory.getMatcher(parser.parseConstraint('a lt 2'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('a < 0'))({a: 0}));
            assert(!factory.getMatcher(parser.parseConstraint('a lt 0'))({a: 0}));
        });

        it('should check gte operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a >= 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a gte 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint("a >= 'a'"))({a: '0'}));
            assert(!factory.getMatcher(parser.parseConstraint("a gte 'a'"))({a: '0'}));

            assert(factory.getMatcher(parser.parseConstraint('a >= 1'))({a: 1}));
            assert(factory.getMatcher(parser.parseConstraint('a gte 1'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('a >= 1'))({a: 0}));
            assert(!factory.getMatcher(parser.parseConstraint('a gte 1'))({a: 0}));
        });

        it('should check lte operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a <= 'a'"))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint("a lte 'a'"))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint('a <= -1'))({a: '0'}));
            assert(!factory.getMatcher(parser.parseConstraint('a lte -1'))({a: '0'}));

            assert(factory.getMatcher(parser.parseConstraint('a <= 1'))({a: 1}));
            assert(factory.getMatcher(parser.parseConstraint('a lte 1'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('a <= -1'))({a: 0}));
            assert(!factory.getMatcher(parser.parseConstraint('a lte -1'))({a: 0}));
            assert(factory.getMatcher(parser.parseConstraint('a <= -1'))({a: -10}));
            assert(factory.getMatcher(parser.parseConstraint('a lte -1'))({a: -10}));
        });

        it('should check like operator', () => {
            assert(factory.getMatcher(parser.parseConstraint('a =~ /hello/'))({a: 'hello'}));
            assert(factory.getMatcher(parser.parseConstraint('a like /hello/'))({a: 'hello'}));
            assert(!factory.getMatcher(parser.parseConstraint('a =~ /world/'))({a: 'hello'}));
            assert(!factory.getMatcher(parser.parseConstraint('a like /world/'))({a: 'hello'}));
            assert(factory.getMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(factory.getMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'he/llo'}));
            assert(factory.getMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'world'}));
            assert(factory.getMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(!factory.getMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'a'}));

            assert(factory.getMatcher(parser.parseConstraint('a =~ /^hello world$/'))({a: 'hello world'}));
            assert(factory.getMatcher(parser.parseConstraint('a like /^hello world$/'))({a: 'hello world'}));
            assert(!factory.getMatcher(parser.parseConstraint('a =~ /^hello world$/'))({a: 'hello world2'}));
            assert(!factory.getMatcher(parser.parseConstraint('a like /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check notLike operator', () => {
            assert(!factory.getMatcher(parser.parseConstraint('a !=~ /hello/'))({a: 'hello'}));
            assert(!factory.getMatcher(parser.parseConstraint('a notLike /hello/'))({a: 'hello'}));

            assert(factory.getMatcher(parser.parseConstraint('a !=~ /world/'))({a: 'hello'}));
            assert(factory.getMatcher(parser.parseConstraint('a notLike /world/'))({a: 'hello'}));

            assert(!factory.getMatcher(parser.parseConstraint('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(!factory.getMatcher(parser.parseConstraint('a notLike /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));

            assert(!factory.getMatcher(parser.parseConstraint('a !=~ /he\\/llo/ && a !=~ /world/'))({a: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint('a notLike /he\\/llo/ && a notLike /world/'))({a: 'world'}));

            assert(factory.getMatcher(parser.parseConstraint('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint('a notLike /he\\/llo/ || a =~ /world/'))({a: 'a'}));

            assert(!factory.getMatcher(parser.parseConstraint('a !=~ /^hello world$/'))({a: 'hello world'}));
            assert(!factory.getMatcher(parser.parseConstraint('a notLike /^hello world$/'))({a: 'hello world'}));

            assert(factory.getMatcher(parser.parseConstraint('a !=~ /^hello world$/'))({a: 'hello world2'}));
            assert(factory.getMatcher(parser.parseConstraint('a notLike /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check and operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
        });

        it('should check or operator', () => {
            assert(factory.getMatcher(parser.parseConstraint("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'world'}}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
            assert(factory.getMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
        });

        it('should check with member operator', () => {
            assert(factory.getMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
            assert(!factory.getMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getMatcher(parser.parseConstraint("a['hello'] eq a['world']"))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getMatcher(parser.parseConstraint('a[b] eq a[c]'))({a: {hello: 'hello', world: 'world'}, b: 'hello', c: 'world'}));
        });

        it('should check with in operator', () => {
            assert(factory.getMatcher(parser.parseConstraint('a in [1,2,3,4]'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint("a in ['a','b','c']"))({a: 1}));
        });

        it('should check with notIn operator', () => {
            assert(!factory.getMatcher(parser.parseConstraint('a notIn [1,2,3,4]'))({a: 1}));
            assert(factory.getMatcher(parser.parseConstraint("a notIn ['a','b','c']"))({a: 1}));
        });

        it('should allow properties with in', () => {
            assert(factory.getMatcher(parser.parseConstraint('a.in == 1'))({a: {in: 1}}));
            assert(factory.getMatcher(parser.parseConstraint('a.innoculated == 1'))({a: {innoculated: 1}}));
        });

        it('should check with boolean associativity', () => {
            const a = {hello: 'hello', world: 'world', age: 10, name: 'bob'};
            assert(factory.getMatcher(parser.parseConstraint("a.hello eq a.world || (a.age >= 10 && a.name eq 'bob')"))({a}));
            assert(factory.getMatcher(parser.parseConstraint("(a.hello eq a.world && a.age >= 10) || a.name eq 'bob'"))({a}));
        });

        it('should check with nested properties', () => {
            const a = {hello: 'hello'};
            assert(factory.getMatcher(parser.parseConstraint('a.hello.length eq 5'))({a}));
            assert(!factory.getMatcher(parser.parseConstraint('a.hello.size eq 5'))({a}));
        });

        it('should check with function', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(factory.getMatcher(parser.parseConstraint("a.hello.length eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello.size eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 5 && a.myFunc() eq 'hello'"))({a}));
        });

        it('should check with functions and identifier args', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(factory.getMatcher(parser.parseConstraint("a.hello.length eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello.size eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 5 && a.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should check with functions in a deep property chain and identifier args', () => {
            const a = {
                hello: 'hello',
                b: {
                    c: {
                        myFunc() {
                            return `${a.hello} world`;
                        },
                    },
                },
            };
            assert(factory.getMatcher(parser.parseConstraint("a.hello.length eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello.size eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 5 && a.b.c.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should check with functions in a deep property chain that returns an object and identifier args', () => {
            const a = {
                hello: 'hello',
                b: {
                    c: {
                        myFunc() {
                            return {
                                d: {
                                    myFunc() {
                                        return `${a.hello} world`;
                                    },
                                },
                            };
                        },
                    },
                },
            };
            assert(factory.getMatcher(parser.parseConstraint("a.hello.length eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello.size eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getMatcher(parser.parseConstraint("a.hello eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should have date helpers', () => {
            const a = {myDate: new Date()};
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lte now()'))({a}));
            assert(factory.getMatcher(parser.parseConstraint(`a.myDate lte Date(${new Date().getFullYear()})`))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt yearsAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt yearsFromNow(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt monthsAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt monthsFromNow(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt daysAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt daysFromNow(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt hoursAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt hoursFromNow(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt minutesAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt minutesFromNow(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate gt secondsAgo(10)'))({a}));
            assert(factory.getMatcher(parser.parseConstraint('a.myDate lt secondsFromNow(10)'))({a}));
        });

        it('should create have type helpers', () => {
            assert(factory.getMatcher(parser.parseConstraint('isTrue(a)'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('isTrue(a)'))({a: false}));

            assert(factory.getMatcher(parser.parseConstraint('isFalse(a)'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('isFalse(a)'))({a: true}));

            assert(factory.getMatcher(parser.parseConstraint('isNumber(a)'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('isNumber(a)'))({a: false}));

            assert(factory.getMatcher(parser.parseConstraint('isBoolean(a)'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('isBoolean(a)'))({a: 1}));

            assert(factory.getMatcher(parser.parseConstraint('isDate(a)'))({a: new Date()}));
            assert(!factory.getMatcher(parser.parseConstraint('isDate(a)'))({a: 1}));

            assert(factory.getMatcher(parser.parseConstraint('isRegExp(a)'))({a: /a/}));
            assert(!factory.getMatcher(parser.parseConstraint('isRegExp(a)'))({a: '/a/'}));

            assert(factory.getMatcher(parser.parseConstraint('isDefined(a)'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('isDefined(a)'))({a: undefined}));

            assert(factory.getMatcher(parser.parseConstraint('isUndefined(a)'))({a: undefined}));
            assert(!factory.getMatcher(parser.parseConstraint('isUndefined(a)'))({a: false}));

            assert(factory.getMatcher(parser.parseConstraint('isNotNull(a)'))({a: 1}));
            assert(!factory.getMatcher(parser.parseConstraint('isNotNull(a)'))({a: null}));

            assert(factory.getMatcher(parser.parseConstraint('isEmpty(a)'))({a: {}}));
            assert(!factory.getMatcher(parser.parseConstraint('isEmpty(a)'))({a: {b: 'c'}}));

            assert(factory.getMatcher(parser.parseConstraint('lengthOf(a, 3)'))({a: [1, 2, 3]}));
            assert(!factory.getMatcher(parser.parseConstraint('lengthOf(a, 3)'))({a: [1]}));

            assert(factory.getMatcher(parser.parseConstraint('deepEqual(a, b) && deepEqual(c,d) && deepEqual(e, f)'))({
                a: [1, 2, 3],
                b: [1, 2, 3],
                c: new Date(2000, 10, 10, 10, 10, 10),
                d: new Date(2000, 10, 10, 10, 10, 10),
                e: {
                    a: new Date(2000, 10, 10, 10, 10, 10),
                    b: new Date(2000, 10, 10, 10, 10, 10),
                },
                f: {
                    a: new Date(2000, 10, 10, 10, 10, 10),
                    b: new Date(2000, 10, 10, 10, 10, 10),
                },
            }));
            assert(!factory.getMatcher(parser.parseConstraint('deepEqual(a, b)'))({a: [1], b: new Date()}));
        });

        it('should check truthy statements', () => {
            assert(factory.getMatcher(parser.parseConstraint('a'))({a: 'a'}));
            assert(factory.getMatcher(parser.parseConstraint('a'))({a: 10}));
            assert(factory.getMatcher(parser.parseConstraint('a'))({a: true}));
            assert(factory.getMatcher(parser.parseConstraint('!a'))({a: false}));
            assert(factory.getMatcher(parser.parseConstraint('a && b'))({a: true, b: true}));
            assert(factory.getMatcher(parser.parseConstraint('!(a && b)'))({a: false, b: false}));
            assert(factory.getMatcher(parser.parseConstraint('!(a || b)'))({a: false, b: false}));

            assert(!factory.getMatcher(parser.parseConstraint('!a'))({a: 'b'}));
            assert(!factory.getMatcher(parser.parseConstraint('!a == 10'))({a: 11}));
            assert(!factory.getMatcher(parser.parseConstraint('!a == 10'))({a: '10'}));
            assert(!factory.getMatcher(parser.parseConstraint('!a'))({a: true}));
            assert(!factory.getMatcher(parser.parseConstraint('a'))({a: false}));
            assert(!factory.getMatcher(parser.parseConstraint('!(a && b)'))({a: true, b: true}));
        });
    });

    describe('.getSourceMatcher', () => {
        it('should check equality', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a == 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a eq 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a == 10'))({a: 10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a eq 10'))({a: 10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a == true'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a eq true'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a == false'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a eq false'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a == 10'))({a: '10'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a eq 10'))({a: '10'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a == null'))({a: null}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a ==null'))({a: null}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a eq null'))({a: null}));

            assert(!factory.getSourceMatcher(parser.parseConstraint("a == 'a'"))({a: 'b'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a eq 'a'"))({a: 'b'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a == 10'))({a: 11}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a eq 10'))({a: 11}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a == false'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a eq false'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a == true'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a eq true'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a == null'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a ==null'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a eq null'))({a: false}));
        });

        it('should check strict equality', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a === 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a seq 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a === 10'))({a: 10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a seq 10'))({a: 10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a === true'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a ===true'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a === false'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a ===false'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a seq false'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a === null'))({a: null}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a ===null'))({a: null}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a seq null'))({a: null}));

            assert(!factory.getSourceMatcher(parser.parseConstraint("a === 'a'"))({a: 'b'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a seq 'a'"))({a: 'b'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a === 10'))({a: 11}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a seq 10'))({a: 11}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a === 10'))({a: '10'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a seq 10'))({a: '10'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a === false'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a ===false'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a seq false'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a === true'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a ===true'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a seq true'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a === null'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a ===null'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a seq null'))({a: false}));
        });

        it('should check inequality', () => {
            assert(!factory.getSourceMatcher(parser.parseConstraint("a != 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a neq 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a != 10'))({a: 10}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a neq 10'))({a: 10}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a != true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a neq true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a != false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a neq false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a != 10'))({a: '10'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a neq 10'))({a: '10'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a != null'))({a: null}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=null'))({a: null}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a neq null'))({a: null}));

            assert(factory.getSourceMatcher(parser.parseConstraint("a != 'a'"))({a: 'b'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a neq 'a'"))({a: 'b'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a != 10'))({a: 11}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a neq 10'))({a: 11}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a != false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !=false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a neq false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a != true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !=true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a neq true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a != null'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !=null'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a neq null'))({a: false}));
        });

        it('should check strict inequality', () => {
            assert(!factory.getSourceMatcher(parser.parseConstraint("a !== 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a sneq 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !== 10'))({a: 10}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a sneq 10'))({a: 10}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !== true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !==true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a sneq true'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !== false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !==false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a sneq false'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !== null'))({a: null}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !==null'))({a: null}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a sneq null'))({a: null}));

            assert(factory.getSourceMatcher(parser.parseConstraint("a !== 'a'"))({a: 'b'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a sneq 'a'"))({a: 'b'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !== 10'))({a: 11}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a sneq 10'))({a: 11}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !== 10'))({a: '10'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a sneq 10'))({a: '10'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !== false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !==false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a sneq false'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !== true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !==true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a sneq true'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !== null'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a !==null'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a sneq null'))({a: false}));
        });

        it('should check gt operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a > '0'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a gt '0'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a > '0'"))({a: '0'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a gt '0'"))({a: '0'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a > 0'))({a: 1}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a gt 0'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a > 0'))({a: 0}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a gt 0'))({a: 0}));
        });

        it('should check lt operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a < 'b'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a lt 'b'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a < '0'"))({a: '0'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a lt '0'"))({a: '0'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a < 2'))({a: 1}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a lt 2'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a < 0'))({a: 0}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a lt 0'))({a: 0}));
        });

        it('should check gte operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a >= 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a gte 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a >= 'a'"))({a: '0'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a gte 'a'"))({a: '0'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a >= 1'))({a: 1}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a gte 1'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a >= 1'))({a: 0}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a gte 1'))({a: 0}));
        });

        it('should check lte operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a <= 'a'"))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a lte 'a'"))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a <= -1'))({a: '0'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a lte -1'))({a: '0'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a <= 1'))({a: 1}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a lte 1'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a <= -1'))({a: 0}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a lte -1'))({a: 0}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a <= -1'))({a: -10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a lte -1'))({a: -10}));
        });

        it('should check like operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('a =~ /hello/'))({a: 'hello'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a like /hello/'))({a: 'hello'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a =~ /world/'))({a: 'hello'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a like /world/'))({a: 'hello'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'he/llo'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'world'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a =~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a like /he\\/llo/ || a like /world/'))({a: 'a'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a =~ /^hello world$/'))({a: 'hello world'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a like /^hello world$/'))({a: 'hello world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a =~ /^hello world$/'))({a: 'hello world2'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a like /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check notLike operator', () => {
            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=~ /hello/'))({a: 'hello'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a notLike /hello/'))({a: 'hello'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a !=~ /world/'))({a: 'hello'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a notLike /world/'))({a: 'hello'}));

            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a notLike /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));

            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=~ /he\\/llo/ && a !=~ /world/'))({a: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a notLike /he\\/llo/ && a notLike /world/'))({a: 'world'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a notLike /he\\/llo/ || a =~ /world/'))({a: 'a'}));

            assert(!factory.getSourceMatcher(parser.parseConstraint('a !=~ /^hello world$/'))({a: 'hello world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a notLike /^hello world$/'))({a: 'hello world'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('a !=~ /^hello world$/'))({a: 'hello world2'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a notLike /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check and operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
        });

        it('should check or operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'world'}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
        });

        it('should check with member operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a.hello eq a.world'))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a['hello'] eq a['world']"))({a: {hello: 'hello', world: 'world'}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a[b] eq a[c]'))({a: {hello: 'hello', world: 'world'}, b: 'hello', c: 'world'}));
        });

        it('should check with in operator', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('a in [1,2,3,4]'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a in ['a','b','c']"))({a: 1}));
        });

        it('should check with notIn operator', () => {
            assert(!factory.getSourceMatcher(parser.parseConstraint('a notIn [1,2,3,4]'))({a: 1}));
            assert(factory.getSourceMatcher(parser.parseConstraint("a notIn ['a','b','c']"))({a: 1}));
        });

        it('should allow properties with in', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('a.in == 1'))({a: {in: 1}}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.innoculated == 1'))({a: {innoculated: 1}}));
        });

        it('should check with boolean associativity', () => {
            const a = {hello: 'hello', world: 'world', age: 10, name: 'bob'};
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello eq a.world || (a.age >= 10 && a.name eq 'bob')"))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint("(a.hello eq a.world && a.age >= 10) || a.name eq 'bob'"))({a}));
        });

        it('should check with nested properties', () => {
            const a = {hello: 'hello'};
            assert(factory.getSourceMatcher(parser.parseConstraint('a.hello.length eq 5'))({a}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a.hello.size eq 5'))({a}));
        });

        it('should check with function', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello.length eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello.size eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 5 && a.myFunc() eq 'hello'"))({a}));
        });

        it('should check with functions and identifier args', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello.length eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello.size eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 5 && a.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should check with functions in a deep property chain and identifier args', () => {
            const a = {
                hello: 'hello',
                b: {
                    c: {
                        myFunc() {
                            return `${a.hello} world`;
                        },
                    },
                },
            };
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello.length eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello.size eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 5 && a.b.c.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should check with functions in a deep property chain that returns an object and identifier args', () => {
            const a = {
                hello: 'hello',
                b: {
                    c: {
                        myFunc() {
                            return {
                                d: {
                                    myFunc() {
                                        return `${a.hello} world`;
                                    },
                                },
                            };
                        },
                    },
                },
            };
            assert(factory.getSourceMatcher(parser.parseConstraint("a.hello.length eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello.size eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint("a.hello eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should have date helpers', () => {
            const a = {myDate: new Date()};
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lte now()'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint(`a.myDate lte Date(${new Date().getFullYear()})`))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt yearsAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt yearsFromNow(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt monthsAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt monthsFromNow(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt daysAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt daysFromNow(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt hoursAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt hoursFromNow(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt minutesAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt minutesFromNow(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate gt secondsAgo(10)'))({a}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a.myDate lt secondsFromNow(10)'))({a}));
        });

        it('should create have type helpers', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('isTrue(a)'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isTrue(a)'))({a: false}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isFalse(a)'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isFalse(a)'))({a: true}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isNumber(a)'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isNumber(a)'))({a: false}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isBoolean(a)'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isBoolean(a)'))({a: 1}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isDate(a)'))({a: new Date()}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isDate(a)'))({a: 1}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isRegExp(a)'))({a: /a/}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isRegExp(a)'))({a: '/a/'}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isDefined(a)'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isDefined(a)'))({a: undefined}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isUndefined(a)'))({a: undefined}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isUndefined(a)'))({a: false}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isNotNull(a)'))({a: 1}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isNotNull(a)'))({a: null}));

            assert(factory.getSourceMatcher(parser.parseConstraint('isEmpty(a)'))({a: {}}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('isEmpty(a)'))({a: {b: 'c'}}));

            assert(factory.getSourceMatcher(parser.parseConstraint('lengthOf(a, 3)'))({a: [1, 2, 3]}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('lengthOf(a, 3)'))({a: [1]}));

            assert(factory.getSourceMatcher(parser.parseConstraint('deepEqual(a, b) && deepEqual(c,d) && deepEqual(e, f)'))({
                a: [1, 2, 3],
                b: [1, 2, 3],
                c: new Date(2000, 10, 10, 10, 10, 10),
                d: new Date(2000, 10, 10, 10, 10, 10),
                e: {
                    a: new Date(2000, 10, 10, 10, 10, 10),
                    b: new Date(2000, 10, 10, 10, 10, 10),
                },
                f: {
                    a: new Date(2000, 10, 10, 10, 10, 10),
                    b: new Date(2000, 10, 10, 10, 10, 10),
                },
            }));
            assert(!factory.getSourceMatcher(parser.parseConstraint('deepEqual(a, b)'))({a: [1], b: new Date()}));
        });

        it('should check truthy statements', () => {
            assert(factory.getSourceMatcher(parser.parseConstraint('a'))({a: 'a'}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a'))({a: 10}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a'))({a: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('!a'))({a: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('a && b'))({a: true, b: true}));
            assert(factory.getSourceMatcher(parser.parseConstraint('!(a && b)'))({a: false, b: false}));
            assert(factory.getSourceMatcher(parser.parseConstraint('!(a || b)'))({a: false, b: false}));

            assert(!factory.getSourceMatcher(parser.parseConstraint('!a'))({a: 'b'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('!a == 10'))({a: 11}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('!a == 10'))({a: '10'}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('!a'))({a: true}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('a'))({a: false}));
            assert(!factory.getSourceMatcher(parser.parseConstraint('!(a && b)'))({a: true, b: true}));
        });
    });

    describe('.toJs', () => {
        it('should create js equvalent expression', () => {
            assert(factory.toJs(parser.parseConstraint('isFalse(a)'))({a: false}));
            assert(!factory.toJs(parser.parseConstraint('isFalse(a)'))({a: true}));

            assert(factory.toJs(parser.parseConstraint('isTrue(b)'))({b: true}));
            assert(!factory.toJs(parser.parseConstraint('isTrue(b)'))({b: false}));

            assert(factory.toJs(parser.parseConstraint('isFalse(a) && isTrue(b)'))({a: false, b: true}));
            assert(!factory.toJs(parser.parseConstraint('isFalse(a) && isTrue(b)'))({a: false, b: false}));

            assert(factory.toJs(parser.parseConstraint('isFalse(a) || isTrue(b)'))({a: true, b: true}));
            assert(!factory.toJs(parser.parseConstraint('isFalse(a) || isTrue(b)'))({a: true, b: false}));

            assert(factory.toJs(parser.parseConstraint('isNumber(b) || isFalse(a) && b == 1'))({b: 1, a: false}));
            assert(!factory.toJs(parser.parseConstraint('isNumber(b) || isFalse(a) && b == 1'))({b: 'a', a: true}));

            assert(factory.toJs(parser.parseConstraint('(isNumber(b) || isFalse(a)) && b == 1'))({b: 1, a: false}));
            assert(factory.toJs(parser.parseConstraint('(isNumber(b) || isFalse(a)) && b == 1'))({b: 1, a: true}));

            assert(factory.toJs(parser.parseConstraint('(isNumber(b) || isFalse(a)) || b == 1'))({b: 1, a: true}));

            assert(factory.toJs(parser.parseConstraint('(isNumber(b) || isFalse(a)) || b == 1'))({b: 2, a: false}));
        });
    });
});
