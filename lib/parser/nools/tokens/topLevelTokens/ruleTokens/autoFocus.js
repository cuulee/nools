'use strict';

const utils = require('../../../util');

const AUTO_FOCUS_REGEXP = /^(auto-focus|autoFocus)\s*:\s*(true|false)\s*[,;]?/;
const TRUE = 'true';

function autoFocus(src, context) {
    if (AUTO_FOCUS_REGEXP.test(src)) {
        const parts = src.match(AUTO_FOCUS_REGEXP);
        const af = parts[2];
        if (af) {
            Object.assign(context.options, {autoFocus: af === TRUE});
        } else {
            throw new Error(`Invalid auto-focus ${parts[2]}`);
        }
        return src.replace(parts[0], utils.EMPTY_STRING);
    }
    throw new Error('invalid format');
}

module.exports = {
    autoFocus,
    'auto-focus': autoFocus,
};
