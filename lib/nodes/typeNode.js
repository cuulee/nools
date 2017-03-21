'use strict';

const AlphaNode = require('./alphaNode');
const Context = require('../context');

class TypeNode extends AlphaNode {
    assert(fact) {
        if (this.constraintAssert(fact.object)) {
            this.__propagate('assert', fact);
        }
    }

    modify(fact) {
        if (this.constraintAssert(fact.object)) {
            this.__propagate('modify', fact);
        }
    }

    retract(fact) {
        if (this.constraintAssert(fact.object)) {
            this.__propagate('retract', fact);
        }
    }

    toString() {
        return `TypeNode${this.__count}`;
    }

    dispose() {
        const es = this.__entrySet;
        for (let i = es.length - 1; i >= 0; i--) {
            const e = es[i];
            const outNode = e.key;
            const paths = e.value;
            outNode.dispose({paths});
        }
    }

    __propagate(method, fact) {
        const es = this.__entrySet;
        const l = es.length;
        let i = 0;
        while (i < l) {
            const e = es[i];
            const paths = e.value;
            e.key[method](new Context(fact, paths));
            i += 1;
        }
    }
}

module.exports = TypeNode;
