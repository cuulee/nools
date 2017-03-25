'use strict';

const utils = require('../util');
const Parser = require('../parser');

const AUTO_FOCUS_REGEXP = /^(auto-focus|autoFocus)\s*:\s*(true|false)\s*[,;]?/;
const TRUE = 'true';

class AutoFocusParser extends Parser {
    parse() {
        const src = this.context.src;
        if (!AUTO_FOCUS_REGEXP.test(src)) {
            throw new Error(`Invalid auto-focus format in ${this.context.src}`);
        }
        const parts = src.match(AUTO_FOCUS_REGEXP);
        const autoFocus = parts[2];
        if (!autoFocus) {
            throw new Error(`Invalid auto-focus ${parts[2]}`);
        }
        this.context.options.autoFocus = autoFocus === TRUE;
        return this.context.copyWithSrc(src.replace(parts[0], utils.EMPTY_STRING));
    }
}

Parser.registerRuleParser('autoFocus', AutoFocusParser);
Parser.registerRuleParser('auto-focus', AutoFocusParser);

module.exports = AutoFocusParser;
