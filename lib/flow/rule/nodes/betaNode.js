'use strict';

const extd = require('../../../extended');
const Node = require('./node');
const LeftMemory = require('./misc/leftMemory');
const RightMemory = require('./misc/rightMemory');

const keys = extd.hash.keys;

class BetaNode extends Node {

    constructor() {
        super();
        this.leftMemory = {};
        this.rightMemory = {};
        this.leftTuples = new LeftMemory();
        this.rightTuples = new RightMemory();
        this.nodeType = 'BetaNode';
    }

    __propagate(method, context) {
        const entrySet = this.__entrySet;
        let i = entrySet.length - 1;
        while (i > -1) {
            const outNode = entrySet[i].key;
            outNode[method](context);
            i -= 1;
        }
    }

    dispose() {
        this.leftMemory = {};
        this.rightMemory = {};
        this.leftTuples.clear();
        this.rightTuples.clear();
    }

    disposeLeft(fact) {
        this.leftMemory = {};
        this.leftTuples.clear();
        this.propagateDispose(fact);
    }

    disposeRight(fact) {
        this.rightMemory = {};
        this.rightTuples.clear();
        this.propagateDispose(fact);
    }

    hashCode() {
        return `${this.nodeType} ${this.__count}`;
    }

    toString() {
        return `${this.nodeType} ${this.__count}`;
    }

    retractLeft(context) {
        const newContext = this.removeFromLeftMemory(context).data;
        const rightMatches = newContext.rightMatches;
        const hashCodes = keys(rightMatches);
        let i = 0;
        const l = hashCodes.length;
        while (i < l) {
            this.__propagate('retract', rightMatches[hashCodes[i]].clone());
            i += 1;
        }
    }

    retractRight(context) {
        const newContext = this.removeFromRightMemory(context).data;
        const leftMatches = newContext.leftMatches;
        const hashCodes = keys(leftMatches);
        const l = hashCodes.length;
        let i = 0;
        while (i < l) {
            this.__propagate('retract', leftMatches[hashCodes[i]].clone());
            i += 1;
        }
    }

    assertLeft(context) {
        this.__addToLeftMemory(context);
        const rm = this.rightTuples.getRightMemory(context);
        const l = rm.length;
        let i = 0;
        while (i < l) {
            this.propagateFromLeft(context, rm[i].data);
            i += 1;
        }
    }

    assertRight(context) {
        this.__addToRightMemory(context);
        const lm = this.leftTuples.getLeftMemory(context);
        const l = lm.length;
        let i = 0;
        while (i < l) {
            this.propagateFromRight(context, lm[i].data);
            i += 1;
        }
    }

    modifyLeft(context) {
        const previousContext = this.removeFromLeftMemory(context).data;
        this.__addToLeftMemory(context);
        const rm = this.rightTuples.getRightMemory(context);
        const l = rm.length;
        if (!l) {
            this.propagateRetractModifyFromLeft(previousContext);
        } else {
            let i = 0;
            const rightMatches = previousContext.rightMatches;
            while (i < l) {
                this.propagateAssertModifyFromLeft(context, rightMatches, rm[i].data);
                i += 1;
            }
        }
    }

    modifyRight(context) {
        const previousContext = this.removeFromRightMemory(context).data;
        this.__addToRightMemory(context);
        const lm = this.leftTuples.getLeftMemory(context);
        if (!lm.length) {
            this.propagateRetractModifyFromRight(previousContext);
        } else {
            const leftMatches = previousContext.leftMatches;
            const l = lm.length;
            let i = 0;
            while (i < l) {
                this.propagateAssertModifyFromRight(context, leftMatches, lm[i].data);
                i += 1;
            }
        }
    }

    propagateFromLeft(context, rc) {
        this.__propagate('assert', this.__addToMemoryMatches(rc, context, context.clone(null, null, context.match.merge(rc.match))));
    }

    propagateFromRight(context, lc) {
        this.__propagate('assert', this.__addToMemoryMatches(context, lc, lc.clone(null, null, lc.match.merge(context.match))));
    }

