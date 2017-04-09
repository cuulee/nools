'use strict';

const assert = require('assert');
const parser = require('../../../../../../lib/parser');
const matcher = require('../../../../../../lib/flow/rule/patterns/atoms/utils/matcher');

describe('atoms matcher', () => {
    describe('.createMatcher', () => {
        it('should check equality', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a == 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a eq 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: 10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: 10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a == true'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a eq true'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a == false'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a eq false'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: '10'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: '10'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a == null'))({a: null}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a ==null'))({a: null}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a eq null'))({a: null}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a == 'a'"))({a: 'b'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a eq 'a'"))({a: 'b'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: 11}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: 11}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a == false'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a eq false'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a == true'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a eq true'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a == null'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a ==null'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a eq null'))({a: false}));
        });

        it('should check strict equality', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a === 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a seq 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: 10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: 10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a === true'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a ===true'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a === false'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a ===false'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a seq false'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a === null'))({a: null}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a ===null'))({a: null}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a seq null'))({a: null}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a === 'a'"))({a: 'b'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a seq 'a'"))({a: 'b'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: 11}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: 11}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: '10'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: '10'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a === false'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a ===false'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a seq false'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a === true'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a ===true'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a seq true'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a === null'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a ===null'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a seq null'))({a: false}));
        });

        it('should check inequality', () => {
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a != 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a neq 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: 10}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: 10}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a != true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a neq true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a != false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a neq false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: '10'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: '10'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a != null'))({a: null}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=null'))({a: null}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a neq null'))({a: null}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a != 'a'"))({a: 'b'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a neq 'a'"))({a: 'b'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: 11}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: 11}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a != false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a neq false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a != true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a neq true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a != null'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=null'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a neq null'))({a: false}));
        });

        it('should check strict inequality', () => {
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a !== 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a sneq 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: 10}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: 10}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !== true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !==true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq true'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !== false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !==false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq false'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !== null'))({a: null}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !==null'))({a: null}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq null'))({a: null}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a !== 'a'"))({a: 'b'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a sneq 'a'"))({a: 'b'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: 11}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: 11}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: '10'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: '10'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !== false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !==false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq false'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !== true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !==true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq true'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !== null'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !==null'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a sneq null'))({a: false}));
        });

        it('should check gt operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a > '0'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a gt '0'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a > '0'"))({a: '0'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a gt '0'"))({a: '0'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a > 0'))({a: 1}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a gt 0'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a > 0'))({a: 0}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a gt 0'))({a: 0}));
        });

        it('should check lt operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a < 'b'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a lt 'b'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a < '0'"))({a: '0'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a lt '0'"))({a: '0'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a < 2'))({a: 1}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a lt 2'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a < 0'))({a: 0}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a lt 0'))({a: 0}));
        });

        it('should check gte operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a >= 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a gte 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a >= 'a'"))({a: '0'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a gte 'a'"))({a: '0'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a >= 1'))({a: 1}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a gte 1'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a >= 1'))({a: 0}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a gte 1'))({a: 0}));
        });

        it('should check lte operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a <= 'a'"))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a lte 'a'"))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: '0'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: '0'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a <= 1'))({a: 1}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a lte 1'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: 0}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: 0}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: -10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: -10}));
        });

        it('should check like operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /hello/'))({a: 'hello'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a like /hello/'))({a: 'hello'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /world/'))({a: 'hello'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a like /world/'))({a: 'hello'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'he/llo'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'world'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'a'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /^hello world$/'))({a: 'hello world'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a like /^hello world$/'))({a: 'hello world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a =~ /^hello world$/'))({a: 'hello world2'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a like /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check notLike operator', () => {
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /hello/'))({a: 'hello'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /hello/'))({a: 'hello'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /world/'))({a: 'hello'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /world/'))({a: 'hello'}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ && a !=~ /world/'))({a: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ && a notLike /world/'))({a: 'world'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ || a =~ /world/'))({a: 'a'}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /^hello world$/'))({a: 'hello world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /^hello world$/'))({a: 'hello world'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a !=~ /^hello world$/'))({a: 'hello world2'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a notLike /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check and operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
        });

        it('should check or operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'world'}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
        });

        it('should check with member operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a['hello'] eq a['world']"))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a[b] eq a[c]'))({a: {hello: 'hello', world: 'world'}, b: 'hello', c: 'world'}));
        });

        it('should check with in operator', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a in [1,2,3,4]'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a in ['a','b','c']"))({a: 1}));
        });

        it('should check with notIn operator', () => {
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a notIn [1,2,3,4]'))({a: 1}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a notIn ['a','b','c']"))({a: 1}));
        });

        it('should allow properties with in', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.in == 1'))({a: {in: 1}}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.innoculated == 1'))({a: {innoculated: 1}}));
        });

        it('should check with boolean associativity', () => {
            const a = {hello: 'hello', world: 'world', age: 10, name: 'bob'};
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq a.world || (a.age >= 10 && a.name eq 'bob')"))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("(a.hello eq a.world && a.age >= 10) || a.name eq 'bob'"))({a}));
        });

        it('should check with nested properties', () => {
            const a = {hello: 'hello'};
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.hello.length eq 5'))({a}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a.hello.size eq 5'))({a}));
        });

        it('should check with function', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.myFunc() eq 'hello'"))({a}));
        });

        it('should check with functions and identifier args', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.myFunc(b) eq 'hello'"))({a, b: 'world'}));
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
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.b.c.myFunc(b) eq 'hello'"))({a, b: 'world'}));
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
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should have date helpers', () => {
            const a = {myDate: new Date()};
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lte now()'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource(`a.myDate lte Date(${new Date().getFullYear()})`))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt yearsAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt yearsFromNow(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt monthsAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt monthsFromNow(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt daysAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt daysFromNow(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt hoursAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt hoursFromNow(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt minutesAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt minutesFromNow(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate gt secondsAgo(10)'))({a}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a.myDate lt secondsFromNow(10)'))({a}));
        });

        it('should create have type helpers', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isTrue(a)'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isTrue(a)'))({a: false}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isFalse(a)'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isFalse(a)'))({a: true}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isNumber(a)'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isNumber(a)'))({a: false}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isBoolean(a)'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isBoolean(a)'))({a: 1}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isDate(a)'))({a: new Date()}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isDate(a)'))({a: 1}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isRegExp(a)'))({a: /a/}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isRegExp(a)'))({a: '/a/'}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isDefined(a)'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isDefined(a)'))({a: undefined}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isUndefined(a)'))({a: undefined}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isUndefined(a)'))({a: false}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isNotNull(a)'))({a: 1}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isNotNull(a)'))({a: null}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('isEmpty(a)'))({a: {}}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('isEmpty(a)'))({a: {b: 'c'}}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('lengthOf(a, 3)'))({a: [1, 2, 3]}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('lengthOf(a, 3)'))({a: [1]}));

            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('deepEqual(a, b) && deepEqual(c,d) && deepEqual(e, f)'))({
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
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('deepEqual(a, b)'))({a: [1], b: new Date()}));
        });

        it('should check truthy statements', () => {
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a'))({a: 'a'}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a'))({a: 10}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a'))({a: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('!a'))({a: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('a && b'))({a: true, b: true}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('!(a && b)'))({a: false, b: false}));
            assert(matcher.createMatcher(parser.constraint.parseConstraintSource('!(a || b)'))({a: false, b: false}));

            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('!a'))({a: 'b'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('!a == 10'))({a: 11}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('!a == 10'))({a: '10'}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('!a'))({a: true}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('a'))({a: false}));
            assert(!matcher.createMatcher(parser.constraint.parseConstraintSource('!(a && b)'))({a: true, b: true}));
        });
    });

    describe('.getSourceMatcher', () => {
        it('should check equality', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a == 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a eq 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: 10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: 10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == true'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq true'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == false'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq false'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: '10'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: '10'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == null'))({a: null}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ==null'))({a: null}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq null'))({a: null}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a == 'a'"))({a: 'b'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a eq 'a'"))({a: 'b'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == 10'))({a: 11}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq 10'))({a: 11}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == false'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq false'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == true'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq true'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a == null'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ==null'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a eq null'))({a: false}));
        });

        it('should check strict equality', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a === 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a seq 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: 10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: 10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === true'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===true'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === false'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===false'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq false'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === null'))({a: null}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===null'))({a: null}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq null'))({a: null}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a === 'a'"))({a: 'b'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a seq 'a'"))({a: 'b'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: 11}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: 11}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === 10'))({a: '10'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq 10'))({a: '10'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === false'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===false'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq false'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === true'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===true'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq true'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a === null'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a ===null'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a seq null'))({a: false}));
        });

        it('should check inequality', () => {
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a != 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a neq 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: 10}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: 10}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: '10'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: '10'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != null'))({a: null}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=null'))({a: null}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq null'))({a: null}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a != 'a'"))({a: 'b'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a neq 'a'"))({a: 'b'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != 10'))({a: 11}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq 10'))({a: 11}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a != null'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=null'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a neq null'))({a: false}));
        });

        it('should check strict inequality', () => {
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a !== 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a sneq 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: 10}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: 10}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq true'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq false'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== null'))({a: null}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==null'))({a: null}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq null'))({a: null}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a !== 'a'"))({a: 'b'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a sneq 'a'"))({a: 'b'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: 11}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: 11}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== 10'))({a: '10'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq 10'))({a: '10'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq false'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq true'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !== null'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !==null'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a sneq null'))({a: false}));
        });

        it('should check gt operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a > '0'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a gt '0'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a > '0'"))({a: '0'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a gt '0'"))({a: '0'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a > 0'))({a: 1}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a gt 0'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a > 0'))({a: 0}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a gt 0'))({a: 0}));
        });

        it('should check lt operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a < 'b'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a lt 'b'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a < '0'"))({a: '0'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a lt '0'"))({a: '0'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a < 2'))({a: 1}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lt 2'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a < 0'))({a: 0}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lt 0'))({a: 0}));
        });

        it('should check gte operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a >= 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a gte 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a >= 'a'"))({a: '0'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a gte 'a'"))({a: '0'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a >= 1'))({a: 1}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a gte 1'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a >= 1'))({a: 0}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a gte 1'))({a: 0}));
        });

        it('should check lte operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a <= 'a'"))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a lte 'a'"))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: '0'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: '0'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a <= 1'))({a: 1}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lte 1'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: 0}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: 0}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a <= -1'))({a: -10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a lte -1'))({a: -10}));
        });

        it('should check like operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /hello/'))({a: 'hello'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /hello/'))({a: 'hello'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /world/'))({a: 'hello'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /world/'))({a: 'hello'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'he/llo'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'world'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /he\\/llo/ || a like /world/'))({a: 'a'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /^hello world$/'))({a: 'hello world'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /^hello world$/'))({a: 'hello world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a =~ /^hello world$/'))({a: 'hello world2'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a like /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check notLike operator', () => {
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /hello/'))({a: 'hello'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /hello/'))({a: 'hello'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /world/'))({a: 'hello'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /world/'))({a: 'hello'}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ || a =~ /world/'))({a: 'he/llo'}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ && a !=~ /world/'))({a: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ && a notLike /world/'))({a: 'world'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /he\\/llo/ || a =~ /world/'))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /he\\/llo/ || a =~ /world/'))({a: 'a'}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /^hello world$/'))({a: 'hello world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /^hello world$/'))({a: 'hello world'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a !=~ /^hello world$/'))({a: 'hello world2'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notLike /^hello world$/'))({a: 'hello world2'}));
        });

        it('should check and operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' and a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
        });

        it('should check or operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'world'}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 'hello' or a.world eq 'world'"))({a: {hello: 'world', world: 'hello'}}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
        });

        it('should check with member operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'hello'}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.hello eq a.world'))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a['hello'] eq a['world']"))({a: {hello: 'hello', world: 'world'}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a[b] eq a[c]'))({a: {hello: 'hello', world: 'world'}, b: 'hello', c: 'world'}));
        });

        it('should check with in operator', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a in [1,2,3,4]'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a in ['a','b','c']"))({a: 1}));
        });

        it('should check with notIn operator', () => {
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a notIn [1,2,3,4]'))({a: 1}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a notIn ['a','b','c']"))({a: 1}));
        });

        it('should allow properties with in', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.in == 1'))({a: {in: 1}}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.innoculated == 1'))({a: {innoculated: 1}}));
        });

        it('should check with boolean associativity', () => {
            const a = {hello: 'hello', world: 'world', age: 10, name: 'bob'};
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq a.world || (a.age >= 10 && a.name eq 'bob')"))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("(a.hello eq a.world && a.age >= 10) || a.name eq 'bob'"))({a}));
        });

        it('should check with nested properties', () => {
            const a = {hello: 'hello'};
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.hello.length eq 5'))({a}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.hello.size eq 5'))({a}));
        });

        it('should check with function', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.myFunc() eq 'hello world'"))({a}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.myFunc() eq 'hello'"))({a}));
        });

        it('should check with functions and identifier args', () => {
            const a = {
                hello: 'hello',
                myFunc() {
                    return `${this.hello} world`;
                },
            };
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.myFunc(b) eq 'hello'"))({a, b: 'world'}));
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
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.b.c.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.b.c.myFunc(b) eq 'hello'"))({a, b: 'world'}));
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
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.length eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello.size eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello world'"))({a, b: 'world'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource("a.hello eq 5 && a.b.c.myFunc().d.myFunc(b) eq 'hello'"))({a, b: 'world'}));
        });

        it('should have date helpers', () => {
            const a = {myDate: new Date()};
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lte now()'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource(`a.myDate lte Date(${new Date().getFullYear()})`))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt yearsAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt yearsFromNow(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt monthsAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt monthsFromNow(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt daysAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt daysFromNow(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt hoursAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt hoursFromNow(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt minutesAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt minutesFromNow(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate gt secondsAgo(10)'))({a}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a.myDate lt secondsFromNow(10)'))({a}));
        });

        it('should create have type helpers', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isTrue(a)'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isTrue(a)'))({a: false}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isFalse(a)'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isFalse(a)'))({a: true}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isNumber(a)'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isNumber(a)'))({a: false}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isBoolean(a)'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isBoolean(a)'))({a: 1}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isDate(a)'))({a: new Date()}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isDate(a)'))({a: 1}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isRegExp(a)'))({a: /a/}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isRegExp(a)'))({a: '/a/'}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isDefined(a)'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isDefined(a)'))({a: undefined}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isUndefined(a)'))({a: undefined}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isUndefined(a)'))({a: false}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isNotNull(a)'))({a: 1}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isNotNull(a)'))({a: null}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isEmpty(a)'))({a: {}}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('isEmpty(a)'))({a: {b: 'c'}}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('lengthOf(a, 3)'))({a: [1, 2, 3]}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('lengthOf(a, 3)'))({a: [1]}));

            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('deepEqual(a, b) && deepEqual(c,d) && deepEqual(e, f)'))({
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
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('deepEqual(a, b)'))({a: [1], b: new Date()}));
        });

        it('should check truthy statements', () => {
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a'))({a: 'a'}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a'))({a: 10}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a'))({a: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!a'))({a: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a && b'))({a: true, b: true}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!(a && b)'))({a: false, b: false}));
            assert(matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!(a || b)'))({a: false, b: false}));

            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!a'))({a: 'b'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!a == 10'))({a: 11}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!a == 10'))({a: '10'}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!a'))({a: true}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('a'))({a: false}));
            assert(!matcher.createSourceMatcher(parser.constraint.parseConstraintSource('!(a && b)'))({a: true, b: true}));
        });
    });

    describe('.toJs', () => {
        it('should create js equvalent expression', () => {
            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a)'))({a: false}));
            assert(!matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a)'))({a: true}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isTrue(b)'))({b: true}));
            assert(!matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isTrue(b)'))({b: false}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a) && isTrue(b)'))({a: false, b: true}));
            assert(!matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a) && isTrue(b)'))({a: false, b: false}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a) || isTrue(b)'))({a: true, b: true}));
            assert(!matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isFalse(a) || isTrue(b)'))({a: true, b: false}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isNumber(b) || isFalse(a) && b == 1'))({b: 1, a: false}));
            assert(!matcher.createMatcherFunction(parser.constraint.parseConstraintSource('isNumber(b) || isFalse(a) && b == 1'))({b: 'a', a: true}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('(isNumber(b) || isFalse(a)) && b == 1'))({b: 1, a: false}));
            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('(isNumber(b) || isFalse(a)) && b == 1'))({b: 1, a: true}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('(isNumber(b) || isFalse(a)) || b == 1'))({b: 1, a: true}));

            assert(matcher.createMatcherFunction(parser.constraint.parseConstraintSource('(isNumber(b) || isFalse(a)) || b == 1'))({b: 2, a: false}));
        });
    });
});
