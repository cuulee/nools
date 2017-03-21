'use strict';

const utils = require('../../../util');

const SALIENCE_REGEXP = /^(salience|priority)\s*:\s*(-?\d+)\s*[,;]?/;

function salience(src, context) {
    if (SALIENCE_REGEXP.test(src)) {
        const parts = src.match(SALIENCE_REGEXP);
        const priority = parseInt(parts[2], 10);
        if (!isNaN(priority)) {
            Object.assign(context.options, {priority});
        } else {
            throw new Error(`Invalid salience/priority ${parts[2]}`);
        }
        return src.replace(parts[0], utils.EMPTY_STRING);
    }
    throw new Error('invalid format');
}

module.exports = {
    salience,
    priority: salience,
};
