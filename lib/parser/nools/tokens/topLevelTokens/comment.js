'use strict';

const utils = require('../../util');

const COMMENT_BEGIN_REGEXP = /^\/\*/;
const COMMENT_REGEXP = /\/\*.*?\*\//;

function comment(orig) {
    if (orig.match(COMMENT_BEGIN_REGEXP)) {
        // Block Comment parse
        return orig.replace(COMMENT_REGEXP, utils.EMPTY_STRING);
    }
    return orig;
}

module.exports = {
    '/': comment,
};
