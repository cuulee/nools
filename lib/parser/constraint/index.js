'use strict';

const constraintParser = require('./parser');

function parseConstraint(constraint) {
    try {
        if (typeof constraint === 'function') {
            // No parsing is needed for constraint functions
            return constraint;
        }
        return constraintParser.parse(constraint);
    } catch (e) {
        throw new Error(`Invalid constraint '${constraint}'`);
    }
}

module.exports = parseConstraint;
