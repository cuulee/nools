'use strict';

const AlphaNode = require('./alphaNode');

class AliasNode extends AlphaNode {
    constructor(constraint) {
        super(constraint);
        this.alias = this.constraint.get('alias');
    }

    toString() {
        return `AliasNode${this.__count}`;
    }

    assert(context) {
        return this.__propagate('assert', context.set(this.alias, context.fact.object));
    }

    modify(context) {
        return this.__propagate('modify', context.set(this.alias, context.fact.object));
    }

    retract(context) {
        return this.__propagate('retract', context.set(this.alias, context.fact.object));
    }

    equal(other) {
        return other instanceof this.constructor && this.alias === other.alias;
    }
}

module.exports = AliasNode;
