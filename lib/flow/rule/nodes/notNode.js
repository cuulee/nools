'use strict';

const JoinNode = require('./joinNode');
const LinkedList = require('../../../util').LinkedList;
const Context = require('./context');
const InitialFact = require('../patterns').InitialFact;

class NotNode extends JoinNode {

    constructor() {
        super();
        this.nodeType = 'NotNode';
        this.leftTupleMemory = {};
        // use this ensure a unique match for and propagated context.
        this.notMatch = new Context(new InitialFact()).match;
    }

    __cloneContext(context) {
        return context.clone(null, null, context.match.merge(this.notMatch));
    }

    retractRight(context) {
        const ctx = this.removeFromRightMemory(context);
        const rightContext = ctx.data;
        const blocking = rightContext.blocking;
        if (blocking.length) {
            // if we are blocking left contexts
            const thisConstraint = this.constraint;
            let blockingNode = {next: blocking.head};
            while (blockingNode.next) {
                blockingNode = blockingNode.next;
                let leftContext = blockingNode.data;
                this.removeFromLeftBlockedMemory(leftContext);
                const rm = this.rightTuples.getRightMemory(leftContext);
                const l = rm.length;
                let i = 0;
                while (i < l) {
                    const rc = rm[i].data;
                    if (thisConstraint.isMatch(leftContext, rc)) {
                        this.blockedContext(leftContext, rc);
                        leftContext = null;
                        break;
                    }
                    i += 1;
                }
                if (leftContext) {
                    this.notBlockedContext(leftContext, true);
                }
            }
            blocking.clear();
        }
    }

    blockedContext(leftContext, rightContext, propagate) {
        Object.assign(leftContext, {blocker: rightContext});
        this.removeFromLeftMemory(leftContext);
        this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
        if (propagate) {
            this.__propagate('retract', this.__cloneContext(leftContext));
        }
    }

    notBlockedContext(leftContext, propagate) {
        this.__addToLeftMemory(leftContext);
        if (propagate) {
            this.__propagate('assert', this.__cloneContext(leftContext));
        }
    }

    propagateFromLeft(leftContext) {
        this.notBlockedContext(leftContext, true);
    }

    propagateFromRight(leftContext) {
        this.notBlockedContext(leftContext, true);
    }

    blockFromAssertRight(leftContext, rightContext) {
        this.blockedContext(leftContext, rightContext, true);
    }

    blockFromAssertLeft(leftContext, rightContext) {
        this.blockedContext(leftContext, rightContext, false);
    }

    retractLeft(context) {
        let ctx = this.removeFromLeftMemory(context);
        if (ctx) {
            ctx = ctx.data;
            this.__propagate('retract', this.__cloneContext(ctx));
        } else if (!this.removeFromLeftBlockedMemory(context)) {
            throw new Error();
        }
    }

    assertLeft(context) {
        const values = this.rightTuples.getRightMemory(context);
        const thisConstraint = this.constraint;
        const l = values.length;
        let i = 0;
        let shouldPropagate = true;
        while (i < l) {
            const rc = values[i].data;
            if (thisConstraint.isMatch(context, rc)) {
                this.blockFromAssertLeft(context, rc);
                shouldPropagate = false;
                i = l;
            } else {
                i += 1;
            }
        }
        if (shouldPropagate) {
            this.propagateFromLeft(context);
        }
    }

    assertRight(context) {
        this.__addToRightMemory(context);
        Object.assign(context, {blocking: new LinkedList()});
        const fl = this.leftTuples.getLeftMemory(context).slice();
        let i = 0;
        const l = fl.length;
        while (i < l) {
            const leftContext = fl[i].data;
            if (this.constraint.isMatch(leftContext, context)) {
                this.blockFromAssertRight(leftContext, context);
            }
            i += 1;
        }
    }

    addToLeftBlockedMemory(context) {
        const data = context.data;
        const hashCode = data.hashCode;
        const ctx = this.leftMemory[hashCode];
        this.leftTupleMemory[hashCode] = context;
        if (ctx) {
            this.leftTuples.remove(ctx);
        }
        return this;
    }

    removeFromLeftBlockedMemory(context) {
        const ret = this.leftTupleMemory[context.hashCode] || null;
        if (ret) {
            delete this.leftTupleMemory[context.hashCode];
            ret.data.blocker.blocking.remove(ret);
        }
        return ret;
    }

