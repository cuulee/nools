'use strict';

const Context = require('./context');

class ParserContext extends Context {
    /**
     * Context for parsing a nools file.
     *
     * @param {String} src the src to be parsed
     * @param {String} fileName The name of the file being parsed.
     * @param {Context} parent The parent context
     */
    constructor(src, fileName, parent) {
        super(src, fileName, parent);
        const prnt = this.parent || {};
        this.name = prnt.name || fileName;
        this.file = prnt.file || this.name;
        this.define = prnt.define || [];
        this.rules = prnt.rules || [];
        this.scope = prnt.scope || [];
        this.loaded = prnt.loaded || [];
    }
}

module.exports = ParserContext;
