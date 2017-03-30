'use strict';

const Context = require('./context');

class RuleContext extends Context {
    constructor(src, name, parent) {
        super(src, name, parent);
        this.src = src;
        this.name = name;
        const prnt = this.parent || {};
        this.options = prnt.options || {};
        this.constraints = prnt.constraints || [];
        this.action = prnt.action || "";
    }
}

module.exports = RuleContext;