    modifyLeft(context) {
        let ctx = this.removeFromLeftMemory(context);
        let isBlocked = false;
        let nonBlockedContext = context;
        if (!ctx) {
            // blocked before
            ctx = this.removeFromLeftBlockedMemory(nonBlockedContext);
            isBlocked = true;
        }
        if (ctx) {
            const leftContext = ctx.data;
            let blocker = null;
            if (leftContext && leftContext.blocker) {
                // we were blocked before so only check nodes previous to our blocker
                blocker = this.rightMemory[leftContext.blocker.hashCode];
                leftContext.blocker = null;
            }
            if (blocker) {
                const rc = blocker.data;
                if (this.constraint.isMatch(nonBlockedContext, rc)) {
                    // we cant be proagated so retract previous
                    if (!isBlocked) {
                        // we were asserted before so retract
                        this.__propagate('retract', this.__cloneContext(leftContext));
                    }
                    Object.assign(nonBlockedContext, {blocker: rc});
                    this.addToLeftBlockedMemory(rc.blocking.push(nonBlockedContext));
                    nonBlockedContext = null;
                }
            }
            if (nonBlockedContext) {
                const rightTuples = this.rightTuples.getRightMemory(nonBlockedContext);
                const l = rightTuples.length;
                let i = 0;
                // we were propogated before
                while (i < l) {
                    const rc = rightTuples[i].data;
                    if (this.constraint.isMatch(nonBlockedContext, rc)) {
                        // we cant be proagated so retract previous
                        if (!isBlocked) {
                            // we were asserted before so retract
                            this.__propagate('retract', this.__cloneContext(leftContext));
                        }
                        this.addToLeftBlockedMemory(rc.blocking.push(nonBlockedContext));
                        nonBlockedContext.blocker = rc;
                        nonBlockedContext = null;
                        break;
                    }
                    i += 1;
                }
            }
            if (nonBlockedContext) {
                // we can still be propogated
                this.__addToLeftMemory(nonBlockedContext);
                if (!isBlocked) {
                    // we weren't blocked before so modify
                    this.__propagate('modify', this.__cloneContext(nonBlockedContext));
                } else {
                    // we were blocked before but aren't now
                    this.__propagate('assert', this.__cloneContext(nonBlockedContext));
                }
            }
        } else {
            throw new Error();
        }
    }

    modifyRight(context) {
        const ctx = this.removeFromRightMemory(context);
        if (ctx) {
            const rightContext = ctx.data;
            const leftTuples = this.leftTuples.getLeftMemory(context).slice();
            const leftTuplesLength = leftTuples.length;
            const thisConstraint = this.constraint;
            let leftContext;
            this.__addToRightMemory(context);
            Object.assign(context, {blocking: new LinkedList()});

            // check old blocked contexts
            // check if the same contexts blocked before are still blocked
            let blockingNode = {next: rightContext.blocking.head};
            while (blockingNode.next) {
                blockingNode = blockingNode.next;
                leftContext = blockingNode.data;
                leftContext.blocker = null;
                if (thisConstraint.isMatch(leftContext, context)) {
                    leftContext.blocker = context;
                    this.addToLeftBlockedMemory(context.blocking.push(leftContext));
                    leftContext = null;
                } else {
                    // we arent blocked anymore
                    leftContext.blocker = null;
                    let node = ctx;
                    while (node.next) {
                        node = node.next;
                        const rc = node.data;
                        if (thisConstraint.isMatch(leftContext, rc)) {
                            leftContext.blocker = rc;
                            this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
                            leftContext = null;
                            break;
                        }
                    }
                    if (leftContext) {
                        this.__addToLeftMemory(leftContext);
                        this.__propagate('assert', this.__cloneContext(leftContext));
                    }
                }
            }
            if (leftTuplesLength) {
                // check currently left tuples in memory
                let i = 0;
                while (i < leftTuplesLength) {
                    leftContext = leftTuples[i].data;
                    if (thisConstraint.isMatch(leftContext, context)) {
                        this.__propagate('retract', this.__cloneContext(leftContext));
                        this.removeFromLeftMemory(leftContext);
                        this.addToLeftBlockedMemory(context.blocking.push(leftContext));
                        leftContext.blocker = context;
                    }
                    i += 1;
                }
            }
        } else {
            throw new Error();
        }
    }
}

module.exports = NotNode;
