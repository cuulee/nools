'use strict';

const AdapterNode = require('./adapterNode');

class LeftAdapterNode extends AdapterNode {
    propagateAssert(context) {
        this.__propagate('assertLeft', context);
    }

    propagateRetract(context) {
        this.__propagate('retractLeft', context);
    }

    propagateResolve(context) {
        this.__propagate('retractResolve', context);
    }

    propagateModify(context) {
        this.__propagate('modifyLeft', context);
    }

    retractResolve(match) {
        this.__propagate('retractResolve', match);
    }

    dispose(context) {
        this.propagateDispose(context);
    }

    toString() {
        return `LeftAdapterNode ${this.__count}`;
    }
}

module.exports = LeftAdapterNode;
