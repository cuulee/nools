'use strict';

class Context {

    constructor(src, name, parent) {
        this.src = src;
        this.name = name;
        this.parent = parent;
    }

    copyWithSrc(src) {
        // const ThisContext = this.constructor;
        return new this.constructor(src, this.name, this);
        // throw new Error(`${this.constructor} copyWithSrc not implemented`);
    }
}

module.exports = Context;
