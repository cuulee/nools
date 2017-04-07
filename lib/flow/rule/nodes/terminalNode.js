'use strict';

const Node = require('./node');

class TerminalNode extends Node {
    constructor(bucket, index, rule, agenda) {
        super();
        this.resolve = this.resolve.bind(this);
        this.rule = rule;
        this.index = index;
        this.name = this.rule.name;
        this.agenda = agenda;
        this.bucket = bucket;
        agenda.register(this);
    }

    __assertModify(context) {
        const match = context.match;
        if (match.isMatch) {
            const rule = this.rule;
            const bucket = this.bucket;
            this.agenda.insert(this, {
                rule,
                hashCode: context.hashCode,
                index: this.index,
                name: rule.name,
                recency: bucket.recency,
                match,
                counter: bucket.counter,
            });
            bucket.recency += 1;
        }
    }

    assert(context) {
        this.__assertModify(context);
    }

    modify(context) {
        this.agenda.retract(this, context);
        this.__assertModify(context);
    }

    retract(context) {
        this.agenda.retract(this, context);
    }

    retractRight(context) {
        this.agenda.retract(this, context);
    }

    retractLeft(context) {
        this.agenda.retract(this, context);
    }

    assertLeft(context) {
        this.__assertModify(context);
    }

    assertRight(context) {
        this.__assertModify(context);
    }

    toString() {
        return `TerminalNode ${this.rule.name}`;
    }
}

module.exports = TerminalNode;
