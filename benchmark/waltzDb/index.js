'use strict';

const data = require('./data');
const nools = require('../../lib');
const utils = require('../utils');

const flow = nools.compile(require.resolve('./waltzDb.nools'))
    .conflictResolution(['salience', 'factRecency', 'activationRecency']);
const Stage = flow.getDefined('stage');

const facts = data.load(flow);


function benchmark(type) {
    const session = flow.getSession(...utils.getSessionFacts(facts, type));
    session.assert(new Stage({value: 'DUPLICATE'}));
    return session;
}

module.exports = utils.runBenchmark(benchmark);

