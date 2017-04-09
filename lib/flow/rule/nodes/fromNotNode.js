'use strict';

const JoinNode = require('./joinNode');
const extd = require('../../../extended');
const atoms = require('../patterns').atoms;
const Context = require('./context');

const isDefined = extd.isDefined;
const forEach = extd.forEach;

class FromNotNode extends JoinNode {


    constructor(pattern, workingMemory) {
        super();
        this.nodeType = 'FromNotNode';
        this.workingMemory = workingMemory;
        this.pattern = pattern;
        this.type = pattern.constraints[0].assert;
        this.alias = pattern.alias;
        this.from = pattern.from.assert;
        this.fromMemory = {};
        const eqConstraints = [];
        let vars = [];
        this.constraints = this.pattern.constraints.slice(1);
        this.constraints.forEach((c) => {
            if (c instanceof atoms.ComparisonAtom || c instanceof atoms.ReferenceAtom) {
                eqConstraints.push(c.assert);
            } else if (c instanceof atoms.HashAtom) {
                vars = vars.concat(c.get('variables'));
            }
        });
        this.__equalityConstraints = eqConstraints;
        this.__variables = vars;
    }

    retractLeft(context) {
        const ctx = this.removeFromLeftMemory(context);
        if (ctx) {
            const ctxData = ctx.data;
            if (!ctxData.blocked) {
                this.__propagate('retract', ctxData.clone());
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
        } else if (isDefined(o)) {
            Object.assign(context, {blocked: this.__isMatch(context, o, true)});
        }
        const newContextBlocked = context.blocked;
        if (!newContextBlocked) {
            if (leftContextBlocked) {
                this.__propagate('assert', context.clone());
            } else {
                this.__propagate('modify', context.clone());
            }
        } else if (!leftContextBlocked) {
            this.__propagate('retract', leftContext.clone());
        }
    }

    modifyLeft(context) {
        const ctx = this.removeFromLeftMemory(context);
        if (ctx) {
            this.__addToLeftMemory(context);
            this.__modify(context, ctx.data);
        } else {
            throw new Error();
        }
        const fm = this.fromMemory[context.fact.id];
        this.fromMemory[context.fact.id] = {};
        if (fm) {
            const hashCodes = Object.keys(fm);
            const l = hashCodes.length;
            for (let i = 0; i < l; i++) {
                const hashCode = hashCodes[i];
                // update any contexts associated with this fact
                if (hashCode !== context.hashCode) {
                    let lc = fm[hashCode];
                    const removedCtx = this.removeFromLeftMemory(lc);
                    if (removedCtx) {
                        lc = lc.clone();
                        lc.blocked = false;
                        this.__addToLeftMemory(lc);
                        this.__modify(lc, removedCtx.data);
                    }
                }
            }
        }
    }

    __findMatches(context) {
        const fh = context.factHash;
        const o = this.from(fh);
        if (Array.isArray(o)) {
            for (let i = 0, l = o.length; i < l; i++) {
                if (this.__isMatch(context, o[i], true)) {
                    Object.assign(context, {blocked: true});
                    return;
                }
            }
            this.__propagate('assert', context.clone());
        } else if (isDefined(o)) {
            const blocked = this.__isMatch(context, o, true);
            Object.assign(context, {blocked});
            if (!blocked) {
                this.__propagate('assert', context.clone());
            }
        }
    }

    __isMatch(oc, o, add) {
        let isMatch = false;
        if (this.type(o)) {
            const createdFact = this.workingMemory.getFactHandle(o);
            const context = new Context(createdFact, null)
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
                if (eqConstraints[i](fh, fh)) {
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

    assertRight() {
        throw new Error('Shouldnt have gotten here');
    }

    retractRight() {
        throw new Error('Shouldnt have gotten here');
    }
}

module.exports = FromNotNode;
