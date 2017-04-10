'use strict';

let tupleId = 0;

class TupleEntry {

    constructor(val, entry, canRemove) {
        this.val = val;
        this.canRemove = canRemove;
        this.tuples = [];
        this.tupleMap = {};
        this.hashCode = tupleId;
        this.tables = {};
        this.length = 0;
        this.entry = entry;
        tupleId += 1;
    }

    addNode(node) {
        this.tuples[this.length] = node;
        this.length += 1;
        if (this.length > 1) {
            this.entry.clearCache();
        }
        return this;
    }

    removeNode(node) {
        const tuples = this.tuples;
        const index = tuples.indexOf(node);
        if (index !== -1) {
            tuples.splice(index, 1);
            this.length -= 1;
            this.entry.clearCache();
        }
        if (this.canRemove && !this.length) {
            this.entry.remove(this.val);
        }
    }
}

module.exports = TupleEntry;
