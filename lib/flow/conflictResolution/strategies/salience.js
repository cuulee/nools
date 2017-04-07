'use strict';

function salience(a, b) {
    return a.rule.priority - b.rule.priority;
}

module.exports = salience;

