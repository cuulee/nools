'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 81', () => {
    class ActualWeightDomain {
        constructor(values) {
            this.values = values;
        }
    }

    class ActualWeightEnteredValue {
        constructor(value) {
            this.value = value;
        }
    }

    class ActualWeightValue {

    }

    const src = `rule CheckAndAssertActualWeight {
             when {
                actualWeight_domain: ActualWeightDomain {values: _domainValues};
                actualWeight_EnteredValue: ActualWeightEnteredValue
                (
                    actualWeight_EnteredValue.value >= _domainValues[0] &&
                        actualWeight_EnteredValue.value <= _domainValues[1]
                ) {value : _entered};
            }
            then {
                assert( new ActualWeightValue({value:_entered}) );
            }
        }`;
    const flow = nools.compile(src, {
        name: 'issue81',
        define: {
            ActualWeightDomain,
            ActualWeightEnteredValue,
            ActualWeightValue,
        },
    });

    it('should allow array references when compiling rules', () => {
        const fired = [];
        let session = flow.getSession(new ActualWeightEnteredValue(1), new ActualWeightDomain([1, 2])).on('fire', (name) => {
            fired.push(name);
        });
        return session.match().then(() => {
            assert.deepEqual(fired, ['CheckAndAssertActualWeight']);
            fired.length = 0;
            session = flow.getSession(new ActualWeightEnteredValue(5), new ActualWeightDomain([1, 2])).on('fire', (name) => {
                fired.push(name);
            });
            return session.match().then(() => {
                assert.deepEqual(fired, []);
            });
        });
    });
});
