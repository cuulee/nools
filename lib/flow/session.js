'use strict';

const extd = require('../extended');
const nodes = require('./rule/nodes');
const EventEmitter = require('events').EventEmitter;
const wm = require('./workingMemory');
const ExecutionStrategy = require('./executionStrategy');
const AgendaTree = require('./agenda');

const bind = extd.bind;
const WorkingMemory = wm.WorkingMemory;

class Session extends EventEmitter {

    constructor(name, conflictResolutionStrategy) {
        super();
        this.env = null;
        this.name = name;
        this.__rules = {};
        this.conflictResolutionStrategy = conflictResolutionStrategy;
        this.workingMemory = new WorkingMemory();
        this.executionStrategy = null;
        this.agenda = new AgendaTree(this, conflictResolutionStrategy);
        this.agenda.on('fire', bind(this, 'emit', 'fire'));
        this.agenda.on('focused', bind(this, 'emit', 'focused'));
        this.rootNode = new nodes.RootNode(this.workingMemory, this.agenda);
        extd.bindAll(this, 'halt', 'assert', 'retract', 'modify', 'focus',
            'emit', 'getFacts', 'getFact');
    }

    getFacts(Type) {
        let ret;
        if (Type) {
            ret = this.workingMemory.getFactsByType(Type);
        } else {
            ret = this.workingMemory.getFacts();
        }
        return ret;
    }

    getFact(Type) {
        let ret;
        if (Type) {
            ret = this.workingMemory.getFactsByType(Type);
        } else {
            ret = this.workingMemory.getFacts();
        }
        return ret && ret[0];
    }

    focus(focused) {
        this.agenda.setFocus(focused);
        return this;
    }

    halt() {
        this.executionStrategy.halt();
        return this;
    }

    dispose() {
        this.workingMemory.dispose();
        this.agenda.dispose();
        this.rootNode.dispose();
    }

    assert(fact) {
        this.rootNode.assertFact(this.workingMemory.assertFact(fact));
        this.emit('assert', fact);
        return fact;
    }

    // This method is called to remove an existing fact from working memory
    retract(fact) {
        // fact = this.workingMemory.getFact(fact);
        this.rootNode.retractFact(this.workingMemory.retractFact(fact));
        this.emit('retract', fact);
        return fact;
    }

    /**
     * This method is called to alter an existing fact.  It is essentially a
     * retract followed by an assert.
     * @param {*} fact the fact to modify
     * @param {Function?} cb an optional callback function to invoke before
     * modifying the fact in working memory.
     * @return {*} the fact.
     */
    modify(fact, cb) {
        if (typeof cb === 'function') {
            cb(fact);
        }
        this.rootNode.modifyFact(this.workingMemory.modifyFact(fact));
        this.emit('modify', fact);
        return fact;
    }

    print() {
        this.rootNode.print();
    }

    containsRule(name) {
        return this.rootNode.containsRule(name);
    }

    rule(rule) {
        this.rootNode.assertRule(rule);
    }

    matchUntilHalt(cb) {
        this.executionStrategy = new ExecutionStrategy(this, true);
        return this.executionStrategy.execute(cb);
    }

    match(cb) {
        this.executionStrategy = new ExecutionStrategy(this);
        return this.executionStrategy.execute(cb);
    }
}

module.exports = Session;
