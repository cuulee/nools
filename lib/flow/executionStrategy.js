'use strict';

const nextTick = require('../nextTick');

function isPromiseLike(obj) {
    return obj && 'then' in obj && typeof obj.then === 'function';
}

class ExecutionStrategy {
    constructor(flow, matchUntilHalt) {
        this.flow = flow;
        this.agenda = flow.agenda;
        this.rootNode = flow.rootNode;
        this.matchUntilHalt = !!(matchUntilHalt);
        this.resolver = null;
        this.rejecter = null;
        this.cb = null;
        this.onAlter = this.onAlter.bind(this);
    }

    halt() {
        this.__halted = true;
        if (!this.looping) {
            this.callback();
        }
    }

    onAlter() {
        this.flowAltered = true;
        if (!this.looping && this.matchUntilHalt && !this.__halted) {
            this.callNext();
        }
    }

    setup() {
        const flow = this.flow;
        this.rootNode.resetCounter();
        flow.on('assert', this.onAlter);
        flow.on('modify', this.onAlter);
        flow.on('retract', this.onAlter);
    }

    tearDown() {
        const flow = this.flow;
        flow.removeListener('assert', this.onAlter);
        flow.removeListener('modify', this.onAlter);
        flow.removeListener('retract', this.onAlter);
    }

    __handleAsyncNext(next) {
        return next.then(() => {
            this.looping = false;
            if (!this.agenda.isEmpty()) {
                if (this.flowAltered) {
                    this.rootNode.incrementCounter();
                    this.flowAltered = false;
                }
                if (!this.__halted) {
                    this.callNext();
                } else {
                    this.resolve();
                }
            } else if (!this.matchUntilHalt || this.__halted) {
                this.resolve();
            }
        }, err => this.reject(err));
    }

    __handleSyncNext(next) {
        this.looping = false;
        if (!this.agenda.isEmpty()) {
            if (this.flowAltered) {
                this.rootNode.incrementCounter();
                this.flowAltered = false;
            }
        }
        if (next && !this.__halted) {
            nextTick(() => this.callNext());
        } else if (!this.matchUntilHalt || this.__halted) {
            this.resolve();
        }
        return next;
    }

    resolve() {
        this.tearDown();
        this.resolver();
        if (this.cb) {
            this.cb();
        }
    }

    reject(err) {
        this.tearDown();
        this.rejecter(err);
        if (this.cb) {
            this.cb(err);
        }
    }


    callNext() {
        this.looping = true;
        const next = this.agenda.fireNext();
        if (isPromiseLike(next)) {
            return this.__handleAsyncNext(next);
        }
        return this.__handleSyncNext(next);
    }

    execute(cb) {
        this.cb = cb;
        return new Promise((resolve, reject) => {
            this.resolver = resolve;
            this.rejecter = reject;
            this.setup();
            this.callNext();
            return this;
        });
    }
}

module.exports = ExecutionStrategy;
