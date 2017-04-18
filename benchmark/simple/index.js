'use strict';

const nools = require('../../lib');
const utils = require('../utils');


function createFactClass() {
    return class {
        constructor(value) {
            this.name = value;
        }
    };
}

function createFlow(count) {
    const defined = {};
    const constraints = [];
    for (let i = 0; i < count; i++) {
        constraints.push([defined[`Object${i}`] = createFactClass(), `m${i}`]);
    }
    const flow = nools.flow('Performance Test', (builder) => {
        let execCount = 0;
        // find any message that starts with hello
        builder.rule('Rule1', constraints, () => {
            execCount += 1;
            console.log(`execCount: ${execCount}`);
        });
    });
    return {flow, defined};
}

function createSession(flow, defined, count) {
    const session = flow.getSession();
    for (let j = 0; j < count; j++) {
        for (let k = 0; k < count; k++) {
            session.assert(new defined[`Object${k}`](`${j} ${k}`));
        }
    }
    return session;
}

function benchmark(tetration) {
    /* eslint no-restricted-properties: 0*/
    if (!tetration) {
        console.error(`tetration is required (e.g. tetration = 5, execCount= Math.pow(5, 5) = ${Math.pow(5, 5)})!`);
        process.exit(1);
    }
    const count = parseInt(tetration, 10);
    const flowAndDefined = createFlow(count);
    return createSession(flowAndDefined.flow, flowAndDefined.defined, count);
}

module.exports = utils.runBenchmark(benchmark);
