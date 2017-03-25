'use strict';

const utils = require('./util');
const Parser = require('./parser');

const COMMENT_BEGIN_REGEXP = /^\/\*/;
const COMMENT_REGEXP = /\/\*.*?\*\//;

class CommentParser extends Parser {
    parse() {
        const src = this.context.src;
        if (!src.match(COMMENT_BEGIN_REGEXP)) {
            // Block Comment parse
            return this.context.copyWithSrc(src.replace(COMMENT_REGEXP, utils.EMPTY_STRING));
        }
        return this.context;
    }
}

Parser.registerTopLevelParser('/', CommentParser);

module.exports = CommentParser;