    propagateRetractModifyFromLeft(context) {
        const rightMatches = context.rightMatches;
        const hashCodes = keys(rightMatches);
        const l = hashCodes.length;
        let i = 0;
        while (i < l) {
            this.__propagate('retract', rightMatches[hashCodes[i]].clone());
            i += 1;
        }
    }

    propagateRetractModifyFromRight(context) {
        const leftMatches = context.leftMatches;
        const hashCodes = keys(leftMatches);
        const l = hashCodes.length;
        let i = 0;
        while (i < l) {
            this.__propagate('retract', leftMatches[hashCodes[i]].clone());
            i += 1;
        }
    }

    propagateAssertModifyFromLeft(context, rightMatches, rm) {
        const factId = rm.hashCode;
        if (factId in rightMatches) {
            this.__propagate('modify', this.__addToMemoryMatches(rm, context, context.clone(null, null, context.match.merge(rm.match))));
        } else {
            this.propagateFromLeft(context, rm);
        }
    }

    propagateAssertModifyFromRight(context, leftMatches, lm) {
        const factId = lm.hashCode;
        if (factId in leftMatches) {
            this.__propagate('modify', this.__addToMemoryMatches(context, lm, context.clone(null, null, lm.match.merge(context.match))));
        } else {
            this.propagateFromRight(context, lm);
        }
    }

    removeFromRightMemory(context) {
        const hashCode = context.hashCode;
        let ret = null;
        const newContext = this.rightMemory[hashCode] || null;
        if (newContext) {
            const rightTuples = this.rightTuples;
            const leftMemory = this.leftMemory;
            ret = newContext.data;
            rightTuples.remove(newContext);
            const hashCodes = keys(ret.leftMatches);
            const l = hashCodes.length;
            let i = 0;
            while (i < l) {
                delete leftMemory[hashCodes[i]].data.rightMatches[hashCode];
                i += 1;
            }
            delete this.rightMemory[hashCode];
        }
        return newContext;
    }

    removeFromLeftMemory(context) {
        const hashCode = context.hashCode;
        const newContext = this.leftMemory[hashCode] || null;
        if (newContext) {
            const rightMemory = this.rightMemory;
            this.leftTuples.remove(newContext);
            const hashCodes = keys(newContext.data.rightMatches);
            const l = hashCodes.length;
            let i = 0;
            while (i < l) {
                delete rightMemory[hashCodes[i]].data.leftMatches[hashCode];
                i += 1;
            }
            delete this.leftMemory[hashCode];
        }
        return newContext;
    }

    getRightMemoryMatches(context) {
        const lm = this.leftMemory[context.hashCode];
        let ret = {};
        if (lm) {
            ret = lm.rightMatches;
        }
        return ret;
    }

    __addToMemoryMatches(rightContext, leftContext, createdContext) {
        const rightFactId = rightContext.hashCode;
        const leftFactId = leftContext.hashCode;
        const rm = this.rightMemory[rightFactId];
        if (rm) {
            const rmData = rm.data;
            if (leftFactId in rmData.leftMatches) {
                throw new Error('Duplicate left fact entry');
            }
            rmData.leftMatches[leftFactId] = createdContext;
        }
        const lm = this.leftMemory[leftFactId];
        if (lm) {
            const lmData = lm.data;
            if (rightFactId in lmData.rightMatches) {
                throw new Error('Duplicate right fact entry');
            }
            lmData.rightMatches[rightFactId] = createdContext;
        }
        return createdContext;
    }

    __addToRightMemory(context) {
        const hashCode = context.hashCode;
        const rm = this.rightMemory;
        if (hashCode in rm) {
            return false;
        }
        rm[hashCode] = this.rightTuples.push(context);
        Object.assign(context, {leftMatches: {}}); // eslint-disable-line
        return true;
    }


    __addToLeftMemory(context) {
        const hashCode = context.hashCode;
        const lm = this.leftMemory;
        if (hashCode in lm) {
            return false;
        }
        lm[hashCode] = this.leftTuples.push(context);
        Object.assign(context, {rightMatches: {}});
        return true;
    }
}

module.exports = BetaNode;
