'use strict';

const FromNotNode = require('./fromNotNode');
const _ = require('lodash');
const Context = require('./context');

class ExistsFromNode extends FromNotNode {

    constructor(pattern, workingMemory) {
        super(pattern, workingMemory);
        this.nodeType = 'ExistsFromNode';
    }

    retractLeft(context) {
        const removedContext = this.removeFromLeftMemory(context);
        if (removedContext) {
            const contextData = removedContext.data;
            if (contextData.blocked) {
                this.__propagate('retract', contextData.clone());
            }
        }
    }

    __modify(context, leftContext) {
        const leftContextBlocked = leftContext.blocked;
        const fh = context.factHash;
        const o = this.from(fh);
        if (Array.isArray(o)) {
            for (let i = 0, l = o.length; i < l; i++) {
                if (this.__isMatch(context, o[i], true)) {
                    Object.assign(context, {blocked: true});
                    break;
                }
            }
        } else if (!_.isUndefined(o)) {
            Object.assign(context, {blocked: this.__isMatch(context, o, true)});
        }
        const newContextBlocked = context.blocked;
        if (newContextBlocked) {
            if (leftContextBlocked) {
                this.__propagate('modify', context.clone());
            } else {
                this.__propagate('assert', context.clone());
            }
        } else if (leftContextBlocked) {
            this.__propagate('retract', context.clone());
        }
    }

    __findMatches(context) {
        const fh = context.factHash;
        const o = this.from(fh);
        if (Array.isArray(o)) {
            for (let i = 0, l = o.length; i < l; i++) {
                if (this.__isMatch(context, o[i], true)) {
                    Object.assign(context, {blocked: true});
                    this.__propagate('assert', context.clone());
                    return;
                }
            }
        } else if (!_.isUndefined(o) && (this.__isMatch(context, o, true))) {
            Object.assign(context, {blocked: true});
            this.__propagate('assert', context.clone());
        }
    }

    __isMatch(oc, o, add) {
        let isMatch = false;
        if (this.type(o)) {
            const createdFact = this.workingMemory.getFactHandle(o);
            const context = new Context(createdFact, null, null)
                .mergeMatch(oc.match)
                .set(this.alias, o);
            if (add) {
                let fm = this.fromMemory[createdFact.id];
                if (!fm) {
                    fm = {};
                }
                fm[oc.hashCode] = oc;
                this.fromMemory[createdFact.id] = fm;
            }
            const fh = context.factHash;
            const eqConstraints = this.__equalityConstraints;
            for (let i = 0, l = eqConstraints.length; i < l; i++) {
                if (eqConstraints[i](fh)) {
                    isMatch = true;
                } else {
                    isMatch = false;
                    break;
                }
            }
        }
        return isMatch;
    }

    assertLeft(context) {
        this.__addToLeftMemory(context);
        this.__findMatches(context);
    }
}

module.exports = ExistsFromNode;
