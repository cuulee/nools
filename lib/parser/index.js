'use strict';

const constraint = require('./constraint');
const noolParser = require('./nools');

function parseRuleSet(source, file) {
    return noolParser.parse(source, file);
}

module.exports = {
    constraint,
    parseRuleSet,
};
