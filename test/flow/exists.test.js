'use strict';

const assert = require('assert');
const nools = require('../../');

class Count {
    constructor() {
        this.called = 0;
    }
}

describe('exists rule', () => {
    const called = new Count();

    describe('fact assertion', () => {
        const existsFlow = nools.flow('exists flow', (builder) => {
            builder.rule('exists 1', [
                ['exists', String, 's1'],
                [Count, 'c'],
            ], (facts) => {
                facts.c.called += 1;
            });
        });
        beforeEach(() => {
            called.called = 0;
        });

        it('should only activate once', () => {
            return existsFlow.getSession(called, 'hello', 'world', 'hello world').match(() => {
                assert.equal(called.called, 1);
            });
        });

        it('should not activate once if the fact does not exists', () => {
            return existsFlow.getSession(called).match(() => {
                assert.equal(called.called, 0);
            });
        });
    });

    describe('fact retraction', () => {
        class Person {
            constructor(name) {
                this.name = name;
            }
        }

        class Str {
            constructor(val) {
                this.val = val;
            }
        }

        const existsRetractFlow = nools.flow('exists retractions flow', (builder) => {
            builder.rule('exists 1', [
                [Person, 'p'],
                ['exists', Str, 's1', 's1.val == p.name'],
                [Count, 'c'],
            ], (facts) => {
                facts.c.called += 1;
            });
        });

        beforeEach(() => {
            called.called = 0;
        });

        it('should should handle fact retractions properly', () => {
            const session = existsRetractFlow.getSession(called);
            const activationTree = session.agenda.rules['exists 1'].tree;
            const str1 = new Str('Bob Yuko');
            const str2 = new Str('Bob Yukon');
            const person = new Person('Bob Yukon');
            session.assert(person);
            assert(activationTree.toArray().length === 0);
            session.assert(str1);
            assert(activationTree.toArray().length === 0);
            session.retract(str1);
            assert(activationTree.toArray().length === 0);
            session.assert(str2);
            assert(activationTree.toArray().length === 1);
            session.retract(str2);
            assert(activationTree.toArray().length === 0);
            session.assert(str2);
            assert(activationTree.toArray().length === 1);
            session.assert(str1);
            assert(activationTree.toArray().length === 1);
            session.retract(str1);
            assert(activationTree.toArray().length === 1);
            session.retract(str2);
            assert(activationTree.toArray().length === 0);
            session.assert(str2);
            assert(activationTree.toArray().length === 1);
            session.retract(person);
            assert(activationTree.toArray().length === 0);
        });
    });

    describe('fact modification', () => {
        class Person {
            constructor(name) {
                this.name = name;
            }
        }

        class Str {
            constructor(val) {
                this.val = val;
            }
        }

        const existsModifivationFlow = nools.flow('exists modification flow', (builder) => {
            builder.rule('exists 1', [
                [Person, 'p'],
                ['exists', Str, 's1', 's1.val == p.name'],
                [Count, 'c'],
            ], (facts) => {
                facts.c.called += 1;
            });
        });

        beforeEach(() => {
            called.called = 0;
        });

        it('should should handle fact modification properly', () => {
            const session = existsModifivationFlow.getSession(called);
            const activationTree = session.agenda.rules['exists 1'].tree;
            const str1 = new Str('Bob Yuko');
            const str2 = new Str('Bobby Yukon');
            const person = new Person('Bob Yukon');
            session.assert(person);
            assert(activationTree.toArray().length === 0);
            session.assert(str1);
            assert(activationTree.toArray().length === 0);
            session.modify(str1, (s) => {
                s.val = person.name;
            });
            assert(activationTree.toArray().length === 1);
            session.modify(person, (p) => {
                p.name = 'Bobby Yukon';
            });
            assert(activationTree.toArray().length === 0);
            session.assert(str2);
            assert(activationTree.toArray().length === 1);
        });
    });

    describe('with from modifier', () => {
        class Person {
            constructor(zipcodes) {
                this.zipcodes = zipcodes;
            }
        }

        const existsFromFlow = nools.flow('exists from flow', (builder) => {
            builder.rule('exists 1', [
                [Person, 'p'],
                ['exists', Number, 'zip', 'zip == 11111', 'from p.zipcodes'],
                [Count, 'c'],
            ], (facts) => {
                facts.c.called += 1;
            });
        });

        beforeEach(() => {
            called.called = 0;
        });

        describe('assert', () => {
            it('should should handle fact assertion properly', () => {
                const session = existsFromFlow.getSession(called);
                const activationTree = session.agenda.rules['exists 1'].tree;
                const person1 = new Person([88888, 99999, 77777]);
                const person2 = new Person([66666, 55555, 44444]);
                const person3 = new Person([33333, 22222, 11111]);
                const person4 = new Person([11111, 11111, 11111]);
                session.assert(person1);
                assert(activationTree.toArray().length === 0);
                session.assert(person2);
                assert(activationTree.toArray().length === 0);
                session.assert(person3);
                assert(activationTree.toArray().length === 1);
                session.assert(person4);
                assert(activationTree.toArray().length === 2);
            });
        });

        describe('retract', () => {
            it('should should handle fact retraction properly', () => {
                const session = existsFromFlow.getSession(called);
                const activationTree = session.agenda.rules['exists 1'].tree;
                const person1 = new Person([88888, 99999, 77777]);
                const person2 = new Person([66666, 55555, 44444]);
                const person3 = new Person([33333, 22222, 11111]);
                const person4 = new Person([11111, 11111, 11111]);
                session.assert(person1);
                assert(activationTree.toArray().length === 0);
                session.assert(person2);
                assert(activationTree.toArray().length === 0);
                session.assert(person3);
                assert(activationTree.toArray().length === 1);
                session.assert(person4);
                assert(activationTree.toArray().length === 2);
                session.retract(person3);
                assert(activationTree.toArray().length === 1);
                session.retract(person4);
                assert(activationTree.toArray().length === 0);
            });
        });

        describe('modify', () => {
            it('should should handle fact modification properly', () => {
                const session = existsFromFlow.getSession(called);
                let activationTree = session.agenda.rules['exists 1'].tree;
                const person1 = new Person([88888, 99999, 77777]);
                const person2 = new Person([66666, 55555, 44444]);
                const person3 = new Person([33333, 22222, 11111]);
                const person4 = new Person([11111, 11111, 11111]);
                session.assert(person1);
                assert(activationTree.toArray().length === 0);
                session.assert(person2);
                assert(activationTree.toArray().length === 0);
                session.assert(person3);
                assert(activationTree.toArray().length === 1);
                session.assert(person4);
                assert(activationTree.toArray().length === 2);
                session.modify(person3, (p) => {
                    p.zipcodes = [11111, 11111];
                });
                assert(activationTree.toArray().length === 2);
                session.modify(person3, (p) => {
                    p.zipcodes = [88888];
                });
                assert(activationTree.toArray().length === 1);
                session.modify(person4, (p) => {
                    p.zipcodes = [88888];
                });
                assert(activationTree.toArray().length === 0);
            });
        });
    });
});
