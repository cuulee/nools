'use strict';

const Memory = require('./memory');

class RightMemory extends Memory {
    getRightMemory(tuple) {
        return this.getMemory(tuple);
    }
}

module.exports = RightMemory;
