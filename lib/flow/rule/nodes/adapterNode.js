'use strict';

const Node = require('./node');
const intersection = require('../../../extended').intersection;

class AdapterNode extends Node {
    __propagatePaths(method, context) {
        const entrySet = this.__entrySet;
        let i = entrySet.length - 1;
        while (i > -1) {
            const entry = entrySet[i];
            const outNode = entry.key;
            const paths = entry.value;
            const continuingPaths = intersection(paths, context.paths);
            if (continuingPaths.length) {
                outNode[method](context.clone(null, continuingPaths, null));
            }
            i -= 1;
        }
    }

    __propagateNoPaths(method, context) {
        const entrySet = this.__entrySet;
        let i = entrySet.length - 1;
        while (i > -1) {
            entrySet[i].key[method](context);
            i -= 1;
        }
    }

    __propagate(method, context) {
        if (context.paths) {
            this.__propagatePaths(method, context);
        } else {
            this.__propagateNoPaths(method, context);
        }
    }
}

module.exports = AdapterNode;
