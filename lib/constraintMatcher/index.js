'use strict';

const lang = require('./lang');
const factory = require('./factory');
const helper = require('./helper');

module.exports = {
    equal: helper.equal,
    getIdentifiers: helper.getIdentifiers,
    getIndexableProperties: helper.getIndexableProperties,
    getMatcher: factory.getMatcher,
    getSourceMatcher: factory.getSourceMatcher,
    toJs: factory.toJs,
    toConstraints: factory.toConstraints,
};
