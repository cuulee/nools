'use strict';

const assert = require('assert');
const dateExtended = require('date-extended');
const nools = require('../../../lib');

describe('from condition', () => {
    describe('with non array properties', () => {
        let called = 0;
        class Address {
            constructor(zip) {
                this.zipcode = zip;
            }
        }
        class Person {
            constructor(first, last, address) {
                this.firstName = first;
                this.lastName = last;
                this.address = address;
            }
        }

        const flow = nools.flow('from flow', (builder) => {
            builder.rule('from rule 1', [
                [Person, 'p'],
                [Address, 'a', 'a.zipcode == 88847', 'from p.address'],
                [String, 'first', "first == 'bob'", 'from p.firstName'],
                [String, 'last', "last == 'yukon'", 'from p.lastName'],
            ], (facts) => {
                assert.equal(facts.a, facts.p.address);
                assert.equal(facts.a.zipcode, 88847);
                assert.equal(facts.first, 'bob');
                assert.equal(facts.last, 'yukon');
                called += 1;
            });

            builder.rule('from rule 2', [
                [Person, 'p'],
                [Address, 'a', 'a.zipcode == 88845', 'from p.address'],
                [String, 'first', "first == 'bob'", 'from p.firstName'],
                [String, 'last', "last == 'yukon'", 'from p.lastName'],
            ], (facts) => {
                assert.equal(facts.a, facts.p.address);
                assert.equal(facts.a.zipcode, 88845);
                assert.equal(facts.first, 'bob');
                assert.equal(facts.last, 'yukon');
                called += 1;
            });

            builder.rule('from rule 3', [
                [Person, 'p'],
                [Address, 'a', 'a.zipcode == 88847', 'from p.address'],
                [String, 'first', "first == 'sally'", 'from p.firstName'],
                [String, 'last', "last == 'yukon'", 'from p.lastName'],
            ], (facts) => {
                assert.equal(facts.a, facts.p.address);
                assert.equal(facts.a.zipcode, 88847);
                assert.equal(facts.first, 'sally');
                assert.equal(facts.last, 'yukon');
                called += 1;
            });

            builder.rule('from rule 4', [
                [Person, 'p'],
                [Address, 'a', 'a.zipcode == 88845', 'from p.address'],
                [String, 'first', "first == 'sally'", 'from p.firstName'],
                [String, 'last', "last == 'yukons'", 'from p.lastName'],
            ], (facts) => {
                assert.equal(facts.a, facts.p.address);
                assert.equal(facts.a.zipcode, 88845);
                assert.equal(facts.first, 'sally');
                assert.equal(facts.last, 'yukons');
                called += 1;
            });
        });

        it('should create the proper match contexts', () => {
            const session = flow.getSession();
            session.assert(new Person('bob', 'yukon', new Address(88847)));
            session.assert(new Person('sally', 'yukons', new Address(88847)));
            return session.match().then(() => {
                assert.equal(called, 1);
            });
        });

        it('should propagate modified facts properly', () => {
            const fired = [];
            const session = flow.getSession()
                .on('fire', (name) => {
                    fired.push(name);
                });
            const person = new Person('bob', 'yukon', new Address(88847));
            session.assert(person);
            return session.match().then(() => {
                assert.deepEqual(fired, ['from rule 1']);
                fired.length = 0;
                session.modify(person, (p) => {
                    p.address = new Address(88845);
                });
                return session.match().then(() => {
                    assert.deepEqual(fired, ['from rule 2']);
                    fired.length = 0;
                    session.modify(person, (p) => {
                        p.address = new Address(88847);
                        p.firstName = 'sally';
                    });
                    return session.match().then(() => {
                        assert.deepEqual(fired, ['from rule 3']);
                        fired.length = 0;
                        session.modify(person, (p) => {
                            p.address = new Address(88845);
                            p.lastName = 'yukons';
                        });
                        return session.match().then(() => {
                            assert.deepEqual(fired, ['from rule 4']);
                            fired.length = 0;
                        });
                    });
                });
            });
        });

        it('should retract facts properly', () => {
            const session = flow.getSession();
            const p = new Person('bob', 'yukon', new Address(88847));
            session.assert(p);
            assert.equal(session.agenda.peek().name, 'from rule 1');
            session.retract(p);
            assert(session.agenda.isEmpty());
        });
    });

    describe('with js source', () => {
        let called = 0;

        class MyValue {
            constructor(value) {
                this.value = value;
            }
        }

        const flow = nools.flow('from flow js source', (builder) => {
            builder.rule('from rule 1', [
                [MyValue, 'n1'],
                [Number, 'n2', 'n1.value == n2', 'from [1,2,3,4,5]'],
            ], (facts) => {
                assert.equal(facts.n1.value, facts.n2);
                assert([1, 2, 3, 4, 5].indexOf(facts.n2) !== -1);
                called += 1;
            });

            builder.rule('from rule 2', [
                [MyValue, 'n1'],
                [String, 'n2', 'n1.value == n2', "from ['a' ,'b', 'c', 'd', 'e']"],
            ], (facts) => {
                assert.equal(facts.n1.value, facts.n2);
                assert(['a', 'b', 'c', 'd', 'e', 'f'].indexOf(facts.n2) !== -1);
                called += 1;
            });

            builder.rule('from rule 3 with function', [
                [MyValue, 'n1', 'isDate(n1.value)'],
                [Date, 'n2', 'dateCmp(n1.value, n2)', 'from daysFromNow(1)'],
            ], (facts) => {
                assert(facts.n1.value instanceof Date);
                assert(facts.n2 instanceof Date);
                called += 1;
            });

            builder.rule('from rule 4 with scope function', {
                scope: {
                    myArr() {
                        return ['f', 'g', 'h', 'i', 'j'];
                    },
                },
            }, [
                [MyValue, 'n1'],
                [String, 'n2', 'n1.value == n2', 'from myArr()'],
            ], (facts) => {
                assert.equal(facts.n1.value, facts.n2);
                assert(['f', 'g', 'h', 'i', 'j'].indexOf(facts.n2) !== -1);
                called += 1;
            });
        });

        it('should create the proper match contexts', () => {
            const session = flow.getSession(
                new MyValue(1),
                new MyValue(2),
                new MyValue(3),
                new MyValue(4),
                new MyValue(5),
                new MyValue('a'),
                new MyValue('b'),
                new MyValue('c'),
                new MyValue('d'),
                new MyValue('e'),
                new MyValue(dateExtended.daysFromNow(1)),
                new MyValue('f'),
                new MyValue('g'),
                new MyValue('h'),
                new MyValue('i'),
                new MyValue('j'));
            return session.match().then(() => {
                assert.equal(called, 16);
            });
        });

        it('should propagate modified facts properly', () => {
            const fired = [];
            const session = flow.getSession()
                .on('fire', (name) => {
                    fired.push(name);
                });
            const myValue = new MyValue(1);
            session.assert(myValue);
            return session.match().then(() => {
                assert.deepEqual(fired, ['from rule 1']);
                fired.length = 0;
                session.modify(myValue, (v) => {
                    v.value = 'a';
                });
                return session.match().then(() => {
                    assert.deepEqual(fired, ['from rule 2']);
                    fired.length = 0;
                    session.modify(myValue, (v) => {
                        v.value = 1;
                    });
                });
            });
        });
    });

    describe('with array properties', () => {
        let called = 0;
        class Person {
            constructor(first, last, friends) {
                this.firstName = first;
                this.lastName = last;
                this.friends = friends || [];
            }
        }

        const flow = nools.flow('from flow with arrays', (builder) => {
            builder.rule('from rule 1', [
                [Person, 'p'],
                [Person, 'friend', 'friend.firstName != p.firstName', 'from p.friends'],
                [String, 'first', 'first =~ /^a/', 'from friend.firstName'],
            ], (facts) => {
                assert(/^a/.test(facts.first));
                called += 1;
            });

            builder.rule('from rule 2', [
                [Person, 'p'],
                [Person, 'friend', 'friend.firstName != p.firstName', 'from p.friends'],
                [String, 'first', 'first =~ /^b/', 'from friend.firstName'],
            ], (facts) => {
                assert(/^b/.test(facts.first));
                called += 1;
            });
        });

        it('should create all cross product matches', () => {
            const fired = [];
            const names = [];
            const session = flow.getSession()
                .on('fire', (name, facts) => {
                    if (facts.first.match(/^b/)) {
                        assert.equal(name, 'from rule 2');
                    } else {
                        assert.equal(name, 'from rule 1');
                    }
                    names.push([facts.p.firstName, facts.first]);
                    fired.push(name);
                });
            const persons = [
                new Person('bob', 'yukon'),
                new Person('andy', 'yukon'),
                new Person('andrew', 'yukon'),
                new Person('billy', 'yukon'),
                new Person('sally', 'yukon'),
            ];
            // create graph
            for (let i = 0, l = persons.length; i < l; i++) {
                const p = persons[i];
                for (let j = 0, l2 = persons.length; j < l2; j++) {
                    const f = persons[j];
                    if (f !== p) {
                        p.friends.push(f);
                    }
                }
                session.assert(p);
            }
            return session.match().then(() => {
                assert.equal(called, 16);
                assert.deepEqual(fired, [
                    'from rule 1',
                    'from rule 1',
                    'from rule 2',
                    'from rule 2',
                    'from rule 1',
                    'from rule 1',
                    'from rule 2',
                    'from rule 1',
                    'from rule 2',
                    'from rule 2',
                    'from rule 1',
                    'from rule 2',
                    'from rule 2',
                    'from rule 1',
                    'from rule 1',
                    'from rule 2',
                ]);
                fired.length = 0;
                session.modify(persons[0], (p) => {
                    p.firstName = 'craig';
                });
                session.modify(persons[1], (p) => {
                    p.firstName = 'sally';
                });
                session.modify(persons[2], (p) => {
                    p.firstName = 'thede';
                });
                session.modify(persons[3], (p) => {
                    p.firstName = 'jake';
                });
                session.modify(persons[4], (p) => {
                    p.firstName = 'john';
                });
                return session.match().then(() => {
                    assert(fired.length === 0);
                    fired.length = 0;
                    names.length = 0;
                    session.modify(persons[0], (p) => {
                        p.firstName = 'bob';
                    });
                    session.modify(persons[1], (p) => {
                        p.firstName = 'bobby';
                    });
                    session.modify(persons[2], (p) => {
                        p.firstName = 'billy';
                    });
                    session.modify(persons[3], (p) => {
                        p.firstName = 'brian';
                    });
                    session.modify(persons[4], (p) => {
                        p.firstName = 'bryan';
                    });
                    return session.match().then(() => {
                        names.sort((a, b) => {
                            if (a[0] === b[0]) {
                                if (a[1] === b[1]) {
                                    return 0;
                                } else if (a[1] > b[1]) {
                                    return 1;
                                }
                            } else if (a[0] > b[0]) {
                                return 1;
                            }
                            return -1;
                        });
                        assert.deepEqual(names, [
                            ['billy', 'bob'],
                            ['billy', 'bobby'],
                            ['billy', 'brian'],
                            ['billy', 'bryan'],
                            ['bob', 'billy'],
                            ['bob', 'bobby'],
                            ['bob', 'brian'],
                            ['bob', 'bryan'],

                            ['bobby', 'billy'],
                            ['bobby', 'bob'],
                            ['bobby', 'brian'],
                            ['bobby', 'bryan'],

                            ['brian', 'billy'],
                            ['brian', 'bob'],
                            ['brian', 'bobby'],
                            ['brian', 'bryan'],

                            ['bryan', 'billy'],
                            ['bryan', 'bob'],
                            ['bryan', 'bobby'],
                            ['bryan', 'brian'],
                        ]);
                        assert(fired.length === 20);
                    });
                });
            });
        });

        it('should retract all cross product matches', () => {
            const session = flow.getSession();
            const persons = [
                new Person('bob', 'yukon'),
                new Person('andy', 'yukon'),
                new Person('andrew', 'yukon'),
                new Person('billy', 'yukon'),
                new Person('sally', 'yukon'),
            ];
            // create graph
            for (let i = 0, l = persons.length; i < l; i++) {
                const p = persons[i];
                for (let j = 0, l2 = persons.length; j < l2; j++) {
                    const f = persons[j];
                    if (f !== p) {
                        p.friends.push(f);
                    }
                }
                session.assert(p);
            }
            assert.equal(session.agenda.getFocusedAgenda().toArray().length, 16);
            for (let i = 0, l = persons.length; i < l; i++) {
                session.retract(persons[i]);
            }
            assert.equal(session.agenda.getFocusedAgenda().toArray().length, 0);
        });
    });

    describe('with not node', () => {
        let called1 = 0;
        let called2 = 0;
        class Person {
            constructor(first, last, friends) {
                this.firstName = first;
                this.lastName = last;
                this.friends = friends || [];
            }
        }

        const flow = nools.flow('from flow with from and not', (builder) => {
            builder.rule('from not rule 1', [
                [Person, 'p'],
                ['not', Person, 'friend', 'p != friend && friend.lastName != p.lastName', 'from p.friends'],
            ], (facts) => {
                assert(facts.friend === undefined);
                called1 += 1;
            });

            builder.rule('from not rule 2', [
                [Person, 'p'],
                ['not', Person, 'friend', 'p != friend && friend.lastName == p.lastName', 'from p.friends'],
            ], (facts) => {
                assert(facts.friend === undefined);
                called2 += 1;
            });
        });

        it('should only fullfill if all facts evaluate to false', () => {
            const session = flow.getSession();
            const persons = [
                new Person('bob', 'yukon'),
                new Person('andy', 'yukon'),
                new Person('andrew', 'yukon'),
                new Person('billy', 'yukon'),
                new Person('sally', 'yukon'),
            ];
            // create graph
            for (let i = 0, l = persons.length; i < l; i++) {
                const p = persons[i];
                for (let j = 0, l2 = persons.length; j < l2; j++) {
                    const f = persons[j];
                    p.friends.push(f);
                }
                session.assert(p);
            }
            return session.match().then(() => {
                assert.equal(called1, 5);
                assert.equal(called2, 0);
                called1 = 0;
                called2 = 0;
                session.modify(persons[0], (p) => {
                    p.lastName = 'yukon';
                });
                session.modify(persons[1], (p) => {
                    p.lastName = 'yuko';
                });
                session.modify(persons[2], (p) => {
                    p.lastName = 'yuk';
                });
                session.modify(persons[3], (p) => {
                    p.lastName = 'yu';
                });
                session.modify(persons[4], (p) => {
                    p.lastName = 'y';
                });

                return session.match().then(() => {
                    assert.equal(called1, 0);
                    assert.equal(called2, 5);
                    called1 = 0;
                    called2 = 0;
                    session.modify(persons[0], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[1], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[2], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[3], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[4], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[0], (p) => {
                        p.lastName = 'yukon';
                    });
                    session.modify(persons[1], (p) => {
                        p.lastName = 'yuko';
                    });
                    session.modify(persons[2], (p) => {
                        p.lastName = 'yuk';
                    });
                    session.modify(persons[3], (p) => {
                        p.lastName = 'yu';
                    });
                    session.modify(persons[4], (p) => {
                        p.lastName = 'y';
                    });
                    return session.match().then(() => {
                        assert.equal(called1, 0);
                        assert.equal(called2, 5);
                    });
                });
            });
        });

        it('should only fullfill if all facts evaluate to false', () => {
            called1 = 0;
            called2 = 0;
            const session = flow.getSession();
            const persons = [
                new Person('bob', 'yukon'),
                new Person('andy', 'yukon'),
                new Person('andrew', 'yukon'),
                new Person('billy', 'yukon'),
                new Person('sally', 'yukon'),
                new Person('sally', 'yukons'),
            ];
            // create graph
            for (let i = 0, l = persons.length; i < l; i++) {
                const p = persons[i];
                for (let j = 0, l2 = persons.length; j < l2; j++) {
                    p.friends.push(persons[j]);
                }
                session.assert(p);
            }
            return session.match().then(() => {
                assert.equal(called1, 0);
                assert.equal(called2, 1);
            });
        });
    });
});
