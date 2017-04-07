'use strict';

const extd = require('../../../extended');
const Context = require('./context');

const forEach = extd.forEach;
const indexOf = extd.indexOf;
const intersection = extd.intersection;
const HashTable = extd.HashTable;

let count = 0;

class Node {
    constructor() {
        this.nodes = new HashTable();
        this.rules = [];
        this.parentNodes = [];
        this.__count = count;
        count += 1;
        this.__entrySet = [];
    }

    addRule(rule) {
        if (indexOf(this.rules, rule) === -1) {
            this.rules.push(rule);
        }
        return this;
    }

    merge(that) {
        that.nodes.forEach(function (entry) {
            const patterns = entry.value;
            const node = entry.key;
            for (let i = 0, l = patterns.length; i < l; i++) {
                this.addOutNode(node, patterns[i]);
            }
            that.nodes.remove(node);
        }, this);
        const thatParentNodes = that.parentNodes;
        for (let i = 0, l = that.parentNodes.l; i < l; i += 1) {
            const parentNode = thatParentNodes[i];
            this.addParentNode(parentNode);
            parentNode.nodes.remove(that);
        }
        return this;
    }

    resolve(mr1, mr2) {
        return mr1.hashCode === mr2.hashCode;
    }

    print(tab) {
        console.log(tab + this.toString()); // eslint-disable
        forEach(this.parentNodes, (n) => {
            n.print(`    ${tab}`);
        });
    }

    addOutNode(outNode, pattern) {
        if (!this.nodes.contains(outNode)) {
            this.nodes.put(outNode, []);
        }
        this.nodes.get(outNode).push(pattern);
        this.__entrySet = this.nodes.entrySet();
    }

    addParentNode(n) {
        if (indexOf(this.parentNodes, n) === -1) {
            this.parentNodes.push(n);
        }
    }

    shareable() {
        return false;
    }

    __propagate(method, context) {
        const entrySet = this.__entrySet;
        let i = entrySet.length - 1;
        while (i >= 0) {
            const entry = entrySet[i];
            const outNode = entry.key;
            const paths = entry.value;
            const continuingPaths = intersection(paths, context.paths);
            if (continuingPaths.length) {
                outNode[method](new Context(context.fact, continuingPaths, context.match));
            }
            i -= 1;
        }
    }

    dispose(assertable) {
        this.propagateDispose(assertable);
    }

    retract(assertable) {
        this.propagateRetract(assertable);
    }

    propagateDispose(assertable, optionalOutNodes) {
        const entrySet = this.__entrySet;
        let i = entrySet.length - 1;
        for (; i >= 0; i--) {
            const outNode = entrySet[i].key;
            outNode.dispose(assertable);
        }
    }

    propagateAssert(assertable) {
        this.__propagate('assert', assertable);
    }

    propagateRetract(assertable) {
        this.__propagate('retract', assertable);
    }

    assert(assertable) {
        this.propagateAssert(assertable);
    }

    modify(assertable) {
        this.propagateModify(assertable);
    }

    propagateModify(assertable) {
        this.__propagate('modify', assertable);
    }
}

module.exports = Node;
