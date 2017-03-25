'use strict';

const constraintParser = require('./constraint/parser');
const noolParser = require('./nools');

function parseConstraint(expression) {
    try {
        return constraintParser.parse(expression);
    } catch (e) {
        throw new Error(`Invalid expression '${expression}'`);
    }
}

function parseRuleSet(source, file) {
    return noolParser.parse(source, file);
}

module.exports = {
    parseConstraint,
    parseRuleSet
};
