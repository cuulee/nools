'use strict';

const AlphaNode = require('./alphaNode');
const Context = require('./context');
const extd = require('../../../extended');

class PropertyNode extends AlphaNode {
    constructor(constraint) {
        super(constraint);
        this.alias = this.constraint.alias;
        this.varLength = (this.variables = extd(this.constraint.variables).toArray().value()).length;
    }

    assert(context) {
        const c = new Context(context.fact, context.paths);
        const variables = this.variables;
        const o = context.fact.object;
        c.set(this.alias, o);
        for (let i = 0, l = this.varLength; i < l; i++) {
            const item = variables[i];
            c.set(item[1], o[item[0]]);
        }

        this.__propagate('assert', c);
    }

    retract(context) {
        this.__propagate('retract', new Context(context.fact, context.paths));
    }

    modify(context) {
        const c = new Context(context.fact, context.paths);
        const variables = this.variables;
        const o = context.fact.object;
        c.set(this.alias, o);
        for (let i = 0, l = this.varLength; i < l; i++) {
            const item = variables[i];
            c.set(item[1], o[item[0]]);
        }
        this.__propagate('modify', c);
    }

    toString() {
        return `PropertyNode${this.__count}`;
    }
}

module.exports = PropertyNode;
