'use strict';

const AdapterNode = require('./adapterNode');

class RightAdapterNode extends AdapterNode {
    retractResolve(match) {
        this.__propagate('retractResolve', match);
    }

    dispose(context) {
        this.propagateDispose(context);
    }

    propagateAssert(context) {
        this.__propagate('assertRight', context);
    }

    propagateRetract(context) {
        this.__propagate('retractRight', context);
    }

    propagateResolve(context) {
        this.__propagate('retractResolve', context);
    }

    propagateModify(context) {
        this.__propagate('modifyRight', context);
    }

    toString() {
        return `RightAdapterNode ${this.__count}`;
    }
}

module.exports = RightAdapterNode;
