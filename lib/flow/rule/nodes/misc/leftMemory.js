'use strict';

const Memory = require('./memory');

class LeftMemory extends Memory {
    getLeftMemory(tuple) {
        return this.getMemory(tuple);
    }
}

module.exports = LeftMemory;
