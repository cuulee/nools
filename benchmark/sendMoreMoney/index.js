'use strict';

const nools = require('../../lib');
const utils = require('../utils');

const flow = nools.compile(require.resolve('./sendMoreMoney.nools'));

function benchmark() {
    return flow.getSession(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
}

module.exports = utils.runBenchmark(benchmark);
