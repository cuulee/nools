'use strict';

const _ = require('lodash');
const HashTable = require('ht');
const Context = require('./context');

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
        if (this.rules.indexOf(rule) === -1) {
            this.rules.push(rule);
        }
        return this;
    }

    merge(that) {
        that.nodes.forEach((entry) => {
            const patterns = entry.value;
            const node = entry.key;
            patterns.forEach(pattern => this.addOutNode(node, pattern));
            that.nodes.remove(node);
        });
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
        console.log(tab + this.toString()); // eslint-disable-line
        this.parentNodes.forEach((n) => {
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
        if (this.parentNodes.indexOf(n) === -1) {
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
            const continuingPaths = _.intersection(paths, context.paths);
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

    propagateDispose(assertable) {
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
