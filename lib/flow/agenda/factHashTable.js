'use strict';

const LinkedList = require('../../util').LinkedList;

class FactHashTable {
    constructor() {
        this.memory = {};
        this.memoryValues = new LinkedList();
    }

    clear() {
        this.memoryValues.clear();
        this.memory = {};
    }

    remove(v) {
        const hashCode = v.hashCode;
        const memory = this.memory;
        const ret = memory[hashCode];
        if (ret) {
            this.memoryValues.remove(ret);
            delete memory[hashCode];
        }
        return ret;
    }

    insert(insert) {
        const hashCode = insert.hashCode;
        if (hashCode in this.memory) {
            throw new Error(`Activation already in agenda ${insert.rule.name} agenda`);
        }
        this.memoryValues.push((this.memory[hashCode] = insert));
    }
}

module.exports = FactHashTable;
