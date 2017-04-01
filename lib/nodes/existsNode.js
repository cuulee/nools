'use strict';

const NotNode = require('./notNode');
const LinkedList = require('../util').LinkedList;

class ExistsNode extends NotNode {

    constructor() {
        super();
        this.nodeType = 'ExistsNode';
    }


    blockedContext(leftContext, rightContext) {
        Object.assign(leftContext, {blocker: rightContext});
        this.removeFromLeftMemory(leftContext);
        this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
        this.__propagate('assert', this.__cloneContext(leftContext));
    }

    notBlockedContext(leftContext, propagate) {
        this.__addToLeftMemory(leftContext);
        if (propagate) {
            this.__propagate('retract', this.__cloneContext(leftContext));
        }
    }

    propagateFromLeft(leftContext) {
        this.notBlockedContext(leftContext, false);
    }


    retractLeft(context) {
        if (!this.removeFromLeftMemory(context)) {
            const removedContext = this.removeFromLeftBlockedMemory(context);
            if (removedContext) {
                this.__propagate('retract', this.__cloneContext(removedContext.data));
            } else {
                throw new Error();
            }
        }
    }

    modifyLeft(context) {
        const thisConstraint = this.constraint;
        let removedContext = this.removeFromLeftMemory(context);
        let isBlocked = false;
        let nonBlockedContext = context;
        if (!removedContext) {
            // blocked before
            removedContext = this.removeFromLeftBlockedMemory(nonBlockedContext);
            isBlocked = true;
        }
        if (removedContext) {
            const leftContext = removedContext.data;

            let blocker = null;
            if (leftContext && leftContext.blocker) {
                // we were blocked before so only check nodes previous to our blocker
                blocker = this.rightMemory[leftContext.blocker.hashCode];
            }
            let node = null;
            const rightTuples = this.rightTuples;
            const l = rightTuples.length;
            if (blocker) {
                const rc = blocker.data;
                if (thisConstraint.isMatch(nonBlockedContext, rc)) {
                    // propogate as a modify or assert
                    this.__propagate(!isBlocked ? 'assert' : 'modify', this.__cloneContext(leftContext));
                    nonBlockedContext.blocker = rc;
                    this.addToLeftBlockedMemory(rc.blocking.push(context));
                    nonBlockedContext = null;
                }
                if (nonBlockedContext) {
                    node = {next: blocker.next};
                }
            } else {
                node = {next: rightTuples.head};
            }
            if (nonBlockedContext && l) {
                // we were propagated before
                while (node.next) {
                    node = node.next;
                    const rc = node.data;
                    if (thisConstraint.isMatch(nonBlockedContext, rc)) {
                        // we cant be proagated so retract previous

                        // we were asserted before so retract
                        this.__propagate(!isBlocked ? 'assert' : 'modify', this.__cloneContext(leftContext));

                        this.addToLeftBlockedMemory(rc.blocking.push(nonBlockedContext));
                        Object.assign(nonBlockedContext, {blocker: rc});
                        nonBlockedContext = null;
                        break;
                    }
                }
            }
            if (nonBlockedContext) {
                // we can still be propogated
                this.__addToLeftMemory(nonBlockedContext);
                if (isBlocked) {
                    // we were blocked so retract
                    this.__propagate('retract', this.__cloneContext(nonBlockedContext));
                }
            }
        } else {
            throw new Error();
        }
    }

    modifyRight(context) {
        const removedContext = this.removeFromRightMemory(context);
        if (removedContext) {
            const rightContext = removedContext.data;
            const leftTuples = this.leftTuples;
            const leftTuplesLength = leftTuples.length;
            // let leftContext,
            const thisConstraint = this.constraint;
            // node,
            const blocking = rightContext.blocking;
            this.__addToRightMemory(context);
            Object.assign(context, {blocking: new LinkedList()});
            if (leftTuplesLength || blocking.length) {
                if (blocking.length) {
                    // check old blocked contexts
                    // check if the same contexts blocked before are still blocked
                    let blockingNode = {next: blocking.head};
                    while (blockingNode.next) {
                        blockingNode = blockingNode.next;
                        let leftContext = blockingNode.data;
                        leftContext.blocker = null;
                        if (thisConstraint.isMatch(leftContext, context)) {
                            leftContext.blocker = context;
                            this.addToLeftBlockedMemory(context.blocking.push(leftContext));
                            this.__propagate('assert', this.__cloneContext(leftContext));
                            leftContext = null;
                        } else {
                            // we arent blocked anymore
                            leftContext.blocker = null;
                            let node = removedContext;
                            while (node.next) {
                                node = node.next;
                                const rc = node.data;
                                if (thisConstraint.isMatch(leftContext, rc)) {
                                    leftContext.blocker = rc;
                                    this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
                                    this.__propagate('assert', this.__cloneContext(leftContext));
                                    leftContext = null;
                                    break;
                                }
                            }
                            if (leftContext) {
                                this.__addToLeftMemory(leftContext);
                            }
                        }
                    }
                }

                if (leftTuplesLength) {
                    // check currently left tuples in memory
                    let node = {next: leftTuples.head};
                    while (node.next) {
                        node = node.next;
                        const leftContext = node.data;
                        if (thisConstraint.isMatch(leftContext, context)) {
                            this.__propagate('assert', this.__cloneContext(leftContext));
                            this.removeFromLeftMemory(leftContext);
                            this.addToLeftBlockedMemory(context.blocking.push(leftContext));
                            leftContext.blocker = context;
                        }
                    }
                }
            }
        } else {
            throw new Error();
        }
    }

}
module.exports = ExistsNode;
