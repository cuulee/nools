'use strict';

const JoinNode = require('./joinNode');
const extd = require('../../../extended');
const atoms = require('../patterns').atoms;
const Context = require('./context');

const isDefined = extd.isDefined;
const isEmpty = extd.isEmpty;
const forEach = extd.forEach;
const isArray = extd.isArray;

const DEFAULT_MATCH = {
    isMatch() {
        return false;
    },
};

class FromNode extends JoinNode {

    constructor(pattern, wm) {
        super();
        this.nodeType = 'FromNode';
        this.workingMemory = wm;
        this.fromMemory = {};
        this.pattern = pattern;
        this.type = pattern.constraints[0].assert;
        this.alias = pattern.alias;
        this.from = pattern.from.assert;
        const eqConstraints = [];
        let vars = [];
        forEach(this.constraints = this.pattern.constraints.slice(1), (c) => {
            if (c instanceof atoms.EqualityAtom || c instanceof atoms.ReferenceAtom) {
                eqConstraints.push(c.assert);
            } else if (c instanceof atoms.HashAtom) {
                vars = vars.concat(c.get('variables'));
            }
        });
        this.__equalityConstraints = eqConstraints;
        this.__variables = vars;
    }

    __createMatches(context) {
        const fh = context.factHash;
        const o = this.from(fh);
        if (isArray(o)) {
            for (let i = 0, l = o.length; i < l; i++) {
                this.__checkMatch(context, o[i], true);
            }
        } else if (isDefined(o)) {
            this.__checkMatch(context, o, true);
        }
    }

    __checkMatch(context, o, propogate) {
        const newContext = this.__createMatch(context, o);
        if (newContext.isMatch() && propogate) {
            this.__propagate('assert', newContext.clone());
        }
        return newContext;
    }

    __createMatch(lc, o) {
        if (this.type(o)) {
            const createdFact = this.workingMemory.getFactHandle(o, true);
            let createdContext;
            const rc = new Context(createdFact, null, null)
                .set(this.alias, o);
            const createdFactId = createdFact.id;
            const fh = rc.factHash;
            const lcFh = lc.factHash;
            Object.assign(fh, lcFh);
            const eqConstraints = this.__equalityConstraints;
            const vars = this.__variables;
            const eqContraintsLength = eqConstraints.length;
            let i = 0;
            while (i < eqContraintsLength) {
                if (!eqConstraints[i](fh, fh)) {
                    createdContext = DEFAULT_MATCH;
                    break;
                }
                i += 1;
            }
            let fm = this.fromMemory[createdFactId];
            if (!fm) {
                fm = {};
            }
            const updatedLc = lc;
            if (!createdContext) {
                const varsLength = vars.length;
                let j = 0;
                while (j < varsLength) {
                    const prop = vars[j];
                    fh[prop] = o[prop];
                    j += 1;
                }
                createdContext = rc.clone(createdFact, null, updatedLc.match.merge(rc.match));
                updatedLc.fromMatches[createdFact.id] = createdContext;
            }
            fm[updatedLc.hashCode] = [updatedLc, createdContext];
            this.fromMemory[createdFactId] = fm;
            return createdContext;
        }
        return DEFAULT_MATCH;
    }

    retractRight() {
        throw new Error('Shouldnt have gotten here');
    }

    removeFromFromMemory(context) {
        const factId = context.fact.id;
        const fm = this.fromMemory[factId];
        if (fm) {
            const fmKeys = Object.keys(fm);
            for (let i = 0, l = fmKeys.length; i < l; i++) {
                const key = fmKeys[i];
                const entry = fm[key];
                if (entry[1] === context) {
                    delete fm[key];
                    if (isEmpty(fm)) {
                        delete this.fromMemory[factId];
                    }
                    break;
                }
            }
        }
    }

    retractLeft(context) {
        let ctx = this.removeFromLeftMemory(context);
        if (ctx) {
            ctx = ctx.data;
            const fromMatches = ctx.fromMatches;
            const fromMatchesKeys = Object.keys(fromMatches);
            for (let i = 0, l = fromMatchesKeys.length; i < l; i++) {
                const key = fromMatchesKeys[i];
                this.removeFromFromMemory(fromMatches[key]);
                this.__propagate('retract', fromMatches[key].clone());
            }
        }
    }

    modifyLeft(context) {
        const removedContext = this.removeFromLeftMemory(context);
        if (removedContext) {
            this.__addToLeftMemory(context);

            const leftContext = removedContext.data;
            const fromMatches = {};
            const rightMatches = leftContext.fromMatches;
            const o = this.from(context.factHash);
            Object.assign(context, {fromMatches});
            if (isArray(o)) {
                for (let i = 0, l = o.length; i < l; i++) {
                    const newContext = this.__checkMatch(context, o[i], false);
                    if (newContext.isMatch()) {
                        const factId = newContext.fact.id;
                        if (factId in rightMatches) {
                            this.__propagate('modify', newContext.clone());
                        } else {
                            this.__propagate('assert', newContext.clone());
                        }
                    }
                }
            } else if (isDefined(o)) {
                const newContext = this.__checkMatch(context, o, false);
                if (newContext.isMatch()) {
                    const factId = newContext.fact.id;
                    if (factId in rightMatches) {
                        this.__propagate('modify', newContext.clone());
                    } else {
                        this.__propagate('assert', newContext.clone());
                    }
                }
            }
            const rightMatchKeys = Object.keys(rightMatches);
            for (let i = 0, l = rightMatchKeys.length; i < l; i++) {
                const key = rightMatchKeys[i];
                if (!(key in fromMatches)) {
                    this.removeFromFromMemory(rightMatches[key]);
                    this.__propagate('retract', rightMatches[key].clone());
                }
            }
        } else {
            this.assertLeft(context);
        }
        const fact = context.fact;
        const factId = fact.id;
        const fm = this.fromMemory[factId];
        this.fromMemory[factId] = {};
        if (fm) {
            const factObject = fact.object;
            const fmKeys = Object.keys(fm);
            for (let i = 0, l = fmKeys.length; i < l; i++) {
                const key = fmKeys[i];
                const entry = fm[key];
                const lc = entry[0];
                const cc = entry[1];
                const createdIsMatch = cc.isMatch();
                if (lc.hashCode !== context.hashCode) {
                    const newContext = this.__createMatch(lc, factObject, false);
                    if (createdIsMatch) {
                        this.__propagate('retract', cc.clone());
                    }
                    if (newContext.isMatch()) {
                        this.__propagate(createdIsMatch ? 'modify' : 'assert', newContext.clone());
                    }
                }
            }
        }
    }

    assertLeft(context) {
        this.__addToLeftMemory(context);
        Object.assign(context, {fromMatches: {}});
        this.__createMatches(context);
    }

    assertRight() {
        throw new Error('Shouldnt have gotten here');
    }
}

module.exports = FromNode;
