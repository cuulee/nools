'use strict';

const BetaNode = require('./betaNode');
const JoinReferenceNode = require('./joinReferenceNode');

class JoinNode extends BetaNode {
    constructor() {
        super();
        this.constraint = new JoinReferenceNode(this.leftTuples, this.rightTuples);
        this.nodeType = 'JoinNode';
    }

    propagateFromLeft(context, rm) {
        const mr = this.constraint.match(context, rm);
        if (mr.isMatch) {
            this.__propagate('assert', this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
        }
        return this;
    }

    propagateFromRight(context, lm) {
        const mr = this.constraint.match(lm, context);
        if (mr.isMatch) {
            this.__propagate('assert', this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
        }
        return this;
    }

    propagateAssertModifyFromLeft(context, rightMatches, rm) {
        const factId = rm.hashCode;
        if (factId in rightMatches) {
            const mr = this.constraint.match(context, rm);
            if (!mr.isMatch) {
                this.__propagate('retract', rightMatches[factId].clone());
            } else {
                this.__propagate('modify', this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
            }
        } else {
            this.propagateFromLeft(context, rm);
        }
    }

    propagateAssertModifyFromRight(context, leftMatches, lm) {
        const factId = lm.hashCode;
        if (factId in leftMatches) {
            const mr = this.constraint.match(lm, context);
            if (!mr.isMatch) {
                this.__propagate('retract', leftMatches[factId].clone());
            } else {
                this.__propagate('modify', this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
            }
        } else {
            this.propagateFromRight(context, lm);
        }
    }
}

module.exports = JoinNode;
