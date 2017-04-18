'use strict';

const data = require('./data');
const nools = require('../../lib');
const utils = require('../utils');

const flow = nools.compile(require.resolve('./manners.nools'));
const facts = data.load(flow);

function benchmark(type) {
    const session = flow.getSession(...utils.getSessionFacts(facts, type));
    session.assert(new (flow.getDefined('count'))({value: 1}));
    return session;
}

module.exports = utils.runBenchmark(benchmark);
