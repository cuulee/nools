'use strict';

const InitialFact = require('./rule/patterns').InitialFact;
const conflictResolution = require('./conflictResolution');
const Rule = require('./rule');
const Session = require('./session');

const DEFAULT_CONFLICT_RESOLUTION = conflictResolution.createStrategy(['salience', 'activationRecency']);

class FlowContainer {

    constructor(name, cb) {
        this.name = name;
        this.cb = cb;
        this.__rules = [];
        this.__defined = {};
        this.conflictResolutionStrategy = DEFAULT_CONFLICT_RESOLUTION;
        if (cb) {
            cb.call(this, this);
        }
    }

    conflictResolution(strategies) {
        this.conflictResolutionStrategy = conflictResolution.createStrategy(strategies);
        return this;
    }

    getDefined(name) {
        const ret = this.__defined[name.toLowerCase()];
        if (!ret) {
            throw new Error(`${name} flow class is not defined`);
        }
        return ret;
    }

    addDefined(name, cls) {
        // normalize
        this.__defined[name.toLowerCase()] = cls;
        return cls;
    }

    rule(name, options, conditions, cb) {
        this.__rules = this.__rules.concat(Rule.createRules(name, options, conditions, cb));
        return this;
    }

    getSession() {
        const facts = Array.from(arguments); // eslint-disable-line
        const session = new Session(this.name, this.conflictResolutionStrategy);
        this.__rules.forEach(rule => session.rule(rule));
        session.assert(new InitialFact());
        facts.forEach(fact => session.assert(fact));
        return session;
    }

    containsRule(name) {
        return this.__rules.some(rule => rule.name === name);
    }
}

module.exports = FlowContainer;
