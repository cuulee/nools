'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('scope option', () => {
    function isEqualTo(str, eq) {
        return str === eq;
    }

    class Count {
        constructor() {
            this.called = 0;
        }
    }

    const flow = nools.flow('scope test', (builder) => {
        builder.rule('hello rule', {scope: {isEqualTo}}, [
            ['or',
                [String, 's', "isEqualTo(s, 'hello')"],
                [String, 's', "isEqualTo(s, 'world')"],
            ],
            [Count, 'called', null],
        ], (facts) => {
            facts.called.called += 1;
        });
    });

    it("should call when a string equals 'hello'", () => {
        const called = new Count();
        return flow.getSession('world', called).match().then(() => {
            assert.equal(called.called, 1);
        });
    });

    it("should call when a string equals 'world'", () => {
        const called = new Count();
        return flow.getSession('hello', called).match().then(() => {
            assert.equal(called.called, 1);
        });
    });

    it("should not call when a string that does equal 'hello' or 'world", () => {
        const called = new Count();
        return flow.getSession('hello', 'world', 'test', called).match().then(() => {
            assert.equal(called.called, 2);
        });
    });
});
