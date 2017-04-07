'use strict';

const parseConstraint = require('./constraint');
const noolParser = require('./nools');

function parseRuleSet(source, file) {
    return noolParser.parse(source, file);
}

module.exports = {
    parseConstraint,
    parseRuleSet,
};
