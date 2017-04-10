'use strict';

const extd = require('../../../../extended');

const pPush = Array.prototype.push;
const HashTable = extd.HashTable;
const AVLTree = extd.AVLTree;

function compare(a, b) {
    /* eslint eqeqeq: 0 */
    const aKey = a.key;
    const bKey = b.key;
    if (aKey == bKey) {
        return 0;
    } else if (aKey > bKey) {
        return 1;
    }
    return -1;
}

function compareGT(v1, v2) {
    return compare(v1, v2) === 1;
}
function compareGTE(v1, v2) {
    return compare(v1, v2) !== -1;
}

function compareLT(v1, v2) {
    return compare(v1, v2) === -1;
}
function compareLTE(v1, v2) {
    return compare(v1, v2) !== 1;
}

const STACK = [];
const VALUE = {key: null};
function traverseInOrder(tree, key, comparator) {
    VALUE.key = key;
    const ret = [];
    let i = 0;
    let current = tree.__root;
    let shouldLoop = true;
    while (shouldLoop) {
        if (current) {
            current = (STACK[i] = current).left;
            i += 1;
        } else if (i > 0) {
            i -= 1;
            const v = (current = STACK[i]).data;
            if (comparator(v, VALUE)) {
                pPush.apply(ret, v.value.tuples);
                current = current.right;
            } else {
                shouldLoop = false;
            }
        } else {
            shouldLoop = false;
        }
    }
    STACK.length = 0;
    return ret;
}

function traverseReverseOrder(tree, key, comparator) {
    VALUE.key = key;
    const ret = [];
    let i = 0;
    let current = tree.__root;
    let shouldLoop = true;
    while (shouldLoop) {
        if (current) {
            current = (STACK[i] = current).right;
            i += 1;
        } else if (i > 0) {
            i -= 1;
            const v = (current = STACK[i]).data;
            if (comparator(v, VALUE)) {
                pPush.apply(ret, v.value.tuples);
                current = current.left;
            } else {
                shouldLoop = false;
            }
        } else {
            shouldLoop = false;
        }
    }
    STACK.length = 0;
    return ret;
}

const Table = AVLTree.extend({
    instance: {

        constructor() {
            this._super([{compare}]);
            this.gtCache = new HashTable();
            this.gteCache = new HashTable();
            this.ltCache = new HashTable();
            this.lteCache = new HashTable();
            this.hasGTCache = false;
            this.hasGTECache = false;
            this.hasLTCache = false;
            this.hasLTECache = false;
        },

        clearCache() {
            if (this.hasGTCache && this.gtCache.clear()) {
                this.hasGTCache = false;
            }
            if (this.hasGTECache && this.gteCache.clear()) {
                this.hasGTECache = false;
            }
            if (this.hasLTCache && this.ltCache.clear()) {
                this.hasLTCache = false;
            }
            if (this.hasLTECache && this.lteCache.clear()) {
                this.hasLTECache = false;
            }
        },

        contains(key) {
            return this._super([{key}]);
        },

        set(key, value) {
            this.insert({key, value});
            this.clearCache();
        },

        get(key) {
            const ret = this.find({key});
            return ret && ret.value;
        },

        remove(key) {
            this.clearCache();
            return this._super([{key}]);
        },

        findGT(key) {
            let ret = this.gtCache.get(key);
            if (!ret) {
                this.hasGTCache = true;
                this.gtCache.put(key, (ret = traverseReverseOrder(this, key, compareGT)));
            }
            return ret;
        },

        findGTE(key) {
            let ret = this.gteCache.get(key);
            if (!ret) {
                this.hasGTECache = true;
                this.gteCache.put(key, (ret = traverseReverseOrder(this, key, compareGTE)));
            }
            return ret;
        },

        findLT(key) {
            let ret = this.ltCache.get(key);
            if (!ret) {
                this.hasLTCache = true;
                this.ltCache.put(key, (ret = traverseInOrder(this, key, compareLT)));
            }
            return ret;
        },

        findLTE(key) {
            let ret = this.lteCache.get(key);
            if (!ret) {
                this.hasLTECache = true;
                this.lteCache.put(key, (ret = traverseInOrder(this, key, compareLTE)));
            }
            return ret;
        },

    },
});

module.exports = Table;
