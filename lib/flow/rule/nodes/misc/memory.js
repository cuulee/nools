'use strict';

const getMemory = require('./helpers').getMemory;
const Table = require('./table');
const TupleEntry = require('./tupleEntry');
const plucker = require('./helpers').plucker;

let id = 0;

class MemoryNode {
    constructor(data, prev) {
        this.data = data;
        this.tuples = [];
        this.hashCode = id;
        this.prev = prev;
        this.next = null;
        id += 1;
    }
}

class Memory {

    constructor() {
        this.head = null;
        this.tail = null;
        this.indexes = [];
        this.length = 0;
        this.tables = new TupleEntry(null, new Table(), false);
    }

    push(data) {
        const tail = this.tail;
        const head = this.head;
        const node = new MemoryNode(data, tail);
        id += 1;
        if (tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!head) {
            this.head = node;
        }
        this.length += 1;
        this.__index(node);
        this.tables.addNode(node);
        return node;
    }

    remove(node) {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
        this.tables.removeNode(node);
        this.__removeFromIndex(node);
        this.length -= 1;
    }

    forEach(cb) {
        if (!this.head) {
            return;
        }
        let head = this.head;
        while (head) {
            cb(head.data);
            head = head.next;
        }
    }

    toArray() {
        return this.tables.tuples.slice();
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.clearIndexes();
    }

    clearIndexes() {
        this.tables = {};
        this.indexes.length = 0;
    }

    __index(node) {
        const data = node.data;
        const factHash = data.factHash;
        const indexes = this.indexes;
        const l = indexes.length;

        let entry = this.tables;
        let prevLookup = null;
        let i = 0;
        while (i < l) {
            const index = indexes[i];
            const val = index[2](factHash);
            const path = index[0];
            const tables = entry.tables;
            if (!(path in tables)) {
                tables[path] = new Table();
            }
            const currEntry = tables[path];
            let tuples = currEntry.get(val);
            if (!tuples) {
                tuples = new TupleEntry(val, currEntry, true);
                currEntry.set(val, tuples);
            }
            if (currEntry !== prevLookup) {
                node.tuples.push(tuples.addNode(node));
            }
            prevLookup = currEntry;
            if (index[4] === 'eq') {
                entry = tuples;
            }
            i += 1;
        }
    }

    __removeFromIndex(node) {
        const tuples = node.tuples;
        let i = tuples.length - 1;
        while (i >= 0) {
            tuples[i].removeNode(node);
            i -= 1;
        }
        node.tuples.length = 0;
    }

    getMemory(tuple) {
        let ret;
        if (!this.length) {
            ret = [];
        } else {
            ret = getMemory(this.tables, tuple.factHash, this.indexes);
        }
        return ret;
    }

    __createIndexTree() {
        const table = {};
        this.tables.tables = table;
        const indexes = this.indexes;
        table[indexes[0][0]] = new Table();
    }


    addIndex(primary, lookup, op) {
        this.indexes.push([primary, lookup, plucker(primary), plucker(lookup), op || 'eq']);
        this.indexes.sort((a, b) => {
            const aOp = a[4];
            const bOp = b[4];
            if (aOp === bOp) {
                return 0;
            } else if (aOp > bOp) {
                return 1;
            }
            return -1;
        });
        this.__createIndexTree();
    }

}

module.exports = Memory;
