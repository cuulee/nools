'use strict';

const activationRecency = require('./activationRecency');
const bucketCounter = require('./bucketCounter');
const factRecency = require('./factRecency');
const salience = require('./salience');

module.exports = {
    salience,
    bucketCounter,
    factRecency,
    activationRecency,
};
